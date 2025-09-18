<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface ActionProps {
  tooltip?: string
  label?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
}

const props = withDefaults(defineProps<ActionProps>(), {
  variant: 'ghost',
  size: 'sm',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClass = computed(() => cn(
  'relative size-9 p-1.5 text-muted-foreground hover:text-foreground',
  props.class,
))
</script>

<template>
  <TooltipProvider v-if="props.tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          :class="buttonClass"
          :size="props.size"
          type="button"
          :variant="props.variant"
          @click="emit('click', $event)"
        >
          <slot />
          <span class="sr-only">{{ props.label || props.tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button
    v-else
    :class="buttonClass"
    :size="props.size"
    type="button"
    :variant="props.variant"
    @click="emit('click', $event)"
  >
    <slot />
    <span class="sr-only">{{ props.label || props.tooltip }}</span>
  </Button>
</template>
