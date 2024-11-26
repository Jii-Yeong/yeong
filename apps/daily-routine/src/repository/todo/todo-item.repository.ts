import { DB_TABLE_NAME } from "@/constants/db-table.constants.ts"
import { TodoItemDto, TodoItemReqDto } from "@/model/todo/todo-item.dto.ts"
import { TodoItemModel } from "@/model/todo/todo-item.model"
import supabaseAdmin from "@/supabase/init.ts"

export const getTodoList = async (
  userId: TodoItemReqDto["user_id"],
  categoryId?: string | null
) => {
  const response = supabaseAdmin
    .from("todo_item")
    .select()
    .eq("user_id", userId)
  if (categoryId) {
    response.eq("category_id", Number(categoryId))
  }
  const { data } = await response.order("order").returns<TodoItemDto[]>()
  return data || []
}

export const getTodoItem = async (id: TodoItemReqDto["id"]) => {
  const { data } = await supabaseAdmin
    .from("todo_item")
    .select()
    .eq("id", id)
    .single<TodoItemDto>()
  return data
}

export const getTodoSubList = async (subId: TodoItemReqDto["sub_id"]) => {
  const { data } = await supabaseAdmin
    .from("todo_item")
    .select()
    .eq("sub_id", subId)
    .returns<TodoItemDto[]>()
  return data || []
}

export const addTodoItem = async (todoReq: TodoItemReqDto) => {
  await supabaseAdmin.from(DB_TABLE_NAME.todoItem).insert(todoReq)
}

export const updateTodoItem = async (
  id: TodoItemModel["id"],
  todoItem: TodoItemReqDto
) => {
  const { error } = await supabaseAdmin
    .from(DB_TABLE_NAME.todoItem)
    .update(todoItem)
    .eq("id", id)
  if (error) console.log(error)
}

export const deleteTodoItem = async (id: TodoItemModel["id"]) => {
  const { error: mainError } = await supabaseAdmin
    .from(DB_TABLE_NAME.todoItem)
    .delete()
    .eq("id", id)
  const { error: subError } = await supabaseAdmin
    .from(DB_TABLE_NAME.todoItem)
    .delete()
    .eq("sub_id", id)
  if (mainError) console.log(mainError)
  if (subError) console.log(subError)
}
