<script setup lang="ts">
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@repo/elements'
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-lg font-semibold">
      Timeline Reasoning UI
    </h2>
    <p class="text-sm text-muted-foreground">
      This example shows how to create the timeline-style reasoning UI with collapsible tool calls and mini-cards.
    </p>

    <!-- Reasoning with Timeline of Tool Calls -->
    <Reasoning :is-streaming="false" :duration="3" :default-open="false">
      <ReasoningTrigger />
      <ReasoningContent>
        <div class="space-y-4">
          <!-- Timeline Entry 1: File Analysis -->
          <div class="border-l-2 border-muted pl-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="h-2 w-2 rounded-full bg-blue-500" />
              <span class="text-xs text-muted-foreground">0.5s</span>
            </div>

            <Task default-open>
              <TaskTrigger title="Analyzing project structure" />
              <TaskContent>
                <TaskItem>
                  <TaskItemFile>package.json</TaskItemFile>
                  <span class="ml-2">Found Vue 3 project with TypeScript</span>
                </TaskItem>
                <TaskItem>
                  <TaskItemFile>src/components/</TaskItemFile>
                  <span class="ml-2">Located component directory</span>
                </TaskItem>
              </TaskContent>
            </Task>

            <!-- Mini Tool Card for File Read -->
            <Tool class="mt-3">
              <ToolHeader
                type="read.file"
                state="output-available"
              />
              <ToolContent>
                <ToolInput :input="{ path: 'package.json' }" />
                <ToolOutput :output="{ name: 'ai-elements-vue', version: '1.0.0', dependencies: { vue: '^3.4.0' } }" />
              </ToolContent>
            </Tool>
          </div>

          <!-- Timeline Entry 2: Code Search -->
          <div class="border-l-2 border-muted pl-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="h-2 w-2 rounded-full bg-green-500" />
              <span class="text-xs text-muted-foreground">1.2s</span>
            </div>

            <Task>
              <TaskTrigger title="Searching for component patterns" />
              <TaskContent>
                <TaskItem>Found 15 Vue components using script setup</TaskItem>
                <TaskItem>Located reasoning component implementation</TaskItem>
                <TaskItem>Identified missing tool components</TaskItem>
              </TaskContent>
            </Task>

            <!-- Mini Tool Card for Code Search -->
            <Tool class="mt-3">
              <ToolHeader
                type="search.code"
                state="output-available"
              />
              <ToolContent>
                <ToolInput :input="{ pattern: 'defineProps.*Props', fileTypes: ['.vue', '.ts'] }" />
                <ToolOutput :output="{ matches: 23, files: ['reasoning.vue', 'tool.vue', 'task.vue'] }" />
              </ToolContent>
            </Tool>
          </div>

          <!-- Timeline Entry 3: Implementation Planning -->
          <div class="border-l-2 border-muted pl-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="h-2 w-2 rounded-full bg-orange-500" />
              <span class="text-xs text-muted-foreground">2.8s</span>
            </div>

            <Task>
              <TaskTrigger title="Planning component implementation" />
              <TaskContent>
                <TaskItem>Design tool component architecture</TaskItem>
                <TaskItem>Create collapsible timeline structure</TaskItem>
                <TaskItem>Implement status badges and icons</TaskItem>
                <TaskItem>Add timeline visual indicators</TaskItem>
              </TaskContent>
            </Task>

            <!-- Multiple Mini Tool Cards -->
            <div class="mt-3 space-y-2">
              <Tool>
                <ToolHeader
                  type="analyze.react"
                  state="output-available"
                />
                <ToolContent>
                  <ToolInput :input="{ file: 'tool.tsx' }" />
                  <ToolOutput :output="{ components: ['Tool', 'ToolHeader', 'ToolContent'], patterns: 'Collapsible with status badges' }" />
                </ToolContent>
              </Tool>

              <Tool>
                <ToolHeader
                  type="generate.vue"
                  state="input-available"
                />
                <ToolContent>
                  <ToolInput :input="{ template: 'tool-component', language: 'vue' }" />
                  <div class="p-4">
                    <div class="animate-pulse text-sm text-muted-foreground">
                      Generating Vue component structure...
                    </div>
                  </div>
                </ToolContent>
              </Tool>
            </div>
          </div>
        </div>
      </ReasoningContent>
    </Reasoning>

    <!-- Another reasoning example showing active streaming -->
    <Reasoning :is-streaming="true" :default-open="true">
      <ReasoningTrigger />
      <ReasoningContent>
        <div class="space-y-4">
          <!-- Active Timeline Entry -->
          <div class="border-l-2 border-blue-500 pl-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span class="text-xs text-muted-foreground">Running...</span>
            </div>

            <Task default-open>
              <TaskTrigger title="Creating component examples" />
              <TaskContent>
                <TaskItem>✅ Updated tool.vue example</TaskItem>
                <TaskItem>🔄 Creating timeline reasoning example</TaskItem>
                <TaskItem>⏳ Writing comprehensive documentation</TaskItem>
              </TaskContent>
            </Task>

            <!-- Running Tool -->
            <Tool class="mt-3" default-open>
              <ToolHeader
                type="write.file"
                state="input-available"
              />
              <ToolContent>
                <ToolInput :input="{ path: 'timeline-reasoning.vue', content: 'Vue component...' }" />
                <div class="p-4">
                  <div class="space-y-1 text-sm text-muted-foreground">
                    <p>Writing component template...</p>
                    <p>Adding script setup section...</p>
                    <p class="animate-pulse">
                      Processing imports...
                    </p>
                  </div>
                </div>
              </ToolContent>
            </Tool>
          </div>
        </div>
      </ReasoningContent>
    </Reasoning>
  </div>
</template>
