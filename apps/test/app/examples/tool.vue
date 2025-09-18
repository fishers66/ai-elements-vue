<script setup lang="ts">
import { ToolCall } from '@repo/elements/tool'
</script>

<template>
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
</template>
