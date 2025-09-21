<script setup lang="ts">
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@repo/elements'
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold">
      Tool Components Examples
    </h2>

    <!-- Completed tool call -->
    <Tool default-open>
      <ToolHeader
        type="weather.lookup"
        state="output-available"
      />
      <ToolContent>
        <ToolInput :input="{ city: 'Kyoto', start: '2025-05-12', end: '2025-05-14' }" />
        <ToolOutput
          :output="{
            summary: 'Light rain on day 2, otherwise clear.',
            highsCelsius: [22, 20, 23],
          }"
        />
      </ToolContent>
    </Tool>

    <!-- Running tool call -->
    <Tool default-open>
      <ToolHeader
        type="search.files"
        state="input-available"
      />
      <ToolContent>
        <ToolInput :input="{ query: 'app/layout.tsx', include: ['app', 'components'] }" />
        <div class="space-y-2 p-4">
          <p class="text-xs font-medium uppercase tracking-wide text-foreground/70">
            Streaming output
          </p>
          <div class="rounded-lg border border-dashed border-border/70 bg-background/80 p-3 text-xs text-muted-foreground">
            <p>Scanning 52 files…</p>
            <p>Scanning 2 files…</p>
            <p>Reading <span class="font-medium text-foreground">page.tsx</span></p>
          </div>
        </div>
      </ToolContent>
    </Tool>

    <!-- Error tool call -->
    <Tool>
      <ToolHeader
        type="database.query"
        state="output-error"
      />
      <ToolContent>
        <ToolInput :input="{ table: 'users', query: 'SELECT * FROM users WHERE invalid_column = ?' }" />
        <ToolOutput
          :output="null"
          error-text="Column 'invalid_column' doesn't exist in table 'users'"
        />
      </ToolContent>
    </Tool>

    <!-- Pending tool call -->
    <Tool>
      <ToolHeader
        type="read.pdf"
        state="input-streaming"
      />
      <ToolContent>
        <div class="p-4 text-sm text-muted-foreground">
          Waiting for input parameters...
        </div>
      </ToolContent>
    </Tool>
  </div>
</template>
