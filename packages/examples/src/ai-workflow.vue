<script setup lang="ts">
import type { ChainOfThoughtStep } from '@repo/elements/chain-of-thought'
import type { ReasoningStep } from '@repo/elements/reasoning'
import type { SuggestionItem } from '@repo/elements/suggestion'
import type { TaskItem } from '@repo/elements/task'
import { ChainOfThought } from '@repo/elements/chain-of-thought'
import { Conversation } from '@repo/elements/conversation'
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'
import { Reasoning } from '@repo/elements/reasoning'
import { Response } from '@repo/elements/response'
import { Suggestions } from '@repo/elements/suggestion'
import { TaskList } from '@repo/elements/task'
import { ToolCall } from '@repo/elements/tool'
import { ref } from 'vue'

const chain: ChainOfThoughtStep[] = [
  {
    label: 'Understand the request',
    content: 'Parse the user goal and identify constraints for the travel plan.',
    status: 'complete',
  },
  {
    label: 'Check destination weather',
    content: 'Call the weather API for Kyoto for the requested dates.',
    status: 'complete',
    meta: 'Tool: weather.lookup',
  },
  {
    label: 'Generate itinerary',
    content: 'Produce a balanced schedule with culture, food, and rest.',
    status: 'thinking',
  },
]

const reasoningSteps: ReasoningStep[] = [
  {
    content: 'User wants a 3-day Kyoto trip with focus on temples and vegetarian food.',
  },
  {
    content: 'Weather forecast shows light rain on day 2, include indoor alternatives.',
  },
  {
    content: 'Balance morning cultural activities with afternoon workshops and evening dining.',
  },
]

const suggestions = ref<SuggestionItem[]>([
  {
    id: 'refine-budget',
    label: 'Add budget constraints',
    description: 'Include nightly hotel budget and meal preferences.',
  },
  {
    id: 'export-calendar',
    label: 'Export to calendar',
    description: 'Create calendar events for each itinerary item.',
  },
  {
    id: 'book-tickets',
    label: 'Find train tickets',
    description: 'Search for shinkansen tickets from Tokyo to Kyoto.',
  },
])

const tasks = ref<TaskItem[]>([
  {
    id: 'overview',
    title: 'Summarize itinerary',
    description: 'Create a concise daily breakdown for the user.',
    status: 'done',
    progress: 100,
    assignee: 'assistant',
    dueDate: 'Today',
  },
  {
    id: 'weather',
    title: 'Verify weather data',
    description: 'Ensure the rainy day plan includes covered activities.',
    status: 'in-progress',
    progress: 60,
    tags: ['weather', 'validation'],
    tools: [
      {
        id: 'weather.lookup',
        name: 'weather.lookup',
        description: 'Fetches 7-day weather outlook',
        status: 'success',
        latency: '612 ms',
        request: { city: 'Kyoto', start: '2025-05-12', end: '2025-05-14' },
        response: {
          summary: 'Light rain on day 2, otherwise clear.',
          highsCelsius: [22, 20, 23],
        },
      },
    ],
  },
  {
    id: 'restaurants',
    title: 'Compile vegetarian restaurants',
    description: 'List top vegetarian-friendly kaiseki experiences.',
    status: 'todo',
    tags: ['food'],
  },
])

const selectedSuggestion = ref<string | null>(null)

function handleSelect(item: SuggestionItem) {
  selectedSuggestion.value = item.label
}
</script>

<template>
  <Conversation class="max-h-[640px] rounded-2xl border bg-background p-4">
    <Message from="user">
      <MessageContent>
        I want a 3-day trip plan for Kyoto next month that mixes temples, local workshops, and vegetarian-friendly food. Please
        make sure the days are balanced and account for weather if possible.
      </MessageContent>
      <MessageAvatar src="https://github.com/haydenbleasel.png" name="Hayden" />
    </Message>
    <Message from="assistant">
      <MessageContent>
        <div class="space-y-4">
          <Response>
            Here is a tailored Kyoto itinerary for your three-day stay, including cultural highlights, hands-on activities, and
            vegetarian dining options.
          </Response>
          <Reasoning
            :steps="reasoningSteps"
            thinking
            duration="4 seconds"
            description="Let me think about this problem step by step."
            meta="Travel planner · GPT-4.1 mini"
            collapsible
          />
          <ChainOfThought :steps="chain" :default-open="true" />
          <ToolCall
            name="weather.lookup"
            description="Fetches 7-day weather outlook"
            status="success"
            latency="612 ms"
            :request="{ city: 'Kyoto', start: '2025-05-12', end: '2025-05-14' }"
            :response="{
              summary: 'Light rain on day 2, otherwise clear.',
              highsCelsius: [22, 20, 23],
            }"
          />
          <TaskList :tasks="tasks" />
          <div class="space-y-2">
            <p class="text-sm font-medium text-foreground">
              Quick actions
            </p>
            <Suggestions :suggestions="suggestions" :columns="2" @select="handleSelect" />
            <p
              v-if="selectedSuggestion"
              class="text-xs text-muted-foreground"
            >
              Selected: {{ selectedSuggestion }}
            </p>
          </div>
        </div>
      </MessageContent>
      <MessageAvatar src="https://github.com/openai.png" name="Copilot" />
    </Message>
  </Conversation>
</template>
