<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ArtifactProps {
  class?: string
}

defineProps<ArtifactProps>()
</script>

<template>
  <div
    :class="cn(
      'flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm',
      $props.class,
    )"
  >
    <slot />
  </div>
</template>
