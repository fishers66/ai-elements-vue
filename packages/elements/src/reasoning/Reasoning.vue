<script setup lang="ts">
import type { ReasoningStep } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface Props {
  title?: string
  content?: string
  steps?: ReasoningStep[]
  thinking?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Reasoning',
  thinking: false,
})

const hasSteps = computed(() => (props.steps?.length ?? 0) > 0)
const classes = computed(() =>
  cn(
    'rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground shadow-sm',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <div class="flex items-center justify-between gap-2 text-sm font-medium text-foreground">
      <span>{{ props.title }}</span>
      <div
        v-if="props.thinking"
        class="flex items-center gap-2 text-xs font-normal text-muted-foreground"
      >
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        Thinking
      </div>
    </div>
    <p v-if="props.content" class="mt-2 whitespace-pre-wrap">
      {{ props.content }}
    </p>
    <ul v-else-if="hasSteps" class="mt-2 space-y-2">
      <li
        v-for="(step, index) in props.steps"
        :key="step.id ?? index"
        class="flex gap-2"
      >
        <span class="mt-1 size-1.5 flex-shrink-0 rounded-full bg-primary/70" />
        <div class="space-y-1">
          <p class="leading-relaxed">
            {{ step.content }}
          </p>
          <p
            v-if="step.hint"
            class="text-xs text-muted-foreground"
          >
            {{ step.hint }}
          </p>
        </div>
      </li>
    </ul>
    <slot v-else />
  </div>
</template>
