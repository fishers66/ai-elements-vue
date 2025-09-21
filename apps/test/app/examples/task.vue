<script setup lang="ts">
import type { TaskItem } from '@repo/elements/task'
import { Task, TaskContent, TaskItem as TaskItemComponent, TaskTrigger } from '@repo/elements'

const tasks: TaskItem[] = [
  {
    id: 'summary',
    title: 'Summarize itinerary',
    description: 'Prepare day-by-day overview.',
    status: 'done',
    progress: 100,
  },
  {
    id: 'weather',
    title: 'Check weather API',
    description: 'Verify rain coverage for outdoor plans.',
    status: 'in-progress',
    progress: 60,
    tags: ['weather', 'validation'],
    assignee: 'assistant',
    dueDate: 'Today',
    tools: [
      {
        id: 'weather.lookup',
        name: 'weather.lookup',
        description: 'Fetches 7-day weather outlook',
        status: 'running',
        latency: '3.4 s',
        request: { city: 'Kyoto', date: '2025-05-13' },
        response: null,
      },
    ],
  },
  {
    id: 'dining',
    title: 'List vegetarian restaurants',
    description: 'Compile Kyoto spots near accommodations.',
    status: 'todo',
    tags: ['food'],
  },
]
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">
      Task Examples
    </h2>
    <div class="space-y-2">
      <Task v-for="task in tasks" :key="task.id" default-open>
        <TaskTrigger :title="task.title" />
        <TaskContent>
          <TaskItemComponent>{{ task.description }}</TaskItemComponent>
          <TaskItemComponent v-if="task.status">
            Status: {{ task.status }}
          </TaskItemComponent>
          <TaskItemComponent v-if="task.progress">
            Progress: {{ task.progress }}%
          </TaskItemComponent>
          <TaskItemComponent v-if="task.tags?.length">
            Tags: {{ task.tags.join(', ') }}
          </TaskItemComponent>
          <TaskItemComponent v-if="task.assignee">
            Assignee: {{ task.assignee }}
          </TaskItemComponent>
          <TaskItemComponent v-if="task.dueDate">
            Due: {{ task.dueDate }}
          </TaskItemComponent>
        </TaskContent>
      </Task>
    </div>
  </div>
</template>
