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
  cn('rounded-xl border bg-card text-card-foreground shadow-sm', props.class),
)

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
    <div class="flex items-center justify-between gap-2 px-4 py-3">
      <div class="flex items-center gap-2 text-sm font-medium">
        {{ props.title }}
      </div>
      <div class="flex items-center gap-2">
        <Badge
          v-if="props.steps.length"
          variant="outline"
          class="text-xs"
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
      <ol class="space-y-3 border-t px-4 py-3 text-sm">
        <li
          v-for="(step, index) in props.steps"
          :key="step.id ?? index"
          class="flex gap-3 rounded-lg border bg-muted/40 p-3"
        >
          <component
            :is="statusIcon(step)"
            class="mt-1 size-4 flex-shrink-0 text-muted-foreground"
            :class="{
              'animate-spin': !step.icon && step.status !== 'complete' && step.status !== 'failed',
            }"
          />
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span class="font-medium">
                {{ step.label }}
              </span>
              <Badge
                v-if="step.status"
                size="sm"
                :variant="statusVariant(step.status)"
                class="text-[10px]"
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
    <div class="flex items-center justify-between gap-2 px-4 py-3">
      <div class="text-sm font-medium">
        {{ props.title }}
      </div>
      <Badge
        v-if="props.steps.length"
        variant="outline"
        class="text-xs"
      >
        {{ props.steps.length }} steps
      </Badge>
    </div>
    <ol class="space-y-3 border-t px-4 py-3 text-sm">
      <li
        v-for="(step, index) in props.steps"
        :key="step.id ?? index"
        class="flex gap-3 rounded-lg border bg-muted/40 p-3"
      >
        <component
          :is="statusIcon(step)"
          class="mt-1 size-4 flex-shrink-0 text-muted-foreground"
          :class="{
            'animate-spin': !step.icon && step.status !== 'complete' && step.status !== 'failed',
          }"
        />
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span class="font-medium">
              {{ step.label }}
            </span>
            <Badge
              v-if="step.status"
              size="sm"
              :variant="statusVariant(step.status)"
              class="text-[10px]"
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
