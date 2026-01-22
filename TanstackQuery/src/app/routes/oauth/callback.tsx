import { createFileRoute } from "@tanstack/react-router"
import { OAuthCallbackPage } from "../../../pages/auth/OauthCallbackPage"

export const Route = createFileRoute("/oauth/callback")({
    component: OAuthCallbackPage,
})