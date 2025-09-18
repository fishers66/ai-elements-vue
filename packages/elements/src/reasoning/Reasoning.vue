<script setup lang="ts">
import type { ReasoningStep } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface Props {
  title?: string
  description?: string
  content?: string
  steps?: ReasoningStep[]
  thinking?: boolean
  duration?: string
  meta?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Reasoning',
  thinking: false,
})

const hasSteps = computed(() => (props.steps?.length ?? 0) > 0)
const stepCount = computed(() => props.steps?.length ?? 0)
const classes = computed(() =>
  cn(
    'rounded-2xl border border-border/70 bg-card/80 p-5 text-sm text-muted-foreground shadow-sm backdrop-blur',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div class="space-y-1">
        <p class="text-sm font-semibold text-foreground">
          {{ props.title }}
        </p>
        <p
          v-if="props.meta || props.duration"
          class="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground"
        >
          <span v-if="props.meta">{{ props.meta }}</span>
          <span v-if="props.meta && props.duration" aria-hidden="true">•</span>
          <span v-if="props.duration">Thought for {{ props.duration }}</span>
        </p>
      </div>
      <div
        v-if="props.thinking"
        class="inline-flex items-center gap-2 rounded-full border border-dashed border-primary/60 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
      >
        <span class="relative flex size-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
          <span class="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        Thinking
      </div>
    </div>
    <p
      v-if="props.description"
      class="mt-3 text-sm leading-relaxed text-foreground/80"
    >
      {{ props.description }}
    </p>
    <p
      v-else-if="props.content"
      class="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80"
    >
      {{ props.content }}
    </p>
    <ol
      v-else-if="hasSteps"
      class="mt-4 space-y-4"
    >
      <li
        v-for="(step, index) in props.steps"
        :key="step.id ?? index"
        class="flex gap-3"
      >
        <div class="relative flex h-full justify-center">
          <span class="mt-1 block size-2 flex-shrink-0 rounded-full bg-primary" />
          <span
            v-if="index < stepCount - 1"
            aria-hidden="true"
            class="absolute left-1/2 top-3 bottom-0 w-px -translate-x-1/2 bg-border"
          />
        </div>
        <div class="space-y-1">
          <p class="text-sm leading-6 text-foreground">
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
    </ol>
    <slot v-else />
  </div>
</template>
