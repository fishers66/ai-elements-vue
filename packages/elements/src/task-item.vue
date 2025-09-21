<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskItemProps {
  class?: string
}

defineProps<TaskItemProps>()
</script>

<template>
  <div :class="cn('text-muted-foreground text-sm', $props.class)">
    <slot />
  </div>
</template>
