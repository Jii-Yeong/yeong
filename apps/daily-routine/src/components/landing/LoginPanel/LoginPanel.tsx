import googleLogo from "@/assets/images/logo/google-logo.png"
import DefaultInput from "@/components/input/DefaultInput/DefaultInput"
import AuthPanel from "@/components/panel/AuthPanel/AuthPanel"
import { userProfileSelector } from "@/recoil/user/user-selectors"
import { signInWithGoogle, signInWithPassword } from "@/supabase/auth"
import { getSignUpPage, getTodoListPage } from "@/utils/page.utils"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilRefresher_UNSTABLE } from "recoil"
import "./LoginPanel.scoped.scss"

export default function LoginPanel() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isWrongLogin, setIsWrongLogin] = useState(false)
  const navigate = useNavigate()
  const refresher = useRecoilRefresher_UNSTABLE(userProfileSelector)

  const handleSetEmail = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    setEmail(element.value)
  }
  const handleSetPassword = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    setPassword(element.value)
  }
  const handleClickLoginButton = async () => {
    const signIn = await signInWithPassword(email, password)
    if (!signIn) {
      navigate(getTodoListPage())
      refresher()
      return
    }
    setIsWrongLogin(true)
  }
  const handleClickSignUpButton = () => {
    navigate(getSignUpPage())
  }

  const handleClickSocialButton = async (socialName: string) => {
    switch (socialName) {
      case "google": {
        signInWithGoogle()
        break
      }
    }
  }
  return (
    <AuthPanel
      changePageText="아이디가 없으신가요? 회원가입 하러가기"
      authButtonText="로그인"
      clickChangePage={handleClickSignUpButton}
      clickSubmitButton={handleClickLoginButton}
    >
      <DefaultInput
        inputValue={email}
        changeInput={handleSetEmail}
        height={40}
        placeholder="이메일"
      />
      <DefaultInput
        inputValue={password}
        changeInput={handleSetPassword}
        height={40}
        placeholder="비밀번호"
        type="password"
      />
      <div className="social-login-container">
        <img
          className="social-login-button"
          src={googleLogo}
          alt="google-logo"
          onClick={() => handleClickSocialButton("google")}
        />
      </div>
      {isWrongLogin && (
        <p className="wrong-login">아이디와 비밀번호를 다시 확인해주세요.</p>
      )}
    </AuthPanel>
  )
}
