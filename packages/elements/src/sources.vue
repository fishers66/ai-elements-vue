<script setup lang="ts">
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface SourcesProps {
  class?: string
}

defineProps<SourcesProps>()
</script>

<template>
  <Collapsible :class="cn('not-prose mb-4 text-primary text-xs', $props.class)">
    <slot />
  </Collapsible>
</template>
