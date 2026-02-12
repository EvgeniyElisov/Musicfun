import { useDeleteMutation } from "../api/useDeleteMutation"

type Props = {
    playlistId: string
    onDeleted: (playlistId: string) => void
    
}

export const DeletePlaylist = ({ playlistId, onDeleted }: Props) => {
    const { mutate } = useDeleteMutation()

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        mutate(playlistId)
        onDeleted?.(playlistId)
    }

    return <button onClick={handleDeleteClick}>🗑️</button>
}