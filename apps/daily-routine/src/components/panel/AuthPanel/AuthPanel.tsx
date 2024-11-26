import DefaultButton from "@/components/button/DefaultButton/DefaultButton"
import { ReactNode } from "react"
import "./AuthPanel.scoped.scss"

type AuthPanelProps = {
  children: ReactNode
  clickSubmitButton: () => void
  authButtonText: string
  changePageText: string
  clickChangePage: () => void
}

export default function AuthPanel({
  children,
  clickSubmitButton,
  authButtonText,
  changePageText,
  clickChangePage,
}: AuthPanelProps) {
  return (
    <div className="auth-panel-container">
      <div className="auth-panel">
        <p className="title">Daily Routine</p>
        {children}
        <div className="auth-button-wrapper">
          <DefaultButton
            text={authButtonText}
            width="100%"
            onClickButton={clickSubmitButton}
            height={40}
          />
        </div>
        <p className="change-page-text" onClick={clickChangePage}>
          {changePageText}
        </p>
      </div>
    </div>
  )
}
