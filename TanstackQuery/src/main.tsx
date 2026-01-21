import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient() //создание экземпляра клиента React
// Query - управляет кэшем, контролирует настройки, синхронизирует данные

createRoot(document.getElementById("root")!).render(
  //React-компонент провайдер - предоставляет доступ к queryClient всему
  // дереву компонентов, создает контекст, должен оборачивать корневой
  // компонент приложения
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)
