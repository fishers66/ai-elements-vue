<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide } from 'vue'

interface CodeBlockProps {
  code: string
  language: string
  showLineNumbers?: boolean
  class?: string
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  showLineNumbers: false,
})

// Provide code to child components
provide('codeBlockCode', props.code)

// Simple syntax highlighting (can be enhanced with a proper highlighter later)
const formattedCode = computed(() => {
  try {
    if (props.language === 'json') {
      return JSON.stringify(JSON.parse(props.code), null, 2)
    }
    return props.code
  }
  catch {
    return props.code
  }
})
</script>

<template>
  <div
    :class="cn(
      'relative w-full overflow-hidden rounded-md border bg-background text-foreground',
      $props.class,
    )"
  >
    <div class="relative">
      <pre class="overflow-auto p-4 font-mono text-sm"><code>{{ formattedCode }}</code></pre>
      <div v-if="$slots.default" class="absolute top-2 right-2 flex items-center gap-2">
        <slot />
      </div>
    </div>
  </div>
</template>
