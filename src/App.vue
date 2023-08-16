<script setup lang="ts">
// This components updates the time every second.
import Timer from "./Timer.vue";
import type { PaliaTime } from "./paliaTime";

const onTick = (time: PaliaTime) => {
  document.title = `Palia Time - ${time.hours
    .toString()
    .padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
};
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div>
      <h1 class="text-6xl mb-8">Palia Time</h1>
      <div class="grid place-items-center">
        <Timer @tick="onTick" />
      </div>
    </div>
  </div>
</template>
