<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ActionsProps {
  class?: string
}

defineProps<ActionsProps>()
</script>

<template>
  <div :class="cn('flex items-center gap-1', $props.class)">
    <slot />
  </div>
</template>
