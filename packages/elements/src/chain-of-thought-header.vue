<script setup lang="ts">
import { Collapsible, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Brain, ChevronDown } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { ChainOfThoughtContextKey } from './chain-of-thought-context'

interface ChainOfThoughtHeaderProps {
  class?: string
}

defineProps<ChainOfThoughtHeaderProps>()

const context = inject(ChainOfThoughtContextKey)
if (!context) {
  throw new Error('ChainOfThoughtHeader must be used within ChainOfThought')
}

const chevronClass = computed(() => cn(
  'size-4 transition-transform',
  context.isOpen ? 'rotate-180' : 'rotate-0',
))
</script>

<template>
  <Collapsible :open="context.isOpen" @update:open="context.setIsOpen">
    <CollapsibleTrigger
      :class="cn(
        'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
        $props.class,
      )"
    >
      <Brain class="size-4" />
      <span class="flex-1 text-left">
        <slot>Chain of Thought</slot>
      </span>
      <ChevronDown :class="chevronClass" />
    </CollapsibleTrigger>
  </Collapsible>
</template>
