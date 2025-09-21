<script setup lang="ts">
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface SourcesContentProps {
  class?: string
}

defineProps<SourcesContentProps>()
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'mt-3 flex w-fit flex-col gap-2',
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      $props.class,
    )"
  >
    <slot />
  </CollapsibleContent>
</template>
