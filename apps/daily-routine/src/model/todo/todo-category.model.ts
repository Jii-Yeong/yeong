import { TodoCategoryDto } from "@/model/todo/todo-category.dto.ts"

export type TodoCategoryModel = TodoCategoryDto

export const initTodoCategory = (): TodoCategoryModel => {
  return {
    id: 0,
    name: "전체",
    user_id: "",
    created_at: "",
  }
}
