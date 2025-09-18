<script setup lang="ts">
import type { SuggestionItem } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import Suggestion from './Suggestion.vue'

interface Props {
  suggestions: SuggestionItem[]
  class?: string
  columns?: 1 | 2 | 3
  activeId?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 1,
})

const emit = defineEmits<{
  (e: 'select', suggestion: SuggestionItem): void
}>()

const gridClass = computed(() => {
  switch (props.columns) {
    case 2:
      return 'sm:grid-cols-2'
    case 3:
      return 'sm:grid-cols-3'
    default:
      return 'grid-cols-1'
  }
})

const classes = computed(() => cn('grid gap-2', gridClass.value, props.class))
</script>

<template>
  <div :class="classes">
    <Suggestion
      v-for="suggestion in props.suggestions"
      :key="suggestion.id ?? suggestion.label"
      :suggestion="suggestion"
      :active="props.activeId === (suggestion.id ?? suggestion.label)"
      @select="emit('select', $event)"
    />
  </div>
</template>
