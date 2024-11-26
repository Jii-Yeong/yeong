import DefaultStackChart from "@/components/chart/DefaultStackChart/DefaultStackChart"
import { CHART_TYPE } from "@/constants/chart/chart-type.constants"
import { useChartSeries } from "@/hooks/chart/useChartSeries"
import { TodoCategoryDto } from "@/model/todo/todo-category.dto"
import { TodoItemModel } from "@/model/todo/todo-item.model"
import "./DateTodoListChart.scoped.scss"

type DateTodoListChartType = {
  todoList: TodoItemModel[]
  categoryList: TodoCategoryDto[]
}

export default function DateTodoListChart({
  todoList,
  categoryList,
}: DateTodoListChartType) {
  const { series, xAxis } = useChartSeries(
    CHART_TYPE.dateTodo,
    todoList,
    categoryList
  )

  return (
    <div className="date-todo-list-chart">
      <h1 className="title">날짜별 통계</h1>
      <DefaultStackChart series={series} xAxis={xAxis} />
    </div>
  )
}
