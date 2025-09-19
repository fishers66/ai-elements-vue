<script setup lang="ts">
import type { Component } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Dot } from 'lucide-vue-next'
import { computed } from 'vue'

interface ChainOfThoughtStepProps {
  icon?: Component
  label: string
  description?: string
  status?: 'complete' | 'active' | 'pending'
  class?: string
}

const props = withDefaults(defineProps<ChainOfThoughtStepProps>(), {
  icon: Dot,
  status: 'complete',
})

const statusStyles = {
  complete: 'text-muted-foreground',
  active: 'text-foreground',
  pending: 'text-muted-foreground',
}

const stepClass = computed(() => cn(
  'flex gap-2 text-sm',
  statusStyles[props.status],
  'fade-in-0 slide-in-from-top-2 animate-in',
  props.class,
))
</script>

<template>
  <div :class="stepClass">
    <div class="relative mt-0.5">
      <component :is="props.icon" class="size-4" />
      <div class="-mx-px absolute top-7 bottom-0 left-1/2 w-px bg-border" />
    </div>
    <div class="flex-1 space-y-2">
      <div>{{ props.label }}</div>
      <div v-if="props.description" class="text-muted-foreground text-xs">
        {{ props.description }}
      </div>
      <slot />
    </div>
  </div>
</template>
