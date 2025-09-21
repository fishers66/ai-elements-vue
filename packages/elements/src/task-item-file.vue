<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskItemFileProps {
  class?: string
}

defineProps<TaskItemFileProps>()
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center gap-1 rounded-md border bg-secondary px-1.5 py-0.5 text-foreground text-xs',
      $props.class,
    )"
  >
    <slot />
  </div>
</template>
