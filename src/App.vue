<script setup lang="ts">
// This components updates the time every second.
import { ref } from "vue";
import Timer from "./Timer.vue";
import type { PaliaTime } from "./paliaTime";

const onTick = (time: PaliaTime) => {
  document.title = `Palia Time - ${time.hours
    .toString()
    .padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
};

const useAM = ref(false);
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div>
      <h1 class="text-6xl mb-8">Palia Time</h1>
      <div class="grid place-items-center">
        <Timer @tick="onTick" :format="useAM ? 'AM' : '24'" />
      </div>
    </div>
  </div>
  <div class="absolute left-2 bottom-2">
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text mr-1">Use AM/PM</span>
        <input type="checkbox" class="toggle" v-model="useAM" />
      </label>
    </div>
  </div>
</template>
