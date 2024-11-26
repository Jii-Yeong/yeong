import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout.tsx"
import Loading from "@/components/loading/LoadingSpinner/LoadingSpinner"
import DefaultSidebar from "@/components/sidebar/DefaultSidebar/DefaultSidebar"
import TodoDashboard from "@/components/todo-page/TodoDashboard/TodoDashboard"
import supabaseAdmin from "@/supabase/init"
import { getRootPage } from "@/utils/page.utils"
import { Suspense, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function TodoPage() {
  const navigate = useNavigate()
  const goRootPageToNotUser = useCallback(async () => {
    const { data } = await supabaseAdmin.auth.getSession()
    if (!data.session?.user) navigate(getRootPage())
  }, [navigate])

  useEffect(() => {
    goRootPageToNotUser()
  }, [goRootPageToNotUser])

  return (
    <DefaultLayout sidebarChildren={<DefaultSidebar />}>
      <Suspense fallback={<Loading />}>
        <TodoDashboard />
      </Suspense>
    </DefaultLayout>
  )
}
