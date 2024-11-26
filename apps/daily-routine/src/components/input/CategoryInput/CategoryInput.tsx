import AddButton from "@/components/button/AddButton/AddButton"
import DefaultButton from "@/components/button/DefaultButton/DefaultButton"
import { useState } from "react"
import TodoInput from "../TodoInput/TodoInput"
import "./CategoryInput.scoped.scss"

type CategoryInput = {
  setCategoryValue: (name: string) => void
}

export default function CategoryInput({ setCategoryValue }: CategoryInput) {
  const [isClick, setIsClick] = useState(false)

  const handleClickCancelButton = () => {
    setIsClick(false)
  }

  const handleClickAddButton = () => {
    setIsClick(true)
  }
  return (
    <div className="category-input">
      {isClick ? (
        <div className="default-input">
          <div className="todo-input-wrapper">
            <TodoInput buttonText="추가" setTodoItemValue={setCategoryValue} />
          </div>
          <DefaultButton text="취소" onClickButton={handleClickCancelButton} />
        </div>
      ) : (
        <AddButton text="카테고리 추가" clickAddButton={handleClickAddButton} />
      )}
    </div>
  )
}
