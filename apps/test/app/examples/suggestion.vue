<script setup lang="ts">
import type { SuggestionItem } from '@repo/elements/suggestion'
import { Suggestions } from '@repo/elements/suggestion'
import { ref } from 'vue'

const suggestions = ref<SuggestionItem[]>([
  {
    id: 'budget',
    label: 'Ask about budget',
    description: 'Capture nightly hotel range and meal preferences.',
  },
  {
    id: 'calendar',
    label: 'Export to calendar',
    description: 'Create events for every itinerary stop.',
  },
  {
    id: 'tickets',
    label: 'Find train tickets',
    description: 'Search for shinkansen availability from Tokyo.',
  },
])

const selected = ref<string>()

function handleSelect(item: SuggestionItem) {
  selected.value = item.label
}
</script>

<template>
  <div class="space-y-2 text-sm">
    <Suggestions :suggestions="suggestions" :columns="2" @select="handleSelect" />
    <p v-if="selected" class="text-xs text-muted-foreground">
      Selected: {{ selected }}
    </p>
  </div>
</template>
