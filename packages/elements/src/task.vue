<script setup lang="ts">
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskProps {
  defaultOpen?: boolean
  class?: string
}

withDefaults(defineProps<TaskProps>(), {
  defaultOpen: true,
})
</script>

<template>
  <Collapsible
    :class="cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=open]:animate-in',
      $props.class,
    )"
    :default-open="$props.defaultOpen"
  >
    <slot />
  </Collapsible>
</template>
