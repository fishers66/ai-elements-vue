<script setup lang="ts">
import type { SuggestionItem } from './types'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CornerDownLeft } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  suggestion: SuggestionItem
  active?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const emit = defineEmits<{
  (e: 'select', suggestion: SuggestionItem): void
}>()

const classes = computed(() =>
  cn(
    'w-full justify-start px-3 py-2 text-left text-sm',
    props.active ? 'border border-primary bg-primary/10' : 'border border-transparent hover:border-border',
    props.class,
  ),
)
</script>

<template>
  <Button
    variant="ghost"
    :disabled="props.suggestion.disabled"
    :class="classes"
    @click="emit('select', props.suggestion)"
  >
    <div class="flex w-full items-center gap-3">
      <component
        :is="props.suggestion.icon"
        v-if="props.suggestion.icon"
        class="size-4 text-muted-foreground"
      />
      <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between gap-2">
          <span class="font-medium text-foreground">
            {{ props.suggestion.label }}
          </span>
          <kbd
            v-if="props.suggestion.shortcut"
            class="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
          >
            {{ props.suggestion.shortcut }}
          </kbd>
        </div>
        <p
          v-if="props.suggestion.description"
          class="text-xs text-muted-foreground"
        >
          {{ props.suggestion.description }}
        </p>
      </div>
      <CornerDownLeft class="size-4 text-muted-foreground" />
    </div>
  </Button>
</template>
