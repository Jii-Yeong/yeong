import { DB_TABLE_NAME } from "@/constants/db-table.constants.ts"
import {
  TodoCategoryDto,
  TodoCategoryReqDto,
} from "@/model/todo/todo-category.dto.ts"
import supabaseAdmin from "@/supabase/init.ts"

export const selectTodoCategoryList = async (
  userId: TodoCategoryDto["user_id"]
) => {
  const { data } = await supabaseAdmin
    .from(DB_TABLE_NAME.todoCategory)
    .select()
    .eq("user_id", userId)
    .order("created_at")
    .returns<TodoCategoryDto[]>()
  return data
}

export const selectTodoCategory = async (id: TodoCategoryDto["id"]) => {
  const { data } = await supabaseAdmin
    .from(DB_TABLE_NAME.todoCategory)
    .select()
    .eq("id", id)
    .single<TodoCategoryDto>()
  return data
}

export const insertTodoCategory = async (category: TodoCategoryReqDto) => {
  await supabaseAdmin.from(DB_TABLE_NAME.todoCategory).insert(category)
}

export const deleteTodoCategory = async (id: TodoCategoryDto["id"]) => {
  const { error } = await supabaseAdmin
    .from(DB_TABLE_NAME.todoCategory)
    .delete()
    .eq("id", id)
  if (error) console.log(error)
}

export const updateTodoCategory = async (
  id: TodoCategoryDto["id"],
  category: TodoCategoryReqDto
) => {
  await supabaseAdmin
    .from(DB_TABLE_NAME.todoCategory)
    .update(category)
    .eq("id", id)
}
