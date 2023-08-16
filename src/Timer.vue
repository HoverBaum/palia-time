<template>
  <div>
    <span class="countdown font-mono text-4xl">
      <span :style="{ '--value': hours }"></span>:
      <span :style="{ '--value': minutes }"></span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  format?: "AM" | "24";
}>();

const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");

const timeToPaliaSecondsSinceMidnight = (now: Date): number => {
  const millisSinceFullHour = now.getTime() % 3600000;
  const millisInAnHour = 3600000;
  const secondsInADay = 86400;

  // An hour in real time equals a day in palia time.
  // millisSinceFullHour / millisInAnHour = PaliaSecondsSinceMidnight / secondsInADay
  // Which leads us to this calculation.
  const paliaSecondsSinceMidnight = Math.floor(
    (millisSinceFullHour / millisInAnHour) * secondsInADay
  );
  return paliaSecondsSinceMidnight;
};

const updateTime = () => {
  const now = new Date();

  const paliaSecondsSinceMidnight = timeToPaliaSecondsSinceMidnight(now);
  const paliaHour = Math.floor(paliaSecondsSinceMidnight / 3600);
  const paliaMinute = Math.floor((paliaSecondsSinceMidnight % 3600) / 60);

  hours.value = paliaHour.toString().padStart(2, "0");
  minutes.value = paliaMinute.toString().padStart(2, "0");
  seconds.value = (paliaSecondsSinceMidnight % 60).toString().padStart(2, "0");
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