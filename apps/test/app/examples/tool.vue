<script setup lang="ts">
import { ToolCall } from '@repo/elements/tool'
</script>

<template>
  <div class="space-y-6">
    <ToolCall
      name="weather.lookup"
      description="Fetches the extended forecast for a destination"
      status="success"
      latency="612 ms"
      :request="{ city: 'Kyoto', start: '2025-05-12', end: '2025-05-14' }"
      :response="{
        summary: 'Light rain on day 2, otherwise clear.',
        highsCelsius: [22, 20, 23],
      }"
    />
    <ToolCall
      name="search.files"
      description="Reads project files to gather context"
      status="running"
      latency="3.4 s"
      :request="{ query: 'app/layout.tsx', include: ['app', 'components'] }"
      :response="null"
      variant="inset"
      collapsible
      :default-open="false"
    >
      <div class="space-y-2">
        <p class="text-xs font-medium uppercase tracking-wide text-foreground/70">
          Streaming output
        </p>
        <div class="rounded-lg border border-dashed border-border/70 bg-background/80 p-3 text-xs text-muted-foreground">
          <p>Scanning 52 files…</p>
          <p>Scanning 2 files…</p>
          <p>Reading <span class="font-medium text-foreground">page.tsx</span></p>
        </div>
      </div>
    </ToolCall>
  </div>
</template>
