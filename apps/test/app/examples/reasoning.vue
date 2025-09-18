<script setup lang="ts">
import type { ReasoningStep } from '@repo/elements/reasoning'
import { Reasoning } from '@repo/elements/reasoning'

const steps: ReasoningStep[] = [
  {
    content: 'User is planning a 3-day trip to Kyoto in mid-May.',
  },
  {
    content: 'Prioritize temple visits and vegetarian dining options.',
  },
  {
    content: 'Ensure rainy day alternatives are available for indoor activities.',
    hint: 'Consider tea ceremonies or cooking classes.',
  },
]
</script>

<template>
  <div class="space-y-6">
    <Reasoning
      title="Reasoning"
      description="Let me think about this problem step by step."
      duration="4 seconds"
      meta="Travel planner · GPT-4.1 mini"
      thinking
    />
    <Reasoning
      title="Thought"
      :steps="steps"
      duration="4 seconds"
      collapsible
    />
  </div>
</template>
