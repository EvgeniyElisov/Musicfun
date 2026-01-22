import { createFileRoute } from "@tanstack/react-router"
import PlaylistsPage from "../../pages/PlaylistsPage"

export const Route = createFileRoute("/")({ // по пути "/" загружаем компонент App
    component: PlaylistsPage,
})