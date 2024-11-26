import DefaultInformation from "@/components/information/DefaultInformation/DefaultInformation"
import CategoryTodoListChart from "@/components/my-page/CategoryTodoListChart/CategoryTodoListChart"
import CheckTodoListChart from "@/components/my-page/CheckTodoListChart/CheckTodoListChart"
import DateTodoListChart from "@/components/my-page/DateTodoListChart/DateTodoListChart"
import { useTodoCategory } from "@/hooks/todo/useTodoCategory"
import { useTodoList } from "@/hooks/todo/useTodoList"
import "./MyPageChartWrapper.scoped.scss"

export default function MyPageChartWrapper() {
  const { todoList } = useTodoList()
  const { categoryList } = useTodoCategory()

  return (
    <>
      {todoList.length > 0 ? (
        <div className="my-page-chart-wrapper-container">
          <CheckTodoListChart todoList={todoList} categoryList={categoryList} />
          <DateTodoListChart todoList={todoList} categoryList={categoryList} />
          <div className="category-todo-list-chart-container">
            <CategoryTodoListChart
              todoList={todoList}
              categoryList={categoryList}
            />
          </div>
        </div>
      ) : (
        <DefaultInformation text="아직 투두리스트가 없습니다. 새로 생성해보세요!" />
      )}
    </>
  )
}
