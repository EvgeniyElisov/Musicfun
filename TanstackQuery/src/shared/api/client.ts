import createClient from "openapi-fetch"
import type { paths } from "./schema"

export const client = createClient<paths>({
    baseUrl: "https://musicfun.it-incubator.app/api/1.0",
    headers: {
        "api-key": "ee3e0687-1ce1-45ba-a6ad-da7a7b5adef0",
    },
})