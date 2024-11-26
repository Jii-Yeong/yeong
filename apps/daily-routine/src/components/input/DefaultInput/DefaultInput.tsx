import { parseDomSizeValue } from "@/utils/string.utils"
import { ChangeEvent, KeyboardEvent } from "react"
import "./DefaultInput.scoped.scss"

type DefaultInputProps = {
  changeInput: (e: ChangeEvent) => void
  enterInput?: (e: KeyboardEvent) => void
  inputValue?: string
  height?: number | string
  fontSize?: number | string
  placeholder?: string
  type?: string
  isWrong?: boolean
  wrongText?: string
}
export default function DefaultInput({
  changeInput,
  enterInput,
  inputValue = "",
  height = 30,
  fontSize = 15,
  placeholder,
  type = "text",
  wrongText,
  isWrong,
}: DefaultInputProps) {
  const style = {
    height: parseDomSizeValue(height),
    fontSize: parseDomSizeValue(fontSize),
  }
  return (
    <div className="default-input-container">
      <input
        style={style}
        className="default-input"
        onChange={changeInput}
        onKeyDown={enterInput}
        value={inputValue}
        placeholder={placeholder}
        type={type}
      />
      {isWrong && wrongText && <p className="wrong-text">{wrongText}</p>}
    </div>
  )
}
