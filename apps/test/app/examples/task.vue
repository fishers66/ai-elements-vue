<script setup lang="ts">
import type { TaskItem } from '@repo/elements/task'
import { TaskList } from '@repo/elements/task'

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
  <TaskList :tasks="tasks" />
</template>
