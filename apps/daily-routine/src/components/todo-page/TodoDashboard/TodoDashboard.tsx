import DepsTodoList from "@/components/todo-item/DepsTodoList/DepsTodoList"
import { categoryNameState } from "@/recoil/todo/todo-category"
import { useRecoilValue } from "recoil"
import "./TodoDashboard.scoped.scss"

export default function TodoDashboard() {
  const categoryName = useRecoilValue(categoryNameState)
  return (
    <div className="todo-dash-board">
      <p>{categoryName}</p>
      <div className="todo-list-container">
        <DepsTodoList />
      </div>
    </div>
  )
}
