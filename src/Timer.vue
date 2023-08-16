<template>
  <div>
    <span class="countdown font-mono text-4xl">
      <span :style="{ '--value': hours }"></span>:
      <span :style="{ '--value': minutes }"></span>
    </span>
    <span v-if="format === 'AM'" class="ml-1">{{ amString }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { currentPaliaTime, type PaliaTime } from "./paliaTime";

const props = defineProps<{
  format?: "AM" | "24";
}>();
let { format } = props;

const emit = defineEmits<{
  tick: [time: PaliaTime];
}>();

const hours = ref("00");
const minutes = ref("00");
const amString = ref("AM");

const updateTime = () => {
  const paliaTime = currentPaliaTime();

  if (format === "AM") {
    hours.value = paliaTime.amHours.toString().padStart(2, "0");
    amString.value = paliaTime.hours < 12 ? "AM" : "PM";
  } else {
    hours.value = paliaTime.hours.toString().padStart(2, "0");
  }
  minutes.value = paliaTime.minute.toString().padStart(2, "0");
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