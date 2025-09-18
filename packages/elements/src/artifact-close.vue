<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { X } from 'lucide-vue-next'

interface ArtifactCloseProps {
  class?: string
  size?: 'sm' | 'default' | 'lg' | 'icon'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

withDefaults(defineProps<ArtifactCloseProps>(), {
  size: 'sm',
  variant: 'ghost',
})
</script>

<template>
  <Button
    :class="cn(
      'size-8 p-0 text-muted-foreground hover:text-foreground',
      $props.class,
    )"
    :size="$props.size"
    :variant="$props.variant"
    type="button"
  >
    <slot>
      <X class="size-4" />
    </slot>
    <span class="sr-only">Close</span>
  </Button>
</template>
