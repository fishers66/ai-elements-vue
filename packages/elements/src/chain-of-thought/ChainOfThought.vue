<script setup lang="ts">
import type { ChainOfThoughtStatus, ChainOfThoughtStep } from './types'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Check, ChevronDown, LoaderCircle, X } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

interface Props {
  steps: ChainOfThoughtStep[]
  defaultOpen?: boolean
  title?: string
  collapsible?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  title: 'Chain of thought',
  collapsible: true,
})

const open = ref(props.defaultOpen)

watch(
  () => props.defaultOpen,
  (value) => {
    open.value = value
  },
)

const rootClasses = computed(() =>
  cn('rounded-2xl border border-border/70 bg-card/80 text-card-foreground shadow-sm backdrop-blur', props.class),
)

const headerClasses = computed(() => 'flex items-center justify-between gap-2 px-5 py-4')

const contentClasses = computed(() => 'border-t border-border/60 px-5 pb-5 pt-4 text-sm text-muted-foreground')

function statusVariant(status?: ChainOfThoughtStatus) {
  switch (status) {
    case 'complete':
      return 'default'
    case 'failed':
      return 'destructive'
    case 'thinking':
    default:
      return 'secondary'
  }
}

function statusLabel(status?: ChainOfThoughtStatus) {
  switch (status) {
    case 'complete':
      return 'Completed'
    case 'failed':
      return 'Failed'
    case 'thinking':
    default:
      return 'Thinking'
  }
}

function indicatorClasses(step: ChainOfThoughtStep) {
  return cn(
    'flex size-6 items-center justify-center rounded-full border border-border/70 bg-background/90 text-muted-foreground transition',
    step.status === 'complete' && 'border-emerald-200 bg-emerald-500/10 text-emerald-600',
    step.status === 'failed' && 'border-destructive/40 bg-destructive/10 text-destructive',
    step.status === 'thinking' && 'border-primary/40 bg-primary/10 text-primary',
  )
}

function statusIcon(step: ChainOfThoughtStep) {
  if (step.icon)
    return step.icon

  switch (step.status) {
    case 'complete':
      return Check
    case 'failed':
      return X
    case 'thinking':
    default:
      return LoaderCircle
  }
}
</script>

<template>
  <Collapsible
    v-if="props.collapsible"
    v-model:open="open"
    :class="rootClasses"
  >
    <div :class="headerClasses">
      <div class="text-sm font-medium">
        {{ props.title }}
      </div>
      <div class="flex items-center gap-2">
        <Badge
          v-if="props.steps.length"
          variant="outline"
          class="rounded-full border-border/70 px-2.5 py-1 text-xs text-muted-foreground"
        >
          {{ props.steps.length }} steps
        </Badge>
        <CollapsibleTrigger as-child>
          <Button variant="ghost" size="icon" class="size-8">
            <ChevronDown
              class="size-4 transition-transform duration-200"
              :class="open ? 'rotate-180' : ''"
            />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
    <CollapsibleContent>
      <ol :class="contentClasses">
        <li
          v-for="(step, index) in props.steps"
          :key="step.id ?? index"
          class="relative flex gap-3 pl-10"
        >
          <div class="absolute left-0 top-1 flex flex-col items-center">
            <div :class="indicatorClasses(step)">
              <component
                :is="statusIcon(step)"
                class="size-3"
                :class="{
                  'animate-spin': !step.icon && step.status !== 'complete' && step.status !== 'failed',
                }"
              />
            </div>
            <span
              v-if="index < props.steps.length - 1"
              aria-hidden="true"
              class="mt-2 h-full w-px bg-border"
            />
          </div>
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span class="font-medium">
                {{ step.label }}
              </span>
              <Badge
                v-if="step.status"
                size="sm"
                :variant="statusVariant(step.status)"
                class="rounded-full border-border/70 px-2 py-0.5 text-[10px]"
              >
                {{ statusLabel(step.status) }}
              </Badge>
              <span
                v-if="step.meta"
                class="text-xs text-muted-foreground"
              >
                {{ step.meta }}
              </span>
            </div>
            <p
              v-if="step.content"
              class="text-sm text-muted-foreground"
            >
              {{ step.content }}
            </p>
            <slot
              name="step"
              :step="step"
            />
          </div>
        </li>
      </ol>
    </CollapsibleContent>
  </Collapsible>
  <div
    v-else
    :class="rootClasses"
  >
    <div :class="headerClasses">
      <div class="text-sm font-medium">
        {{ props.title }}
      </div>
      <Badge
        v-if="props.steps.length"
        variant="outline"
        class="rounded-full border-border/70 px-2.5 py-1 text-xs text-muted-foreground"
      >
        {{ props.steps.length }} steps
      </Badge>
    </div>
    <ol :class="contentClasses">
      <li
        v-for="(step, index) in props.steps"
        :key="step.id ?? index"
        class="relative flex gap-3 pl-10"
      >
        <div class="absolute left-0 top-1 flex flex-col items-center">
          <div :class="indicatorClasses(step)">
            <component
              :is="statusIcon(step)"
              class="size-3"
              :class="{
                'animate-spin': !step.icon && step.status !== 'complete' && step.status !== 'failed',
              }"
            />
          </div>
          <span
            v-if="index < props.steps.length - 1"
            aria-hidden="true"
            class="mt-2 h-full w-px bg-border"
          />
        </div>
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span class="font-medium">
              {{ step.label }}
            </span>
            <Badge
              v-if="step.status"
              size="sm"
              :variant="statusVariant(step.status)"
              class="rounded-full border-border/70 px-2 py-0.5 text-[10px]"
            >
              {{ statusLabel(step.status) }}
            </Badge>
            <span
              v-if="step.meta"
              class="text-xs text-muted-foreground"
            >
              {{ step.meta }}
            </span>
          </div>
          <p
            v-if="step.content"
            class="text-sm text-muted-foreground"
          >
            {{ step.content }}
          </p>
          <slot
            name="step"
            :step="step"
          />
        </div>
      </li>
    </ol>
  </div>
</template>
