import { Navigate } from "@tanstack/react-router"
import { useMeQuery } from "../features/auth/api/useMeQuery"
import { Playlists } from "../features/playlists/Playlists"
import { AddPlaylistForm } from "../features/playlists/add-playlist/ui/AddPlaylistForm"
import { useState } from "react"
import { EditPlaylistForm } from "../features/playlists/edit-playlist/ui/EditPlaylistForm"

export function MyPlaylistsPage() {
    const { data, isPending } = useMeQuery()
    const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null)


    if (isPending) return <div>Loading...</div>

    if (!data) {
        return <Navigate to="/" replace />
    }

    return (
        <div>
            <h2>My Playlists</h2>
            <hr />
            <AddPlaylistForm />
            <hr />
            <Playlists userId={data.userId} onPlaylistSelected={setEditingPlaylistId} />
            <hr />
            <EditPlaylistForm playlistId={editingPlaylistId} onCancelEditing={() => setEditingPlaylistId(null)} />
        </div>
    )
}