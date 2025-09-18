<script setup lang="ts">
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Brain, ChevronDown } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { ReasoningContextKey } from './reasoning-context'

interface ReasoningTriggerProps {
  class?: string
}

defineProps<ReasoningTriggerProps>()

const context = inject(ReasoningContextKey)
if (!context) {
  throw new Error('ReasoningTrigger must be used within Reasoning')
}

function getThinkingMessage(isStreaming: boolean, duration?: number) {
  if (isStreaming || duration === 0) {
    return 'Thinking...'
  }
  if (duration === undefined) {
    return 'Thought for a few seconds'
  }
  return `Thought for ${duration} seconds`
}

const thinkingMessage = computed(() => getThinkingMessage(context.isStreaming, context.duration))
const chevronClass = computed(() => cn(
  'size-4 transition-transform',
  context.isOpen ? 'rotate-180' : 'rotate-0',
))
</script>

<template>
  <CollapsibleTrigger
    :class="cn(
      'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
      $props.class,
    )"
  >
    <slot>
      <Brain class="size-4" />
      <p>{{ thinkingMessage }}</p>
      <ChevronDown :class="chevronClass" />
    </slot>
  </CollapsibleTrigger>
</template>
