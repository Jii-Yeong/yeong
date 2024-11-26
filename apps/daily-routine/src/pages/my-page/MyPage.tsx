import DefaultLayout from "@/components/layout/DefaultLayout/DefaultLayout"
import Loading from "@/components/loading/LoadingSpinner/LoadingSpinner"
import MyPageChartWrapper from "@/components/my-page/MyPageChartWrapper/MyPageChartWrapper"
import MyPageSidebar from "@/components/sidebar/MyPageSidebar/MyPageSidebar"
import supabaseAdmin from "@/supabase/init"
import { getRootPage } from "@/utils/page.utils"
import { Suspense, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./MyPage.scoped.scss"

export default function MyPage() {
  const navigate = useNavigate()
  const goRootPageToNotUser = useCallback(async () => {
    const { data } = await supabaseAdmin.auth.getSession()
    if (!data.session?.user) navigate(getRootPage())
  }, [navigate])

  useEffect(() => {
    goRootPageToNotUser()
  }, [goRootPageToNotUser])

  return (
    <DefaultLayout
      sidebarChildren={
        <Suspense fallback={<Loading />}>
          <MyPageSidebar />
        </Suspense>
      }
      maxWidth={1200}
    >
      <Suspense fallback={<Loading />}>
        <MyPageChartWrapper />
      </Suspense>
    </DefaultLayout>
  )
}
