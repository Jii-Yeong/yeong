import Loading from "@/components/loading/LoadingSpinner/LoadingSpinner"
import UserProfile from "@/components/profile/UserProfile/UserProfile.tsx"
import TodoCategoryDashboard from "@/components/todo-page/TodoCategoryDashboard/TodoCategoryDashboard"
import { Suspense } from "react"

export default function DefaultSidebar() {
  return (
    <div className="default-sidebar">
      <Suspense fallback={<Loading />}>
        <UserProfile />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <TodoCategoryDashboard />
      </Suspense>
    </div>
  )
}
