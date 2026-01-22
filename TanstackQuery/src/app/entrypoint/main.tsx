import { createRoot } from "react-dom/client"
import "../styles/index.css"
import "../styles/reset.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "../routes/routeTree.gen"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Время, в течение которого данные считаются свежими (Infinity = данные никогда не устаревают)
      staleTime: Infinity,
      // Не перезапрашивать данные при монтировании компонента
      refetchOnMount: false,
      // Не перезапрашивать данные при возврате фокуса на окно браузера
      refetchOnWindowFocus: false,
      // Не перезапрашивать данные при восстановлении сетевого соединения
      refetchOnReconnect: false,
      // Время хранения неактивных данных в кэше перед удалением (10 секунд)
      gcTime: 10 * 1000,
    },
  },
})

const router = createRouter({ routeTree })

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)
