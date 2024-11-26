import DefaultPieChart from "@/components/chart/DefaultPieChart/DefaultPieChart"
import { CHART_TYPE } from "@/constants/chart/chart-type.constants"
import { useChartSeries } from "@/hooks/chart/useChartSeries"
import { TodoCategoryDto } from "@/model/todo/todo-category.dto"
import { TodoItemModel } from "@/model/todo/todo-item.model"
import "./CheckTodoListChart.scoped.scss"

type CheckTodoListChartType = {
  todoList: TodoItemModel[]
  categoryList: TodoCategoryDto[]
}

export default function CheckTodoListChart({
  todoList,
  categoryList,
}: CheckTodoListChartType) {
  const { series } = useChartSeries(
    CHART_TYPE.checkTodo,
    todoList,
    categoryList
  )
  return (
    <div className="check-todo-list-chart">
      <h1 className="title">할일 완료/미완료 통계</h1>
      <DefaultPieChart series={series} />
    </div>
  )
}
