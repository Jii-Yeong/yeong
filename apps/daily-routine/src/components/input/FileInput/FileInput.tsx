import { ChangeEvent } from "react"

type FileInputProps = {
  setInputValue: (e: ChangeEvent) => void
  accept?: string
}

export default function FileInput({
  setInputValue,
  accept = "image/png, image/jpeg",
}: FileInputProps) {
  return <input type="file" onChange={setInputValue} accept={accept} />
}
