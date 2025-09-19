<script setup lang="ts">
import type { ChainOfThoughtContextValue } from './chain-of-thought-context'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
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
  setIsOpen: (newOpen: boolean) => {
    isOpen.value = newOpen
  },
}))

provide(ChainOfThoughtContextKey, contextValue)
</script>

<template>
  <Collapsible
    :class="cn('not-prose max-w-prose space-y-4', props.class)"
    :open="isOpen"
    @update:open="setIsOpen"
  >
    <slot />
  </Collapsible>
</template>
