import DefaultButton from "@/components/button/DefaultButton/DefaultButton.tsx"
import DefaultInput from "@/components/input/DefaultInput/DefaultInput.tsx"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import "./TodoInput.scoped.scss"

type TodoInputProps = {
  setTodoItemValue: (text: string) => void
  defaultInputValue?: string
  buttonText: string
  buttonFontSize?: string | number
}

export default function TodoInput({
  setTodoItemValue,
  defaultInputValue = "",
  buttonText,
  buttonFontSize,
}: TodoInputProps) {
  const [inputText, setInputText] = useState(defaultInputValue)

  const changeInput = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    const value = element.value
    setInputText(value)
  }
  const clickTodoItemButton = () => {
    setTodoItemValue(inputText)
  }

  const enterTodoItem = (e: KeyboardEvent) => {
    if (e.code === "Enter" && !e.nativeEvent.isComposing) {
      setTodoItemValue(inputText)
    }
  }
  return (
    <div className="todo-input">
      <div className="input-container">
        <DefaultInput
          changeInput={changeInput}
          enterInput={enterTodoItem}
          inputValue={inputText}
        />
      </div>
      <DefaultButton
        text={buttonText}
        onClickButton={clickTodoItemButton}
        fontSize={buttonFontSize}
      />
    </div>
  )
}
