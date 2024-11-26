export type TodoCategoryDto = {
  id: number | null
  user_id: string
  name: string
  created_at: string
}

export type TodoCategoryReqDto = Partial<
  Pick<TodoCategoryDto, "user_id" | "name">
>
