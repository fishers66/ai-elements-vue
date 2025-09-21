<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ChainOfThoughtImageProps {
  caption?: string
  class?: string
}

defineProps<ChainOfThoughtImageProps>()
</script>

<template>
  <div :class="cn('mt-2 space-y-2', $props.class)">
    <div class="relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-lg bg-muted p-3">
      <slot />
    </div>
    <p v-if="$props.caption" class="text-muted-foreground text-xs">
      {{ $props.caption }}
    </p>
  </div>
</template>
