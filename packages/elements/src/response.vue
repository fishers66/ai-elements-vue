<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'

interface Props {
  content?: string
  class?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()

const classes = computed(() =>
  cn(
    'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
    props.class,
    attrs.class as string || '',
  ),
)
</script>

<template>
  <div :class="classes">
    <slot>
      <div v-if="props.content" v-html="props.content" />
    </slot>
  </div>
</template>
