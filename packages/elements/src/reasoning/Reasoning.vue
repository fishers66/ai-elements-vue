<script setup lang="ts">
import type { ReasoningStep } from './types'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

interface Props {
  title?: string
  description?: string
  content?: string
  steps?: ReasoningStep[]
  thinking?: boolean
  duration?: string
  meta?: string
  collapsible?: boolean
  defaultOpen?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Reasoning',
  thinking: false,
  collapsible: false,
  defaultOpen: true,
})

const hasSteps = computed(() => (props.steps?.length ?? 0) > 0)
const stepCount = computed(() => props.steps?.length ?? 0)
const hasContent = computed(
  () => Boolean(props.description || props.content || hasSteps.value),
)

const rootClasses = computed(() =>
  cn(
    'rounded-2xl border border-border/70 bg-card/80 text-sm text-muted-foreground shadow-sm backdrop-blur',
    props.class,
  ),
)

const headerClasses = computed(() =>
  cn('flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between'),
)

const metaClasses = computed(() =>
  cn(
    'group/trigger flex items-center gap-2 text-xs text-muted-foreground transition',
    props.collapsible ? 'cursor-pointer select-none hover:text-foreground' : '',
  ),
)

const thinkingClasses = computed(() =>
  cn(
    'inline-flex items-center gap-2 rounded-full border border-dashed border-primary/60 bg-primary/10 px-3 py-1 text-xs font-medium text-primary',
  ),
)

const contentClasses = computed(() => cn('border-t border-border/60 px-5 py-4'))

const open = ref(props.defaultOpen)

watch(
  () => props.defaultOpen,
  (value) => {
    open.value = value
  },
)
</script>

<template>
  <Collapsible
    v-if="props.collapsible && hasContent"
    v-model:open="open"
    :class="rootClasses"
  >
    <div :class="headerClasses">
      <div class="space-y-2">
        <p class="text-sm font-semibold text-foreground">
          {{ props.title }}
        </p>
        <CollapsibleTrigger
          v-if="props.collapsible && hasContent"
          as-child
        >
          <button type="button" :class="metaClasses">
            <span v-if="props.meta">{{ props.meta }}</span>
            <span v-if="props.meta && props.duration" aria-hidden="true">•</span>
            <span v-if="props.duration">Thought for {{ props.duration }}</span>
            <ChevronDown
              class="size-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
            />
          </button>
        </CollapsibleTrigger>
        <p
          v-else-if="props.meta || props.duration"
          class="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground"
        >
          <span v-if="props.meta">{{ props.meta }}</span>
          <span v-if="props.meta && props.duration" aria-hidden="true">•</span>
          <span v-if="props.duration">Thought for {{ props.duration }}</span>
        </p>
      </div>
      <div
        v-if="props.thinking"
        :class="thinkingClasses"
      >
        <span class="relative flex size-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
          <span class="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        Thinking
      </div>
    </div>
    <CollapsibleContent
      v-if="hasContent || $slots.default"
      :class="contentClasses"
    >
      <p
        v-if="props.description"
        class="text-sm leading-relaxed text-foreground/80"
      >
        {{ props.description }}
      </p>
      <p
        v-else-if="props.content"
        class="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80"
      >
        {{ props.content }}
      </p>
      <ol
        v-else-if="hasSteps"
        class="space-y-4"
      >
        <li
          v-for="(step, index) in props.steps"
          :key="step.id ?? index"
          class="relative flex gap-3 pl-5"
        >
          <span
            class="absolute left-0 top-1 flex h-full flex-col items-center"
          >
            <span class="mt-0.5 block size-2 rounded-full bg-primary" />
            <span
              v-if="index < stepCount - 1"
              aria-hidden="true"
              class="mt-1 h-full w-px bg-border"
            />
          </span>
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
    </CollapsibleContent>
  </Collapsible>
  <div
    v-else
    :class="rootClasses"
  >
    <div :class="headerClasses">
      <div class="space-y-2">
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
        :class="thinkingClasses"
      >
        <span class="relative flex size-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
          <span class="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        Thinking
      </div>
    </div>
    <div
      v-if="hasContent || $slots.default"
      :class="contentClasses"
    >
      <p
        v-if="props.description"
        class="text-sm leading-relaxed text-foreground/80"
      >
        {{ props.description }}
      </p>
      <p
        v-else-if="props.content"
        class="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80"
      >
        {{ props.content }}
      </p>
      <ol
        v-else-if="hasSteps"
        class="space-y-4"
      >
        <li
          v-for="(step, index) in props.steps"
          :key="step.id ?? index"
          class="relative flex gap-3 pl-5"
        >
          <span
            class="absolute left-0 top-1 flex h-full flex-col items-center"
          >
            <span class="mt-0.5 block size-2 rounded-full bg-primary" />
            <span
              v-if="index < stepCount - 1"
              aria-hidden="true"
              class="mt-1 h-full w-px bg-border"
            />
          </span>
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
  </div>
</template>
