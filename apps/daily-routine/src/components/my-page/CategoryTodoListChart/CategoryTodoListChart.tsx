import DefaultStackChart from "@/components/chart/DefaultStackChart/DefaultStackChart"
import { CHART_TYPE } from "@/constants/chart/chart-type.constants"
import { useChartSeries } from "@/hooks/chart/useChartSeries"
import { TodoCategoryDto } from "@/model/todo/todo-category.dto"
import { TodoItemModel } from "@/model/todo/todo-item.model"
import "./CategoryTodoListChart.scoped.scss"

type CategoryTodoListChartType = {
  todoList: TodoItemModel[]
  categoryList: TodoCategoryDto[]
}

export default function CategoryTodoListChart({
  todoList,
  categoryList,
}: CategoryTodoListChartType) {
  const { series, xAxis } = useChartSeries(
    CHART_TYPE.categoryTodo,
    todoList,
    categoryList
  )
  return (
    <div className="category-todo-list-chart">
      <h1 className="title">카테고리별 통계</h1>
      <DefaultStackChart series={series} xAxis={xAxis} />
    </div>
  )
}
