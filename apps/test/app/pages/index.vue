<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@repo/shadcn-vue/components/ui/card'
import AIWorkflow from '~/examples/ai-workflow.vue'
import ChainOfThought from '~/examples/chain-of-thought.vue'
import Conversation from '~/examples/conversation.vue'
import MessageMarkdown from '~/examples/message-markdown.vue'
import Message from '~/examples/message.vue'
import PromptInput from '~/examples/prompt-input.vue'
import Reasoning from '~/examples/reasoning.vue'
import Response from '~/examples/response.vue'
import Suggestion from '~/examples/suggestion.vue'
import Task from '~/examples/task.vue'
import TimelineReasoning from '~/examples/timeline-reasoning.vue'
import Tool from '~/examples/tool.vue'

const components = [
  { name: 'AIWorkflow', Component: AIWorkflow },
  { name: 'ChainOfThought', Component: ChainOfThought },
  { name: 'Message', Component: Message },
  { name: 'PromptInput', Component: PromptInput },
  { name: 'Conversation', Component: Conversation },
  { name: 'Response', Component: Response },
  { name: 'MessageMarkdown', Component: MessageMarkdown },
  { name: 'Reasoning', Component: Reasoning },
  { name: 'Suggestions', Component: Suggestion },
  { name: 'TaskList', Component: Task },
  { name: 'Timeline Reasoning', Component: TimelineReasoning },
  { name: 'ToolCall', Component: Tool },
]
</script>

<template>
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-16">
    <Card v-for="item in components" :key="item.name">
      <CardHeader>
        <CardTitle class="text-lg">
          {{ item.name }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <component :is="item.Component" />
      </CardContent>
    </Card>
  </div>
</template>
