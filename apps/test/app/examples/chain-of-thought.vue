<script setup lang="ts">
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@repo/elements'
import { CheckCircle, Clock, Search } from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold mb-4">
        Chain of Thought Example
      </h3>
      <ChainOfThought default-open>
        <ChainOfThoughtHeader>
          Planning Kyoto Itinerary
        </ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            :icon="CheckCircle"
            label="Gather context"
            description="Review previous conversation turns and user goal."
            status="complete"
          />

          <ChainOfThoughtStep
            :icon="Search"
            label="Search documentation"
            description="Query API reference for itinerary endpoints."
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>docs.search</ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>kyoto-temples.md</ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>vegetarian-restaurants.json</ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>

          <ChainOfThoughtStep
            :icon="Clock"
            label="Draft itinerary"
            description="Assemble 3-day schedule with food and activities."
            status="active"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4">
        Collapsed Chain of Thought
      </h3>
      <ChainOfThought>
        <ChainOfThoughtHeader>
          Advanced Planning Process
        </ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            label="Analyze user preferences"
            description="Extract key requirements from conversation history."
            status="complete"
          />

          <ChainOfThoughtStep
            label="Weather check"
            description="Verify May weather conditions in Kyoto."
            status="complete"
          />

          <ChainOfThoughtStep
            label="Generate recommendations"
            description="Create personalized itinerary based on analysis."
            status="pending"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  </div>
</template>
