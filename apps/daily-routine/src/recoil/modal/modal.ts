import { atom } from "recoil"

type ModalStateType = {
  text: string
  isOpenModal: boolean
  isClickOk: boolean
  clickOkButton: () => void
  clickCalcenButton: () => void
}

export const modalState = atom<ModalStateType>({
  key: "modalState",
  default: {
    text: "",
    isOpenModal: false,
    isClickOk: false,
    clickOkButton: () => {
      return
    },
    clickCalcenButton: () => {
      return
    },
  },
})
