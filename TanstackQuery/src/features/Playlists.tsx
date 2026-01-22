import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { client } from "../shared/api/client"
import { useState } from "react"
import { Pagination } from "../shared/ui/Pagination/Pagination"

export const Playlists = () => {
    const [page, setPage] = useState(1)

    const query = useQuery({
        queryKey: ["playlists", page],
        queryFn: async () => {
            const response = await client.GET("/playlists", {
                params: {
                    query: {
                        pageNumber: page,
                    },
                },
            })
            if (response.error) {
                throw (response as unknown as { error: Error }).error
            }
            return response.data
        },
        placeholderData: keepPreviousData,
    })

    if (query.isPending) return <span>Loading...</span>
    if (query.isError) return <span>{JSON.stringify(query.error.message)}</span>

    return (
        <div>
            <Pagination
                pagesCount={query.data.meta.pagesCount}
                currentPage={page}
                onPageNumberChange={setPage}
                isFetching={query.isFetching}
            />
            <ul>
                {query.data?.data.map((playlist) => (
                    <li>{playlist.attributes.title}</li>
                ))}
            </ul>
        </div>
    )
}
