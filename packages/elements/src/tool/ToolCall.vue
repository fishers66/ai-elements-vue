<script setup lang="ts">
import type { ToolCall, ToolCallStatus } from './types'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Check, ChevronDown, LoaderCircle, X } from 'lucide-vue-next'
import { computed, ref, useSlots, watch } from 'vue'

interface Props extends ToolCall {
  class?: string
  variant?: 'default' | 'inset'
  requestLabel?: string
  responseLabel?: string
  collapsible?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  requestLabel: 'Request',
  responseLabel: 'Response',
  collapsible: true,
  defaultOpen: true,
})

const slots = useSlots()

const iconComponent = computed(() => props.icon ?? statusIcon(props.status))
const animateStatus = computed(
  () => !props.icon && (props.status === 'pending' || props.status === 'running'),
)

const classes = computed(() =>
  cn(
    'group rounded-2xl border border-border/70 bg-card/80 text-card-foreground shadow-sm backdrop-blur transition',
    props.variant === 'inset'
      ? 'rounded-xl border border-border/60 bg-muted/40 text-foreground shadow-none'
      : '',
    props.class,
  ),
)

const headerPadding = computed(() => (props.variant === 'inset' ? 'px-4 py-3' : 'px-5 py-4'))

const headerClasses = computed(() =>
  cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', headerPadding.value),
)

const bodyPadding = computed(() => (props.variant === 'inset' ? 'px-4 py-3' : 'px-5 py-4'))

const bodyClasses = computed(() =>
  cn(
    'grid gap-4 border-t border-border/60 text-sm text-muted-foreground',
    props.variant === 'inset' ? 'bg-transparent' : 'bg-muted/40',
    bodyPadding.value,
  ),
)

const sectionTitleClasses = computed(() =>
  cn('text-xs font-medium uppercase tracking-wide text-foreground/70'),
)

const iconWrapperClasses = computed(() =>
  cn(
    'flex size-9 items-center justify-center rounded-full transition',
    props.variant === 'inset' ? 'bg-background/80' : 'bg-muted',
    props.status === 'success' && 'bg-emerald-500/15 text-emerald-600',
    props.status === 'error' && 'bg-destructive/10 text-destructive',
    props.status === 'running' && 'bg-primary/10 text-primary',
  ),
)

const iconClasses = computed(() =>
  cn(
    'size-4 text-muted-foreground transition',
    props.status === 'success' && 'text-emerald-600',
    props.status === 'error' && 'text-destructive',
    (props.status === 'pending' || props.status === 'running') && 'text-primary',
  ),
)

function statusLabel(status?: ToolCallStatus) {
  switch (status) {
    case 'success':
      return 'Success'
    case 'error':
      return 'Failed'
    case 'running':
      return 'Running'
    case 'pending':
    default:
      return 'Pending'
  }
}

function statusVariant(status?: ToolCallStatus) {
  switch (status) {
    case 'success':
      return 'default'
    case 'error':
      return 'destructive'
    case 'running':
      return 'secondary'
    case 'pending':
    default:
      return 'outline'
  }
}

function statusIcon(status?: ToolCallStatus) {
  switch (status) {
    case 'success':
      return Check
    case 'error':
      return X
    case 'running':
    case 'pending':
    default:
      return LoaderCircle
  }
}

function formatValue(value?: unknown) {
  if (value == null)
    return undefined

  if (typeof value === 'string')
    return value

  try {
    return JSON.stringify(value, null, 2)
  }
  catch {
    return String(value)
  }
}

const formattedRequest = computed(() => formatValue(props.request))
const formattedResponse = computed(() => formatValue(props.response))
const hasDetails = computed(() => Boolean(formattedRequest.value || formattedResponse.value))
const hasSlotContent = computed(() => Boolean(slots.default))
const showBody = computed(() => hasDetails.value || hasSlotContent.value)

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
    v-if="props.collapsible && showBody"
    v-model:open="open"
    :class="classes"
  >
    <div :class="headerClasses">
      <div class="flex flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-3">
        <div class="flex items-start gap-3">
          <div :class="iconWrapperClasses">
            <component
              :is="iconComponent"
              :class="[
                iconClasses,
                { 'animate-spin text-primary': animateStatus },
              ]"
            />
          </div>
          <div class="space-y-1">
            <p class="text-sm font-semibold text-foreground">
              {{ props.name }}
            </p>
            <p
              v-if="props.description || props.latency"
              class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <span v-if="props.description">{{ props.description }}</span>
              <span v-if="props.description && props.latency" aria-hidden="true">•</span>
              <span v-if="props.latency">{{ props.latency }}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2 self-stretch sm:self-start">
          <Badge
            :variant="statusVariant(props.status)"
            class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wide"
          >
            <component :is="statusIcon(props.status)" class="size-3" />
            {{ statusLabel(props.status) }}
          </Badge>
          <CollapsibleTrigger as-child>
            <button
              type="button"
              class="inline-flex size-7 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:text-foreground"
            >
              <ChevronDown
                class="size-4 transition-transform duration-200"
                :class="open ? 'rotate-180' : ''"
              />
            </button>
          </CollapsibleTrigger>
        </div>
      </div>
    </div>
    <CollapsibleContent :class="bodyClasses">
      <div v-if="formattedRequest" class="space-y-2">
        <p :class="sectionTitleClasses">
          {{ props.requestLabel }}
        </p>
        <pre class="max-h-48 overflow-auto rounded-lg bg-background/80 p-3 text-xs text-foreground/80 shadow-inner">
          <code>{{ formattedRequest }}</code>
        </pre>
      </div>
      <div v-if="formattedResponse" class="space-y-2">
        <p :class="sectionTitleClasses">
          {{ props.responseLabel }}
        </p>
        <pre class="max-h-48 overflow-auto rounded-lg bg-background/80 p-3 text-xs text-foreground/80 shadow-inner">
          <code>{{ formattedResponse }}</code>
        </pre>
      </div>
      <slot />
    </CollapsibleContent>
  </Collapsible>
  <div
    v-else
    :class="classes"
  >
    <div :class="headerClasses">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex items-start gap-3">
          <div :class="iconWrapperClasses">
            <component
              :is="iconComponent"
              :class="[
                iconClasses,
                { 'animate-spin text-primary': animateStatus },
              ]"
            />
          </div>
          <div class="space-y-1">
            <p class="text-sm font-semibold text-foreground">
              {{ props.name }}
            </p>
            <p
              v-if="props.description || props.latency"
              class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <span v-if="props.description">{{ props.description }}</span>
              <span v-if="props.description && props.latency" aria-hidden="true">•</span>
              <span v-if="props.latency">{{ props.latency }}</span>
            </p>
          </div>
        </div>
        <Badge
          :variant="statusVariant(props.status)"
          class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wide"
        >
          <component :is="statusIcon(props.status)" class="size-3" />
          {{ statusLabel(props.status) }}
        </Badge>
      </div>
    </div>
    <div
      v-if="showBody"
      :class="bodyClasses"
    >
      <div v-if="formattedRequest" class="space-y-2">
        <p :class="sectionTitleClasses">
          {{ props.requestLabel }}
        </p>
        <pre class="max-h-48 overflow-auto rounded-lg bg-background/80 p-3 text-xs text-foreground/80 shadow-inner">
          <code>{{ formattedRequest }}</code>
        </pre>
      </div>
      <div v-if="formattedResponse" class="space-y-2">
        <p :class="sectionTitleClasses">
          {{ props.responseLabel }}
        </p>
        <pre class="max-h-48 overflow-auto rounded-lg bg-background/80 p-3 text-xs text-foreground/80 shadow-inner">
          <code>{{ formattedResponse }}</code>
        </pre>
      </div>
      <slot />
    </div>
  </div>
</template>
