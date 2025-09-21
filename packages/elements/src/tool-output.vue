<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import CodeBlock from './code-block.vue'

interface ToolOutputProps {
  output?: any
  errorText?: string
  class?: string
}

const props = defineProps<ToolOutputProps>()

const hasContent = computed(() => !!(props.output || props.errorText))

const formattedOutput = computed(() => {
  if (typeof props.output === 'object') {
    return JSON.stringify(props.output, null, 2)
  }
  else if (typeof props.output === 'string') {
    return props.output
  }
  return String(props.output)
})
</script>

<template>
  <div v-if="hasContent" :class="cn('space-y-2 p-4', $props.class)">
    <h4 class="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      {{ $props.errorText ? 'Error' : 'Result' }}
    </h4>
    <div
      :class="cn(
        'overflow-x-auto rounded-md text-xs [&_table]:w-full',
        $props.errorText
          ? 'bg-destructive/10 text-destructive'
          : 'bg-muted/50 text-foreground',
      )"
    >
      <div v-if="$props.errorText">
        {{ $props.errorText }}
      </div>
      <CodeBlock v-else :code="formattedOutput" language="json" />
    </div>
  </div>
</template>
