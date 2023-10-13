import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  let count = ref(0);

  const getCount = computed(() => count);
  console.log(getCount);

  const incrementCount = () => count.value++;
  const resetCount = () => (count.value = 0);

  return { count, getCount, incrementCount, resetCount };
});
