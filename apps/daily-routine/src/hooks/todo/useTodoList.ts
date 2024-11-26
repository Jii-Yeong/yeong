import { TODO_LIST } from "@/constants/todo-list-constants"
import { toTodoItemReqDto } from "@/model/todo/todo-item.dto"
import { TodoItemModel } from "@/model/todo/todo-item.model.ts"
import { userProfileSelector } from "@/recoil/user/user-selectors.ts"
import {
  addTodoListSerivce,
  deleteTodoItemService,
  getTodoListItemService,
  getTodoListService,
  getTodoSubListService,
  updateTodoItemService,
} from "@/service/todo/todo-item.service"
import { DragEvent, useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useRecoilValue } from "recoil"

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoItemModel[]>([])
  const [dragStartElement, setDragStartElement] =
    useState<HTMLDivElement | null>()
  const [dragItem, setDragItem] = useState<TodoItemModel>()
  const userData = useRecoilValue(userProfileSelector)
  const userId = userData?.id
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get("category_id")

  const fetchTodoList = useCallback(async () => {
    if (!userId) return
    const data = await getTodoListService(userId, categoryId)
    setTodoList(data)
  }, [userId, categoryId])

  const enterTodoItem = async (
    text: TodoItemModel["text"],
    itemId?: TodoItemModel["id"]
  ) => {
    if (!userId) return
    await addTodoListSerivce(text, itemId || null, userId, categoryId)
    if (itemId) {
      await updateTodoItemService(itemId, {
        checked: false,
      })
    }

    await fetchTodoList()
  }

  const clickCheckboxButton = async (
    id: TodoItemModel["id"],
    checked: TodoItemModel["checked"]
  ) => {
    if (!userId) return

    const todoItem = {
      checked,
    }
    const targetUpperItem = todoList.find((item) => item.id === id)
    const targetItem = await getTodoListItemService(id)
    const targetSubId = targetItem?.sub_id || null
    const targetSubItem = targetUpperItem?.sub_item

    if (targetSubItem) {
      const updateSubItem = targetSubItem.map(async (item) => {
        await updateTodoItemService(item.id, todoItem)
      })
      await Promise.all(updateSubItem)
    }

    await updateTodoItemService(id, todoItem)

    if (targetSubId) {
      if (!checked)
        await updateTodoItemService(targetSubId, {
          checked: false,
        })

      const targetDepsItem = await getTodoSubListService(targetSubId)

      const isAllChecked = targetDepsItem?.every((item) => item.checked)
      if (isAllChecked)
        await updateTodoItemService(targetSubId, {
          checked: true,
        })
    }

    await fetchTodoList()
  }

  const clickDeleteButton = async (id: TodoItemModel["id"]) => {
    const targetItem = await getTodoListItemService(id)
    await deleteTodoItemService(id)

    const targetSubId = targetItem?.sub_id || null

    if (targetSubId) {
      const targetDepsItem = await getTodoSubListService(targetSubId)

      const isAllChecked = targetDepsItem?.every((item) => item.checked)
      if (isAllChecked)
        await updateTodoItemService(targetSubId, {
          checked: true,
        })
    }

    await fetchTodoList()
  }

  const editTodoItemValue = async (
    id: TodoItemModel["id"],
    text: TodoItemModel["text"]
  ) => {
    if (!userId) {
      const filteredTodoList = todoList.map((item) => {
        if (item.id === id) item.text = text
        return item
      })
      setTodoList(filteredTodoList)
      return
    }
    const todoItem = {
      todo_text: text,
    }
    await updateTodoItemService(id, todoItem)
    await fetchTodoList()
  }

  const dragStartTodoItem = (e: DragEvent, item: TodoItemModel) => {
    setDragItem(item)

    const element = e.target as HTMLDivElement
    setDragStartElement(element)

    setTimeout(() => {
      element.classList.add("hidden")
    })
  }

  const dragOverTodoItem = (e: DragEvent) => {
    e.preventDefault()
  }

  const dragEndTodoItem = () => {
    if (!dragStartElement) return
    dragStartElement.classList.remove("hidden")
    dragStartElement.classList.remove("draggable")
  }

  const dropTodoItem = async (e: DragEvent, item: TodoItemModel) => {
    e.preventDefault()
    if (!dragItem) return

    const copyItem = { ...item }

    item.order = dragItem.order
    dragItem.order = copyItem.order

    await updateTodoItemService(item.id, toTodoItemReqDto(item))
    await updateTodoItemService(dragItem.id, toTodoItemReqDto(dragItem))

    fetchTodoList()
  }

  const clickRandomTodoListButton = async () => {
    const number = Math.floor(Math.random() * TODO_LIST.length)
    const randomItem = TODO_LIST[number]
    await enterTodoItem(randomItem)
  }

  useEffect(() => {
    fetchTodoList()
  }, [fetchTodoList])

  return {
    fetchTodoList,
    todoList,
    enterTodoItem,
    clickCheckboxButton,
    clickDeleteButton,
    editTodoItemValue,
    dragStartTodoItem,
    dragOverTodoItem,
    dropTodoItem,
    dragEndTodoItem,
    clickRandomTodoListButton,
  }
}
