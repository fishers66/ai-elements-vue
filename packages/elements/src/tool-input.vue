<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import CodeBlock from './code-block.vue'

interface ToolInputProps {
  input: any
  class?: string
}

defineProps<ToolInputProps>()
</script>

<template>
  <div :class="cn('space-y-2 overflow-hidden p-4', $props.class)">
    <h4 class="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Parameters
    </h4>
    <div class="rounded-md bg-muted/50">
      <CodeBlock :code="JSON.stringify($props.input, null, 2)" language="json" />
    </div>
  </div>
</template>
