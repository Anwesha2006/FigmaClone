import { useEffect, useRef, useState } from "react"
import { useCanvasStore } from "@/src/lib/store"
import type { Shape } from "@/src/lib/types"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type SaveStatus = "idle" | "saving" | "saved" | "error"

export function useAutoSave(fileId: string) {
  const shapes = useCanvasStore((state) => state.shapes)
  const [status, setStatus] = useState<SaveStatus>("idle")
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)
  const projectIdRef = useRef<string | null>(null)

  // Fetch project ID on mount
  useEffect(() => {
    if (!fileId) return
    
    const fetchProjectId = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${BACKEND_URL}/api/files/${fileId}`, {
          headers: {
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          projectIdRef.current = data.project
        }
      } catch (err) {
        console.error("Failed to fetch project ID:", err)
      }
    }
    
    fetchProjectId()
  }, [fileId])

  useEffect(() => {
    // Skip saving on the very first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Don't save if there's no file ID
    if (!fileId) return

    // Show unsaved indicator immediately
    setStatus("saving")

    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Start a new 2 second timer
    debounceTimer.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token")
        
        // Save canvas data
        const response = await fetch(`${BACKEND_URL}/api/files/${fileId}/canvas`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ canvasData: shapes }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Save failed with status:", response.status, errorData);
          throw new Error(`Failed to save: ${response.status}`);
        }

        // Update project's lastModified timestamp
        if (projectIdRef.current) {
          try {
            await fetch(`${BACKEND_URL}/api/projects/${projectIdRef.current}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
              },
              body: JSON.stringify({}),
            })
          } catch (err) {
            console.error("Failed to update project lastModified:", err)
            // Don't fail the save if project update fails
          }
        }

        setStatus("saved")

        // Reset back to idle after 2 seconds
        setTimeout(() => setStatus("idle"), 2000)
      } catch (err: any) {
        console.error("Auto-save error details:", err.message)
        setStatus("error")
      }
    }, 2000)

    // Cleanup timer when component unmounts
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [shapes, fileId])

  return status
}