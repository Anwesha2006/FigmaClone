import { useEffect, useRef, useState } from "react"
import { useCanvasStore } from "@/src/lib/store"
import type { Shape } from "@/src/lib/types"

type SaveStatus = "idle" | "saving" | "saved" | "error"

export function useAutoSave(fileId: string) {
  const shapes = useCanvasStore((state) => state.shapes)
  const [status, setStatus] = useState<SaveStatus>("idle")
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)

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
        const response = await fetch(`/api/files/${fileId}/canvas`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ canvasData: shapes }),
        })

        if (!response.ok) {
          throw new Error("Failed to save")
        }

        setStatus("saved")

        // Reset back to idle after 2 seconds
        setTimeout(() => setStatus("idle"), 2000)
      } catch (err) {
        console.error("Auto-save error:", err)
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