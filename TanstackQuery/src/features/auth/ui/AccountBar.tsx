import { useQuery } from "@tanstack/react-query"
import { client } from "../../../shared/api/client.ts"
import { LoginButton } from "./LoginButton.tsx"

export const AccountBar = () => {
    const query = useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const response = await client.GET("/auth/me")
            return response.data
        },
    })

    return (
        <div>
            {!query.data && <LoginButton />}
            {/*{query.data && <CurrentUser />}*/}
        </div>
    )
}