<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StreamMarkdown } from 'streamdown-vue'
import { computed, useAttrs, useSlots } from 'vue'
import 'katex/dist/katex.min.css'

interface Props {
  content?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()
const slots = useSlots()

const classes = computed(() =>
  cn(
    'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
    attrs.class || '',
  ),
)

const hasNonTextSlotContent = computed(() => {
  const nodes = slots.default?.() || []
  return nodes.some(node =>
    node.type !== 'text'
    && node.type !== Symbol.for('v-txt')
    && typeof node.children !== 'string',
  )
})

const slotContent = computed<string | undefined>(() => {
  const nodes = slots.default?.() || []
  let text = ''
  for (const node of nodes) {
    if (typeof node.children === 'string')
      text += node.children
  }
  return text || undefined
})

const md = computed(() => (slotContent.value ?? props.content ?? '') as string)
</script>

<template>
  <div v-if="hasNonTextSlotContent" :class="classes">
    <slot />
  </div>
  <StreamMarkdown v-else :class="classes" :content="md" />
</template>
