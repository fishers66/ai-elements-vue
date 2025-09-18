export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'blocked'

export interface TaskItem {
  id?: string | number
  title: string
  description?: string
  status?: TaskStatus
  progress?: number
  assignee?: string
  dueDate?: string
  tags?: string[]
}
