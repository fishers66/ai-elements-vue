<script setup lang="ts">
import type { ToolCall, ToolCallStatus } from './types'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Check, LoaderCircle, X } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props extends ToolCall {
  class?: string
}

const props = defineProps<Props>()

const classes = computed(() =>
  cn('rounded-xl border bg-card text-card-foreground shadow-sm', props.class),
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
</script>

<template>
  <div :class="classes">
    <div class="flex items-start justify-between gap-2 px-4 py-3">
      <div class="flex items-start gap-3">
        <component
          :is="props.icon ?? statusIcon(props.status)"
          class="mt-1 size-5 text-muted-foreground"
          :class="{
            'animate-spin': !props.icon && props.status !== 'success' && props.status !== 'error',
          }"
        />
        <div>
          <p class="text-sm font-medium">
            {{ props.name }}
          </p>
          <p
            v-if="props.description"
            class="text-xs text-muted-foreground"
          >
            {{ props.description }}
          </p>
        </div>
      </div>
      <div class="flex flex-col items-end gap-1 text-xs text-muted-foreground">
        <Badge :variant="statusVariant(props.status)">
          {{ statusLabel(props.status) }}
        </Badge>
        <span v-if="props.latency">{{ props.latency }}</span>
      </div>
    </div>
    <div class="grid gap-4 border-t px-4 py-3 text-sm text-muted-foreground">
      <div v-if="formattedRequest" class="space-y-1">
        <p class="text-xs font-medium uppercase tracking-wide text-foreground/80">
          Request
        </p>
        <pre class="max-h-48 overflow-auto rounded-lg bg-muted p-3 text-xs">
          <code>{{ formattedRequest }}</code>
        </pre>
      </div>
      <div v-if="formattedResponse" class="space-y-1">
        <p class="text-xs font-medium uppercase tracking-wide text-foreground/80">
          Response
        </p>
        <pre class="max-h-48 overflow-auto rounded-lg bg-muted p-3 text-xs">
          <code>{{ formattedResponse }}</code>
        </pre>
      </div>
      <slot />
    </div>
  </div>
</template>
