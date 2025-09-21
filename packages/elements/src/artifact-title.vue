<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ArtifactTitleProps {
  class?: string
}

defineProps<ArtifactTitleProps>()
</script>

<template>
  <p
    :class="cn('font-medium text-foreground text-sm', $props.class)"
  >
    <slot />
  </p>
</template>
