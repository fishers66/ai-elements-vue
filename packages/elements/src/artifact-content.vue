<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ArtifactContentProps {
  class?: string
}

defineProps<ArtifactContentProps>()
</script>

<template>
  <div :class="cn('flex-1 overflow-auto p-4', $props.class)">
    <slot />
  </div>
</template>
