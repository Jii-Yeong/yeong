import BackgroundShadow from "@/components/background/BackgroundShadow/BackgroundShadow"
import DefaultButton from "@/components/button/DefaultButton/DefaultButton"
import { modalState } from "@/recoil/modal/modal"
import { useRecoilState } from "recoil"
import "./ConfirmModal.scoped.scss"

export default function ConfirmModal() {
  const [modal] = useRecoilState(modalState)
  return (
    <BackgroundShadow>
      <div className="default-modal-container">
        <p className="confirm-text">{modal.text}</p>
        <div className="button-container">
          <DefaultButton
            text="확인"
            onClickButton={modal.clickOkButton}
            color="rgba(var(--white), 1)"
            backgroundColor="rgba(var(--blue), 1)"
          />
          <DefaultButton text="취소" onClickButton={modal.clickCalcenButton} />
        </div>
      </div>
    </BackgroundShadow>
  )
}
