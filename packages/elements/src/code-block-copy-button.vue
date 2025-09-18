<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Check, Copy } from 'lucide-vue-next'
import { computed, inject, ref } from 'vue'

interface CodeBlockCopyButtonProps {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  class?: string
}

const props = withDefaults(defineProps<CodeBlockCopyButtonProps>(), {
  timeout: 2000,
})

const isCopied = ref(false)
const code = inject<string>('codeBlockCode', '')

async function copyToClipboard() {
  if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
    props.onError?.(new Error('Clipboard API not available'))
    return
  }

  try {
    await navigator.clipboard.writeText(code)
    isCopied.value = true
    props.onCopy?.()
    setTimeout(() => {
      isCopied.value = false
    }, props.timeout)
  }
  catch (error) {
    props.onError?.(error as Error)
  }
}

const Icon = computed(() => isCopied.value ? Check : Copy)
</script>

<template>
  <Button
    :class="cn('shrink-0', $props.class)"
    size="icon"
    variant="ghost"
    @click="copyToClipboard"
  >
    <slot>
      <component :is="Icon" :size="14" />
    </slot>
  </Button>
</template>
