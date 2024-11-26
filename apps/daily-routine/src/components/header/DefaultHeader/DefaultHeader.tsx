import { getTodoListPage } from "@/utils/page.utils"
import { useNavigate } from "react-router-dom"
import "./DefaultHeader.scoped.scss"

export default function DefaultHeader() {
  const navigate = useNavigate()

  const handleClickHeaderTitle = () => {
    navigate(getTodoListPage())
  }
  return (
    <div className="default-header">
      <p className="title" onClick={handleClickHeaderTitle}>
        Daily Routine
      </p>
    </div>
  )
}
