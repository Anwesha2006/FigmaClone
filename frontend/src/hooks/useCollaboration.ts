import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { useCanvasStore, setYShapesMap } from '@/src/lib/store'
import type { Shape } from '@/src/lib/types'

const cursorColors = ['#f56565', '#ed8936', '#ecc94b', '#48bb78', '#38b2ac', '#4299e1', '#667eea', '#9f7aea', '#ed64a6']
const randomColor = cursorColors[Math.floor(Math.random() * cursorColors.length)]

export function useCollaboration(roomId: string = 'default-room', fileId?: string) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null)
  const [awarenessUsers, setAwarenessUsers] = useState<any[]>([])
  const [userRole, setUserRole] = useState<"viewer" | "editor">("editor")

  useEffect(() => {
    // Fetch file role
    // 1. Initialize Yjs Document
    const ydoc = new Y.Doc()
    const wsProvider = new WebsocketProvider('ws://localhost:5000', roomId, ydoc)
    setProvider(wsProvider)

    // 2. Initialize the shared map for shapes
    const yShapesMap = ydoc.getMap<Shape>('shapesMap')
    setYShapesMap(yShapesMap)

    // 3. Fetch file metadata and initial shapes
    if (fileId) {
      fetch(`http://localhost:5000/api/files/${fileId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.userRole) setUserRole(data.userRole)
        
        // If the Yjs map is empty and we have data in the DB, populate Yjs
        // We check this after a small delay to ensure Yjs has a chance to sync from peers
        setTimeout(() => {
          if (yShapesMap.size === 0 && data.canvasData && Array.isArray(data.canvasData)) {
            console.log("Room is empty, populating from database...");
            ydoc.transact(() => {
              data.canvasData.forEach((shape: Shape) => {
                yShapesMap.set(shape.id, shape);
              });
            });
            useCanvasStore.getState().setShapes(data.canvasData);
          }
        }, 500);
      })
      .catch(err => console.error("Failed to fetch file data", err))
    }

    // 4. Sync initial data and listen for remote updates
    const handleSync = (isSynced: boolean) => {
      if (isSynced) {
        useCanvasStore.getState().setShapes(Array.from(yShapesMap.values()))
      }
    }
    wsProvider.on('sync', handleSync)

    yShapesMap.observe((event, transaction) => {
      if (!transaction.local) {
        // If the update came from another user, update our local Zustand store
        useCanvasStore.getState().setShapes(Array.from(yShapesMap.values()))
      }
    })

    // 5. Setup Awareness (cursor presence)
    wsProvider.awareness.setLocalStateField('user', {
      color: randomColor,
      name: `User ${Math.floor(Math.random() * 100)}`
    })

    const handleAwarenessChange = () => {
      const states = Array.from(wsProvider.awareness.getStates().entries())
      const users = states
        .filter(([clientId]) => clientId !== ydoc.clientID)
        .map(([clientId, state]) => {
          if (state.user && state.cursor) {
            return {
              clientId,
              color: state.user.color,
              name: state.user.name,
              x: state.cursor.x,
              y: state.cursor.y,
            }
          }
          return null
        })
        .filter(Boolean)
      
      setAwarenessUsers(users)
    }

    wsProvider.awareness.on('change', handleAwarenessChange)

    return () => {
      wsProvider.disconnect()
      wsProvider.destroy()
      ydoc.destroy()
      setYShapesMap(null)
    }
  }, [roomId])

  const setCursorPosition = (x: number, y: number) => {
    if (provider) {
      provider.awareness.setLocalStateField('cursor', { x, y })
    }
  }

  return { awarenessUsers, setCursorPosition, userRole }
}
