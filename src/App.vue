<script setup lang="ts">
// This components updates the time every second.
import Timer from "./Timer.vue";
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div>
      <h1 class="text-6xl mb-8">Palia Time</h1>
      <div class="grid place-items-center">
        <Timer />
      </div>
    </div>
  </div>
</template>
