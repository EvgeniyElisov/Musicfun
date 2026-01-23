import createClient, { type Middleware, type MiddlewareCallbackParams } from "openapi-fetch"
import type { paths } from "./schema"

const authMiddleware: Middleware = {
    async onRequest({ request, options }: MiddlewareCallbackParams) {
        const accessToken = localStorage.getItem('musicfun-access-token');
        if (accessToken) {
            request.headers.set("Authorization", "Bearer " + accessToken);
        }
        return request;
    },
    onResponse({ response }: MiddlewareCallbackParams & { response: Response }) {
        if (!response.ok) {
            throw new Error(`${response.url}: ${response.status} ${response.statusText}`)
        }
        return response;
    }

};

export const client = createClient<paths>({
    baseUrl: "https://musicfun.it-incubator.app/api/1.0",
    headers: {
        "api-key": "ee3e0687-1ce1-45ba-a6ad-da7a7b5adef0",
    },
})

client.use(authMiddleware);
