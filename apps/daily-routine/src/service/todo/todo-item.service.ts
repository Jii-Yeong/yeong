import {
  TodoItemDto,
  TodoItemReqDto,
  toTodoItemModel,
} from "@/model/todo/todo-item.dto"
import { TodoItemModel } from "@/model/todo/todo-item.model"
import {
  addTodoItem,
  deleteTodoItem,
  getTodoItem,
  getTodoList,
  getTodoSubList,
  updateTodoItem,
} from "@/repository/todo/todo-item.repository"

export const getTodoListService = async (
  userId: TodoItemDto["user_id"],
  categoryId: string | null
) => {
  const data = await getTodoList(userId, categoryId)
  const subData = data.filter((item) => item.sub_id)

  const todoList = data.map((item) => {
    const subList = subData
      .filter((sub) => sub.sub_id === item.id)
      .map((item) => toTodoItemModel(item))

    return {
      ...toTodoItemModel(item),
      sub_item: subList.length > 0 ? subList : null,
    }
  })

  return todoList.filter((item) => !item.sub_id)
}

export const getTodoListItemService = async (id: TodoItemDto["id"]) => {
  const data = await getTodoItem(id)
  if (!data) return
  return toTodoItemModel(data)
}

export const getTodoSubListService = async (subId: TodoItemDto["sub_id"]) => {
  const data = await getTodoSubList(subId)
  return data.map((item) => toTodoItemModel(item))
}

export const addTodoListSerivce = async (
  text: string,
  itemId: TodoItemDto["id"] | null,
  userId: TodoItemDto["user_id"],
  categoryId: string | null
) => {
  const todoReq: TodoItemReqDto = {
    todo_text: text,
    user_id: userId,
    sub_id: itemId,
  }
  if (categoryId) todoReq["category_id"] = Number(categoryId)
  await addTodoItem(todoReq)
}

export const updateTodoItemService = async (
  id: number,
  todoItem: TodoItemReqDto
) => {
  await updateTodoItem(id, todoItem)
}

export const deleteTodoItemService = async (id: TodoItemModel["id"]) => {
  await deleteTodoItem(id)
}
