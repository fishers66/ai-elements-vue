<script setup lang="ts">
import type { ReasoningContextValue } from './reasoning-context'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide, ref, watch } from 'vue'
import { ReasoningContextKey } from './reasoning-context'

interface ReasoningProps {
  isStreaming?: boolean
  open?: boolean
  defaultOpen?: boolean
  duration?: number
  class?: string
}

const props = withDefaults(defineProps<ReasoningProps>(), {
  isStreaming: false,
  defaultOpen: true,
  duration: 0,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const AUTO_CLOSE_DELAY = 1000
const MS_IN_S = 1000

const isOpen = ref(props.defaultOpen)
const duration = ref(props.duration)
const hasAutoClosed = ref(false)
const startTime = ref<number | null>(null)

// Controllable state for open
watch(() => props.open, (newOpen) => {
  if (newOpen !== undefined) {
    isOpen.value = newOpen
  }
}, { immediate: true })

watch(isOpen, (newOpen) => {
  emit('update:open', newOpen)
})

// Track duration when streaming starts and ends
watch(() => props.isStreaming, (streaming) => {
  if (streaming) {
    if (startTime.value === null) {
      startTime.value = Date.now()
    }
  }
  else if (startTime.value !== null) {
    duration.value = Math.ceil((Date.now() - startTime.value) / MS_IN_S)
    startTime.value = null
  }
}, { immediate: true })

// Auto-open when streaming starts, auto-close when streaming ends (once only)
watch([() => props.isStreaming, isOpen, () => props.defaultOpen], ([streaming, open, defaultOpen]) => {
  if (defaultOpen && !streaming && open && !hasAutoClosed.value) {
    setTimeout(() => {
      isOpen.value = false
      hasAutoClosed.value = true
    }, AUTO_CLOSE_DELAY)
  }
})

function handleOpenChange(newOpen: boolean) {
  isOpen.value = newOpen
}

const contextValue = computed<ReasoningContextValue>(() => ({
  isStreaming: props.isStreaming,
  isOpen: isOpen.value,
  setIsOpen: handleOpenChange,
  duration: duration.value,
}))

provide(ReasoningContextKey, contextValue)
</script>

<template>
  <Collapsible
    :class="cn('not-prose mb-4', props.class)"
    :open="isOpen"
    @update:open="handleOpenChange"
  >
    <slot />
  </Collapsible>
</template>
