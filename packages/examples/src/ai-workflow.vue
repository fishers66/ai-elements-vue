<script setup lang="ts">
import type { ReasoningStep, SuggestionItem, TaskItem } from '@repo/elements'
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,

  Reasoning,
  ReasoningContent,

  ReasoningTrigger,
  Response,
  Task,
  TaskContent,
  TaskItem as TaskItemComponent,
  TaskTrigger,
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,

} from '@repo/elements'
import { Conversation } from '@repo/elements/conversation'
import { Message, MessageAvatar, MessageContent } from '@repo/elements/message'
import { Suggestions } from '@repo/elements/suggestion'
import { CheckCircle, Clock, Search } from 'lucide-vue-next'
import { ref } from 'vue'

const chain = [
  {
    icon: CheckCircle,
    label: 'Gather context',
    description: 'Review previous conversation turns and user goal.',
    status: 'complete' as const,
  },
  {
    icon: Search,
    label: 'Search documentation',
    description: 'Query API reference for itinerary endpoints.',
    status: 'complete' as const,
  },
  {
    icon: Clock,
    label: 'Draft itinerary',
    description: 'Assemble 3-day schedule with food and activities.',
    status: 'active' as const,
  },
]

const _reasoningSteps: ReasoningStep[] = [
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
          <Reasoning :is-streaming="true" :duration="4" default-open>
            <ReasoningTrigger />
            <ReasoningContent>
              Let me think about this problem step by step.

              I need to plan a comprehensive 3-day itinerary for Kyoto that includes:
              - Temple visits and cultural sites
              - Vegetarian dining options
              - Indoor activities as rainy day alternatives
              - Transportation between locations

              The trip is scheduled for mid-May, which has pleasant spring weather but occasional rain.
            </ReasoningContent>
          </Reasoning>

          <ChainOfThought default-open>
            <ChainOfThoughtHeader>
              Travel Planning Process
            </ChainOfThoughtHeader>

            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                v-for="(step, index) in chain"
                :key="`${step.label}-${index}`"
                :icon="step.icon"
                :label="step.label"
                :description="step.description"
                :status="step.status"
              />
            </ChainOfThoughtContent>
          </ChainOfThought>
          <Tool default-open>
            <ToolHeader
              type="weather.lookup"
              state="output-available"
            />
            <ToolContent>
              <ToolInput :input="{ city: 'Kyoto', start: '2025-05-12', end: '2025-05-14' }" />
              <ToolOutput
                :output="{
                  summary: 'Light rain on day 2, otherwise clear.',
                  highsCelsius: [22, 20, 23],
                }"
              />
            </ToolContent>
          </Tool>
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
              </TaskContent>
            </Task>
          </div>
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
