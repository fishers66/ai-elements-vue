<script setup lang="ts">
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ChainOfThoughtSearchResultProps {
  class?: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const props = withDefaults(defineProps<ChainOfThoughtSearchResultProps>(), {
  variant: 'secondary',
})
</script>

<template>
  <Badge
    :class="cn('gap-1 px-2 py-0.5 font-normal text-xs', props.class)"
    :variant="props.variant"
  >
    <slot />
  </Badge>
</template>
