<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@repo/elements'
import { ref } from 'vue'

const isStreamingExample1 = ref(false)
const isStreamingExample2 = ref(true)
const streamingText = ref('Analyzing the best approach for this travel plan...')

// Simulate streaming text updates
let textIndex = 0
const textFragments = [
  'Analyzing the best approach for this travel plan...',
  'Analyzing the best approach for this travel plan...\n\nI\'m considering multiple factors including seasonal weather patterns, temple visiting hours, and local cuisine preferences.',
  'Analyzing the best approach for this travel plan...\n\nI\'m considering multiple factors including seasonal weather patterns, temple visiting hours, and local cuisine preferences.\n\nFor a 3-day Kyoto trip in mid-May:\n\n1. Weather: Spring season with pleasant temperatures (18-25°C)\n2. Temple visits: Early morning recommended to avoid crowds\n3. Vegetarian options: Buddhist temple cuisine and modern vegan restaurants available',
  'Analyzing the best approach for this travel plan...\n\nI\'m considering multiple factors including seasonal weather patterns, temple visiting hours, and local cuisine preferences.\n\nFor a 3-day Kyoto trip in mid-May:\n\n1. Weather: Spring season with pleasant temperatures (18-25°C)\n2. Temple visits: Early morning recommended to avoid crowds  \n3. Vegetarian options: Buddhist temple cuisine and modern vegan restaurants available\n\nBased on this analysis, I\'ll create a balanced itinerary with cultural exploration, nature experiences, and authentic dining opportunities.',
]

const streamingInterval = setInterval(() => {
  if (textIndex < textFragments.length - 1) {
    textIndex++
    streamingText.value = textFragments[textIndex]
  }
  else {
    clearInterval(streamingInterval)
    isStreamingExample2.value = false
  }
}, 1500)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold mb-4">
        Basic Reasoning Example
      </h3>
      <Reasoning :is-streaming="isStreamingExample1" :duration="4" :default-open="false">
        <ReasoningTrigger />
        <ReasoningContent>
          <div class="space-y-4">
            <p>Let me think about this problem step by step.</p>

            <p>The user is planning a 3-day trip to Kyoto in mid-May. I need to consider:</p>

            <ol class="list-decimal list-inside space-y-2">
              <li>Weather conditions in May (pleasant spring weather)</li>
              <li>Popular attractions and temples</li>
              <li>Vegetarian dining options</li>
              <li>Indoor alternatives for rainy days</li>
            </ol>

            <p>Based on these factors, I'll create a comprehensive itinerary that balances cultural exploration with practical considerations for the weather and dietary preferences.</p>
          </div>
        </ReasoningContent>
      </Reasoning>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4">
        Streaming Reasoning Example
      </h3>
      <Reasoning :is-streaming="isStreamingExample2" :default-open="true">
        <ReasoningTrigger />
        <ReasoningContent>
          <div class="space-y-4 whitespace-pre-line">
            {{ streamingText }}
          </div>
        </ReasoningContent>
      </Reasoning>
    </div>
  </div>
</template>
