<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ArtifactHeaderProps {
  class?: string
}

defineProps<ArtifactHeaderProps>()
</script>

<template>
  <div
    :class="cn(
      'flex items-center justify-between border-b bg-muted/50 px-4 py-3',
      $props.class,
    )"
  >
    <slot />
  </div>
</template>
