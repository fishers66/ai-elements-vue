<script setup lang="ts">
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CheckCircle, ChevronDown, Circle, Clock, Wrench, XCircle } from 'lucide-vue-next'
import { computed } from 'vue'

interface ToolHeaderProps {
  type: string
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  class?: string
}

const props = defineProps<ToolHeaderProps>()

const statusBadge = computed(() => {
  const labels = {
    'input-streaming': 'Pending',
    'input-available': 'Running',
    'output-available': 'Completed',
    'output-error': 'Error',
  } as const

  const icons = {
    'input-streaming': Circle,
    'input-available': Clock,
    'output-available': CheckCircle,
    'output-error': XCircle,
  } as const

  const iconClasses = {
    'input-streaming': 'size-4',
    'input-available': 'size-4 animate-pulse',
    'output-available': 'size-4 text-green-600',
    'output-error': 'size-4 text-red-600',
  } as const

  return {
    label: labels[props.state],
    icon: icons[props.state],
    iconClass: iconClasses[props.state],
  }
})
</script>

<template>
  <CollapsibleTrigger
    :class="cn(
      'flex w-full items-center justify-between gap-4 p-3',
      $props.class,
    )"
  >
    <div class="flex items-center gap-2">
      <Wrench class="size-4 text-muted-foreground" />
      <span class="font-medium text-sm">{{ $props.type }}</span>
      <Badge class="gap-1.5 rounded-full text-xs" variant="secondary">
        <component :is="statusBadge.icon" :class="statusBadge.iconClass" />
        {{ statusBadge.label }}
      </Badge>
    </div>
    <ChevronDown class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
</template>
