import LandingPageCover from "@/assets/images/landing/landing-page-cover.jpg"
import LoginPanel from "@/components/landing/LoginPanel/LoginPanel"
import supabaseAdmin from "@/supabase/init"
import { getTodoListPage } from "@/utils/page.utils"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Landing.scoped.scss"

export default function Landing() {
  const navigate = useNavigate()
  const checkIsUser = useCallback(async () => {
    const user = await supabaseAdmin.auth.getSession()
    if (user.data.session) navigate(getTodoListPage())
  }, [navigate])

  useEffect(() => {
    checkIsUser()
  }, [checkIsUser])

  return (
    <div className="landing-page">
      <div className="login-panel-wrapper">
        <LoginPanel />
      </div>
      <img
        className="landing-image-cover"
        src={LandingPageCover}
        alt="landing-cover"
      />
    </div>
  )
}
