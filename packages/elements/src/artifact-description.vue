<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ArtifactDescriptionProps {
  class?: string
}

defineProps<ArtifactDescriptionProps>()
</script>

<template>
  <p :class="cn('text-muted-foreground text-sm', $props.class)">
    <slot />
  </p>
</template>
