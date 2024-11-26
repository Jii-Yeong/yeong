import { editorInit } from "@/utils/editor.utils"
import { Editor } from "@tinymce/tinymce-react"

type EditorInputProps = {
  value: string
  setValue: (value: string) => void
}

export default function EditorInput({ setValue, value }: EditorInputProps) {
  const handleChangeValue = (newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={value}
        init={editorInit}
        onEditorChange={(newValue: string) => handleChangeValue(newValue)}
      />
    </>
  )
}
