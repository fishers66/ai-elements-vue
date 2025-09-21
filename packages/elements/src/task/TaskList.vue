<script setup lang="ts">
import type { TaskItem, TaskStatus } from './types'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { Progress } from '@repo/shadcn-vue/components/ui/progress'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import ToolCallComponent from '../tool/ToolCall.vue'

interface Props {
  tasks: TaskItem[]
  class?: string
  showProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showProgress: true,
})

const classes = computed(() => cn('space-y-4', props.class))

const cardClasses = 'rounded-2xl border border-border/70 bg-card/80 p-5 text-sm text-muted-foreground shadow-sm backdrop-blur'

const headerClasses = 'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'

const metaClasses = 'flex flex-col items-start gap-1 text-xs text-muted-foreground sm:items-end'

function normalizedProgress(task: TaskItem) {
  if (typeof task.progress !== 'number')
    return undefined

  const value = Number.isFinite(task.progress) ? task.progress : 0
  return Math.min(Math.max(value, 0), 100)
}

function statusVariant(status: TaskStatus = 'todo') {
  switch (status) {
    case 'done':
      return 'default'
    case 'in-progress':
      return 'secondary'
    case 'blocked':
      return 'destructive'
    case 'todo':
    default:
      return 'outline'
  }
}

function statusLabel(status: TaskStatus = 'todo') {
  switch (status) {
    case 'done':
      return 'Completed'
    case 'in-progress':
      return 'In progress'
    case 'blocked':
      return 'Blocked'
    case 'todo':
    default:
      return 'To do'
  }
}
</script>

<template>
  <div :class="classes">
    <div
      v-for="(task, index) in props.tasks"
      :key="task.id ?? index"
      :class="cardClasses"
    >
      <div :class="headerClasses">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Badge
              :variant="statusVariant(task.status)"
              class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wide"
            >
              {{ statusLabel(task.status) }}
            </Badge>
          </div>
          <div class="space-y-1">
            <p class="text-sm font-semibold leading-6 text-foreground">
              {{ task.title }}
            </p>
            <p
              v-if="task.description"
              class="text-sm leading-6"
            >
              {{ task.description }}
            </p>
          </div>
        </div>
        <div :class="metaClasses">
          <span v-if="task.dueDate">Due {{ task.dueDate }}</span>
          <span v-if="task.assignee">@{{ task.assignee }}</span>
        </div>
      </div>
      <div
        v-if="props.showProgress && normalizedProgress(task) !== undefined"
        class="mt-4"
      >
        <div class="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{{ normalizedProgress(task) }}%</span>
        </div>
        <Progress
          :model-value="normalizedProgress(task) ?? 0"
          class="h-2 overflow-hidden rounded-full"
        />
      </div>
      <div
        v-if="task.tags?.length"
        class="mt-4 flex flex-wrap gap-2"
      >
        <Badge
          v-for="tag in task.tags"
          :key="tag"
          variant="outline"
          class="rounded-full border-dashed px-2.5 py-0.5 text-xs text-muted-foreground"
        >
          {{ tag }}
        </Badge>
      </div>
      <div
        v-if="task.tools?.length"
        class="mt-4 space-y-3 border-t border-border/60 pt-4"
      >
        <ToolCallComponent
          v-for="tool in task.tools"
          :key="tool.id ?? tool.name"
          v-bind="tool"
          variant="inset"
        />
      </div>
      <slot :task="task" />
    </div>
  </div>
</template>
