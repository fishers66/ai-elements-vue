<script setup lang="ts">
import type { ChainOfThoughtStep } from '@repo/elements/chain-of-thought'
import { ChainOfThought } from '@repo/elements/chain-of-thought'

const steps: ChainOfThoughtStep[] = [
  {
    label: 'Gather context',
    content: 'Review previous conversation turns and user goal.',
    status: 'complete',
  },
  {
    label: 'Search documentation',
    content: 'Query API reference for itinerary endpoints.',
    status: 'complete',
    meta: 'Tool: docs.search',
  },
  {
    label: 'Draft itinerary',
    content: 'Assemble 3-day schedule with food and activities.',
    status: 'thinking',
  },
]
</script>

<template>
  <ChainOfThought :steps="steps" :default-open="true" />
</template>
