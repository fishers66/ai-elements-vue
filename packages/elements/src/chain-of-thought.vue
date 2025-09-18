<script setup lang="ts">
import type { ChainOfThoughtContextValue } from './chain-of-thought-context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide, ref, watch } from 'vue'
import { ChainOfThoughtContextKey } from './chain-of-thought-context'

interface ChainOfThoughtProps {
  open?: boolean
  defaultOpen?: boolean
  class?: string
}

const props = withDefaults(defineProps<ChainOfThoughtProps>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = ref(props.defaultOpen)

// Controllable state for open
watch(() => props.open, (newOpen) => {
  if (newOpen !== undefined) {
    isOpen.value = newOpen
  }
}, { immediate: true })

watch(isOpen, (newOpen) => {
  emit('update:open', newOpen)
})

function setIsOpen(open: boolean) {
  isOpen.value = open
}

const contextValue = computed<ChainOfThoughtContextValue>(() => ({
  isOpen: isOpen.value,
  setIsOpen,
}))

provide(ChainOfThoughtContextKey, contextValue.value)
</script>

<template>
  <div :class="cn('not-prose max-w-prose space-y-4', props.class)">
    <slot />
  </div>
</template>
