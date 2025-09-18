<script setup lang="ts">
import type { SuggestionItem } from './types'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CornerDownLeft } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  suggestion: SuggestionItem
  active?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const emit = defineEmits<{
  (e: 'select', suggestion: SuggestionItem): void
}>()

const classes = computed(() =>
  cn(
    'group relative w-full justify-start overflow-hidden rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-left text-sm shadow-sm transition hover:border-border/90 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary/30',
    props.active
      ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
      : 'border-border/60',
    props.class,
  ),
)
</script>

<template>
  <Button
    variant="ghost"
    :disabled="props.suggestion.disabled"
    :class="classes"
    :aria-pressed="props.active"
    @click="emit('select', props.suggestion)"
  >
    <div class="flex w-full items-start gap-3">
      <component
        :is="props.suggestion.icon"
        v-if="props.suggestion.icon"
        class="mt-0.5 size-4 flex-shrink-0 text-muted-foreground transition group-hover:text-foreground"
        :class="props.suggestion.disabled ? 'opacity-60' : ''"
      />
      <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between gap-2">
          <span class="font-medium text-foreground">
            {{ props.suggestion.label }}
          </span>
          <kbd
            v-if="props.suggestion.shortcut"
            class="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
          >
            {{ props.suggestion.shortcut }}
          </kbd>
        </div>
        <p
          v-if="props.suggestion.description"
          class="text-xs leading-relaxed text-muted-foreground"
        >
          {{ props.suggestion.description }}
        </p>
      </div>
      <CornerDownLeft
        class="mt-0.5 size-4 flex-shrink-0 text-muted-foreground transition group-hover:text-foreground"
        :class="props.suggestion.disabled ? 'opacity-60' : ''"
      />
    </div>
  </Button>
</template>
