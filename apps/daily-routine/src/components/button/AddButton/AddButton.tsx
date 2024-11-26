import MuIcon from "@/components/icon/MuIcon"
import "./AddButton.scoped.scss"

type AddButtonProps = {
  clickAddButton: () => void
  text: string
  color?: string
}

export default function AddButton({
  text,
  clickAddButton,
  color = "rgb(var(--green))",
}: AddButtonProps) {
  const style = {
    color,
  }
  return (
    <div className="add-button" onClick={clickAddButton} style={style}>
      <MuIcon icon="add" size={20} />
      <p className="text">{text}</p>
    </div>
  )
}
