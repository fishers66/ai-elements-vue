<script setup lang="ts">
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDown } from 'lucide-vue-next'

interface SourcesTriggerProps {
  count: number
  class?: string
}

defineProps<SourcesTriggerProps>()
</script>

<template>
  <CollapsibleTrigger :class="cn('flex items-center gap-2', $props.class)">
    <slot>
      <p class="font-medium">
        Used {{ $props.count }} sources
      </p>
      <ChevronDown class="h-4 w-4" />
    </slot>
  </CollapsibleTrigger>
</template>
