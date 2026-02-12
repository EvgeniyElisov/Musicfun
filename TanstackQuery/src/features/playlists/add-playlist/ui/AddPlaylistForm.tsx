import { useForm } from "react-hook-form"
import type { SchemaCreatePlaylistRequestPayload } from "../../../../shared/api/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "../../../../shared/api/client"

export const AddPlaylistForm = () => {
    const { register, handleSubmit } = useForm<SchemaCreatePlaylistRequestPayload>()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async (data: SchemaCreatePlaylistRequestPayload) => {
            const response = await client.POST("/playlists", {
                body: data,
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["playlists"],
                // refetchType — какие запросы с этим queryKey реально перезапросить:
                // "active"   — только активные (есть подписчики в UI),
                // "inactive" — только неактивные (в кэше, но без подписчиков),
                // "all"      — и активные, и неактивные запросы.
                refetchType: "all",
            })
        },
    })

    const onSubmit = (data: SchemaCreatePlaylistRequestPayload) => {
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Add New Playlist</h2>
            <p>
                <input {...register("title")} />
            </p>
            {/* {errors.title && <p>{errors.title.message}</p>} */}
            <p>
                <textarea {...register("description")}></textarea>
            </p>
            {/* {errors.description && <p>{errors.description.message}</p>} */}

            <button type={"submit"}>Create</button>
            {/* {errors.root?.server && <p>{errors.root?.server.message}</p>} */}
        </form>
    )
}