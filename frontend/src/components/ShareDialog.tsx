import { useState } from "react"
import { Copy, Link, UserPlus, X, Globe, User } from "lucide-react"

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  fileId?: string
  currentLinkSharing?: { enabled: boolean, role: string }
}

export function ShareDialog({ isOpen, onClose, projectId, fileId, currentLinkSharing }: ShareDialogProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("viewer")
  const [linkEnabled, setLinkEnabled] = useState(currentLinkSharing?.enabled || false)
  const [linkRole, setLinkRole] = useState(currentLinkSharing?.role || "viewer")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  if (!isOpen) return null

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ email, role })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to invite")
      setMessage(`Successfully invited ${email} as ${role}`)
      setEmail("")
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateLink = async (enabled: boolean, newRole: string) => {
    if (!fileId) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/files/${fileId}/share`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ enabled, role: newRole })
      })
      if (!res.ok) throw new Error("Failed to update link sharing")
      setLinkEnabled(enabled)
      setLinkRole(newRole)
      setMessage("Link settings updated")
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = () => {
    if (!fileId) return
    const url = `${window.location.origin}/canvas/${fileId}`
    navigator.clipboard.writeText(url)
    setMessage("Link copied to clipboard!")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Share File</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-primary/10 text-primary border border-primary/20">
            {message}
          </div>
        )}

        {/* Invite Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-muted-foreground" />
            Invite to Team
          </h3>
          <form onSubmit={handleInvite} className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 disabled:opacity-50"
            >
              Invite
            </button>
          </form>
        </div>

        <div className="h-px bg-border my-6" />

        {/* Link Sharing Section */}
        {fileId && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Link className="w-4 h-4 text-muted-foreground" />
              Link Sharing
            </h3>
            
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/20 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${linkEnabled ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {linkEnabled ? <Globe className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">
                    {linkEnabled ? "Anyone with the link" : "Restricted"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {linkEnabled ? "Can access this file" : "Only team members can access"}
                  </div>
                </div>
              </div>
              
              <select
                value={linkEnabled ? linkRole : "restricted"}
                onChange={(e) => {
                  if (e.target.value === "restricted") {
                    handleUpdateLink(false, linkRole)
                  } else {
                    handleUpdateLink(true, e.target.value)
                  }
                }}
                disabled={loading}
                className="bg-transparent text-sm text-foreground font-medium outline-none cursor-pointer"
              >
                <option value="restricted">Restricted</option>
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 border border-border bg-background hover:bg-secondary text-foreground px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
