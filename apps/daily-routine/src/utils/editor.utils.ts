export const editorInit = {
  plugins: ["image"],
  toolbar:
    "undo redo | blocks | " +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "lists table link charmap searchreplace | " +
    "image media codesample emoticons fullscreen preview | " +
    "removeformat",
  automatic_uploads: true,
  file_picker_callback: function (
    cb: (value: string, meta?: Record<string, any>) => void
  ) {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.onchange = function (this, e) {
      const element = e.target as HTMLInputElement

      if (!element || !element.files) return
      const file = element.files[0]

      const reader = new FileReader()
      reader.onload = function () {
        const id = "blobid" + new Date().getTime()
        if (!tinymce || !tinymce.activeEditor) return

        const blobCache = tinymce.activeEditor.editorUpload.blobCache
        const result = reader.result as string
        const base64 = result.split(",")[1]
        const blobInfo = blobCache.create(id, file, base64)
        blobCache.add(blobInfo)

        cb(blobInfo.blobUri(), { title: file.name })
      }
      reader.readAsDataURL(file)
    }

    input.click()
  },
}
