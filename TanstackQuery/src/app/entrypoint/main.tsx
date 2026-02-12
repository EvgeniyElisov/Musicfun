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
      // Не повторять запрос при ошибке (false = без повторных попыток, число = количество попыток)
      retry: false,
      // Считаем данные всегда свежими, повторный запрос по таймауту никогда не произойдёт (Infinity)
      staleTime: Infinity,
      // Перезапрашивать данные при монтировании компонента, если они устарели (true)
      refetchOnMount: true,
      // Перезапрашивать данные при возврате фокуса на окно браузера, если они устарели (true)
      refetchOnWindowFocus: true,
      // Перезапрашивать данные при восстановлении сетевого соединения, если они устарели (true)
      refetchOnReconnect: true,
      // Время хранения неиспользуемых данных в кэше перед удалением (10 секунд)
      gcTime: 10 * 1000,
    },
  },
})

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)
