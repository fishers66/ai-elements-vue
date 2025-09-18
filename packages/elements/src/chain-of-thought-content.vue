<script setup lang="ts">
import { Collapsible, CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { inject } from 'vue'
import { ChainOfThoughtContextKey } from './chain-of-thought-context'

interface ChainOfThoughtContentProps {
  class?: string
}

defineProps<ChainOfThoughtContentProps>()

const context = inject(ChainOfThoughtContextKey)
if (!context) {
  throw new Error('ChainOfThoughtContent must be used within ChainOfThought')
}
</script>

<template>
  <Collapsible :open="context.isOpen">
    <CollapsibleContent
      :class="cn(
        'mt-2 space-y-3',
        'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        $props.class,
      )"
    >
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
