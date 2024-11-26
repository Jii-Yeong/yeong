import DefaultButton from "@/components/button/DefaultButton/DefaultButton"
import EditorInput from "@/components/input/EditorInput/EditorInput"
import "./EditorInputWrapper.scoped.scss"

type EditorInputWrapperProps = {
  editorValue: string
  setEditorValue: (value: string) => void
  clickSubmitButton: () => void
  clickCancelButton: () => void
}

export default function EditorInputWrapper({
  editorValue,
  setEditorValue,
  clickCancelButton,
  clickSubmitButton,
}: EditorInputWrapperProps) {
  return (
    <div className="todo-input-container">
      <EditorInput value={editorValue} setValue={setEditorValue} />
      <div className="control-button">
        <DefaultButton text="입력" onClickButton={clickSubmitButton} />
        <DefaultButton text="취소" onClickButton={clickCancelButton} />
      </div>
    </div>
  )
}
