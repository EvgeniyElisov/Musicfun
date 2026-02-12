import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { client } from "../../../../shared/api/client.ts"
import type { SchemaUpdatePlaylistRequestPayload } from "../../../../shared/api/schema.ts"
import { useEffect } from "react"

type Props = {
    playlistId: string,
    onCancelEditing: () => void
}

export const EditPlaylistForm = ({ playlistId, onCancelEditing }: Props) => {

    const { register, handleSubmit, reset } = useForm<SchemaUpdatePlaylistRequestPayload>()
    const queryClient = useQueryClient()

    const { data, isPending, isError } = useQuery({
        queryKey: ["playlists", playlistId],
        queryFn: async () => {
            const response = await client.GET("/playlists/{playlistId}", {
                params: { path: { playlistId } },
            })
            return response.data
        },
        // enabled — флаг, выполнять ли запрос вообще.
        // !!playlistId приводит playlistId к boolean:
        //   true  — если есть валидный id плейлиста,
        //   false — если id нет (null/undefined/"").
        // Пока id нет, запрос к серверу не запускается.
        enabled: !!playlistId,
    })

    const { mutate } = useMutation({
        mutationFn: async (data: SchemaUpdatePlaylistRequestPayload) => {
            const response = await client.PUT("/playlists/{playlistId}", {
                params: { path: { playlistId } },
                body: {
                    title: data.title,
                    description: data.description || null,
                    tagIds: [],
                },
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

    const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
        mutate(data)
    }

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error...</div>
    if (!playlistId) return <></>
 
    useEffect(() => {
        reset()
    }, [playlistId])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit Playlist</h2>
            <p>
                <input {...register("title")} defaultValue={data?.data.attributes.title} />
            </p>
            {/* {errors.title && <p>{errors.title.message}</p>} */}
            <p>
                <textarea {...register("description")} defaultValue={data?.data.attributes.description || ""}></textarea>
            </p>
            {/* {errors.description && <p>{errors.description.message}</p>} */}

            <button type={"submit"}>Edit</button>
            {/* {errors.root?.server && <p>{errors.root?.server.message}</p>} */}
        </form>
    )

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     setError,
    //     formState: { errors },
    // } = useForm<SchemaUpdatePlaylistRequestPayload>()

    // useEffect(() => {
    //     reset()
    // }, [playlistId])

    // const { data, isPending, isError } = usePlaylistQuery(playlistId)

    // const { mutate } = useUpdatePlaylistMutation({
    //     onSuccess: () => {
    //         onCancelEditing()
    //     },
    //     onError: queryErrorHandlerForRHFFactory({ setError }),
    // })

    // const onSubmit = (data: SchemaUpdatePlaylistRequestPayload) => {
    //     mutate({ ...data, playlistId: playlistId! })
    // }

    // const handleCancelEditingClick = () => {
    //     onCancelEditing()
    // }

    // if (!playlistId) return <></>
    // if (isPending) return <p>Loading...</p>
    // if (isError) return <p>Error...</p>

    // return (
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //         <h2>Edit Playlist</h2>
    //         <p>
    //             <input {...register("title")} defaultValue={data.data.attributes.title} />
    //         </p>
    //         {errors.title && <p>{errors.title.message}</p>}
    //         <p>
    //             <textarea
    //                 {...register("description")}
    //                 defaultValue={data.data.attributes.description!}
    //             ></textarea>
    //         </p>
    //         {errors.description && <p>{errors.description.message}</p>}
    //         <button type={"submit"}>Save</button>
    //         <button type={"reset"} onClick={handleCancelEditingClick}>
    //             Cancel
    //         </button>
    //         {errors.root?.server && <p>{errors.root?.server.message}</p>}
    //     </form>
    // )
}