<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ChainOfThoughtSearchResultsProps {
  class?: string
}

defineProps<ChainOfThoughtSearchResultsProps>()
</script>

<template>
  <div :class="cn('flex items-center gap-2', $props.class)">
    <slot />
  </div>
</template>
