import CategoryInput from "@/components/input/CategoryInput/CategoryInput.tsx"
import CategoryListItem from "@/components/list-item/CategoryListItem/CategoryListItem"
import { useTodoCategory } from "@/hooks/todo/useTodoCategory"
import { useScrollLock } from "@/hooks/utils/useScrollLock"
import { TodoCategoryModel } from "@/model/todo/todo-category.model.ts"
import "@/style/todo-item-viewer.scss"
import { getTodoListPage } from "@/utils/page.utils.ts"
import { MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import "./TodoCategoryDashboard.scoped.scss"

export default function TodoCategoryDashboard() {
  const { categoryList, clickAddTodoCategory, clickEditTodoCategoryName } =
    useTodoCategory()

  const navigate = useNavigate()

  const { setScrollLock } = useScrollLock()

  const handleCategoryValue = (text: string) => {
    clickAddTodoCategory(text)
  }

  const handleClickCategory = () => {}

  const handleClickAllCategory = () => {
    navigate(getTodoListPage())
  }

  const handleClickDeleteButton = async (e: MouseEvent) => {
    e.stopPropagation()
    setScrollLock()
  }

  const handleClickEditCategoryName = (
    id: TodoCategoryModel["id"],
    name: TodoCategoryModel["name"]
  ) => {
    clickEditTodoCategoryName(id, name)
  }

  return (
    <div className="todo-category-dashboard">
      <ul className="catetory-list">
        <li className="category-item" onClick={handleClickAllCategory}>
          전체
        </li>
        {categoryList.map((item) => {
          return (
            <CategoryListItem
              key={item.id}
              item={item}
              clickCategory={handleClickCategory}
              clickDeleteButton={handleClickDeleteButton}
              clickEditName={handleClickEditCategoryName}
            />
          )
        })}
      </ul>
      <CategoryInput setCategoryValue={handleCategoryValue} />
    </div>
  )
}
