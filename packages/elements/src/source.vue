<script setup lang="ts">
import { Book } from 'lucide-vue-next'

interface SourceProps {
  href?: string
  title?: string
  class?: string
}

defineProps<SourceProps>()
</script>

<template>
  <a
    :href="$props.href"
    class="flex items-center gap-2"
    rel="noreferrer"
    target="_blank"
  >
    <slot>
      <Book class="h-4 w-4" />
      <span class="block font-medium">{{ $props.title }}</span>
    </slot>
  </a>
</template>
