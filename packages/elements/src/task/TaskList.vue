<script setup lang="ts">
import type { TaskItem, TaskStatus } from './types'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { Progress } from '@repo/shadcn-vue/components/ui/progress'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface Props {
  tasks: TaskItem[]
  class?: string
  showProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showProgress: true,
})

const classes = computed(() => cn('space-y-3', props.class))

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
      class="rounded-xl border bg-card p-4 shadow-sm"
    >
      <div class="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p class="text-sm font-medium text-foreground">
            {{ task.title }}
          </p>
          <p
            v-if="task.description"
            class="mt-1 text-sm text-muted-foreground"
          >
            {{ task.description }}
          </p>
        </div>
        <div class="flex flex-col items-end gap-2 text-xs text-muted-foreground">
          <Badge :variant="statusVariant(task.status)">
            {{ statusLabel(task.status) }}
          </Badge>
          <span v-if="task.dueDate">Due {{ task.dueDate }}</span>
          <span v-if="task.assignee">@{{ task.assignee }}</span>
        </div>
      </div>
      <div
        v-if="props.showProgress && typeof task.progress === 'number'"
        class="mt-3"
      >
        <Progress :model-value="Math.min(Math.max(task.progress, 0), 100)" />
      </div>
      <div
        v-if="task.tags?.length"
        class="mt-3 flex flex-wrap gap-2"
      >
        <Badge
          v-for="tag in task.tags"
          :key="tag"
          variant="outline"
        >
          {{ tag }}
        </Badge>
      </div>
      <slot :task="task" />
    </div>
  </div>
</template>
