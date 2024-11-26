import Landing from "@/pages/landing/Landing"
import SignUpPage from "@/pages/sign-up-page/SignUpPage"
import TodoPage from "@/pages/todo-page/TodoPage"
import MyPageRoutes from "@/routes/MyPageRoutes.tsx"
import { createBrowserRouter } from "react-router-dom"

const Router = createBrowserRouter([
  ...MyPageRoutes,
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/todo-page",
    element: <TodoPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
])

export default Router
