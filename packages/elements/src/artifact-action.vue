<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface ArtifactActionProps {
  tooltip?: string
  label?: string
  icon?: any
  class?: string
  size?: 'sm' | 'default' | 'lg' | 'icon'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

const props = withDefaults(defineProps<ArtifactActionProps>(), {
  size: 'sm',
  variant: 'ghost',
})

const hasTooltip = computed(() => !!props.tooltip)
</script>

<template>
  <TooltipProvider v-if="hasTooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          :class="cn(
            'size-8 p-0 text-muted-foreground hover:text-foreground',
            $props.class,
          )"
          :size="$props.size"
          :variant="$props.variant"
          type="button"
        >
          <component :is="$props.icon" v-if="$props.icon" class="size-4" />
          <slot v-else />
          <span class="sr-only">{{ $props.label || $props.tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ $props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button
    v-else
    :class="cn(
      'size-8 p-0 text-muted-foreground hover:text-foreground',
      $props.class,
    )"
    :size="$props.size"
    :variant="$props.variant"
    type="button"
  >
    <component :is="$props.icon" v-if="$props.icon" class="size-4" />
    <slot v-else />
    <span class="sr-only">{{ $props.label || $props.tooltip }}</span>
  </Button>
</template>
