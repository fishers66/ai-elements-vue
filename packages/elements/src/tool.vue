<script setup lang="ts">
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface ToolProps {
  class?: string
}

defineProps<ToolProps>()
</script>

<template>
  <Collapsible
    :class="cn('not-prose mb-4 w-full rounded-md border', $props.class)"
  >
    <slot />
  </Collapsible>
</template>
