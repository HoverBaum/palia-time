<template>
  <div class="flex flex-col items-center">
    <div>
      <span class="countdown font-mono text-4xl">
        <span :style="{ '--value': hours }"></span>:
        <span :style="{ '--value': minutes }"></span>
      </span>
      <span v-if="format === 'AM'" class="ml-1">{{ amString }}</span>
    </div>
    <span class="mt-4" :style="{ color: timeOfDayColor }">{{ timeOfday }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  currentPaliaTime,
  type PaliaTimeOfDay,
  type PaliaTime,
} from "./paliaTime";

const props = defineProps<{
  format?: "AM" | "24";
}>();

const emit = defineEmits<{
  tick: [time: PaliaTime];
}>();

const hours = ref("00");
const minutes = ref("00");
const amString = ref("AM");
const timeOfday = ref<PaliaTimeOfDay | "">("");
const timeOfDayColor = ref("");

const updateTime = () => {
  const paliaTime = currentPaliaTime();

  if (props.format === "AM") {
    hours.value = paliaTime.amHours.toString().padStart(2, "0");
    amString.value = paliaTime.hours < 12 ? "AM" : "PM";
  } else {
    hours.value = paliaTime.hours.toString().padStart(2, "0");
  }
  minutes.value = paliaTime.minute.toString().padStart(2, "0");
  timeOfday.value = paliaTime.timeOfDay;

  let currentColor = "#334059";
  if (paliaTime.hours >= 3) currentColor = "#bb9f71";
  if (paliaTime.hours >= 6) currentColor = "#6399c4";
  if (paliaTime.hours >= 18) currentColor = "#c08f8d";
  if (paliaTime.hours >= 21) currentColor = "#334059";
  timeOfDayColor.value = currentColor;

  emit("tick", paliaTime);
};

/**
 * 1000/24 catches every PaliaSecond.
 * 24 updates per real seconds however is a lot.
 * We only care about Palia time down to Minutes.
 * Thus we update three times per PaliaMinute to keep accuracy to 20 PaliaSeconds.
 * Just a value that feels good, no specific reason.
 */
const intervalTime = (1000 / 24) * 20;

let interval: ReturnType<typeof setInterval> | number;
onMounted(() => {
  updateTime();
  interval = setInterval(updateTime, intervalTime);
});

onBeforeUnmount(() => clearInterval(interval as number));
</script>