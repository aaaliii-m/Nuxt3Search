<template>
  <div class="container mx-auto px-[15px]">
    <div class="h-[85px] flex items-end justify-between">
      <ul class="flex gap-[32px] items-center text-[18px] text-indigo-700">
        <li class="mr-[7rem] cursor-pointer text-[28px] font-[700]">LOGO</li>
        <li class="cursor-pointer"><NuxtLink to="/">Home</NuxtLink></li>
        <li class="cursor-pointer">
          <NuxtLink to="/categories">Categories</NuxtLink>
        </li>
        <li class="cursor-pointer"><NuxtLink to="/about">About</NuxtLink></li>
        <li class="cursor-pointer">
          <NuxtLink to="/contact">Contact</NuxtLink>
        </li>
        <li
          class="cursor-pointer relative"
          @mouseenter.stop="handleHover"
          @mouseleave.stop="handleHover"
        >
          <NuxtLink to="/contact">
            Theme
            <ul
              :class="mouseHover ? 'block' : 'hidden'"
              class="absolute top-[28px] border border-indigo-700"
            >
              <li
                class="cursor-pointer py-4 px-2 hover:bg-indigo-700 hover:text-white"
              >
                Orange
              </li>
              <li
                class="cursor-pointer py-4 px-2 hover:bg-indigo-700 hover:text-white"
              >
                Green
              </li>
            </ul>
          </NuxtLink>
        </li>
      </ul>
      <div class="flex relative">
        <form @submit.prevent>
          <input
            v-model="searchTerm"
            type="text"
            id="pageSearch"
            name="pageSearch"
            placeholder="Search"
            class="border border-indigo-500 py-[8px] px-[16px] rounded-[24px] mr-[16px]"
            @input="submitSearch(e)"
          />
          <button
            class="border border-indigo-700 bg-indigo-700 text-white py-[8px] px-[16px]"
          >
            Search
          </button>
        </form>
        <div
          v-if="filteredData !== null"
          class="border border-indigo-400 absolute top-[50px] rounded-[30px] py-[12px] px-[24px] cursor-pointer"
        >
          <ul v-for="search in filteredData" :key="search.id">
            <li>{{ search.title }}</li>
          </ul>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup>
let searchTerm = ref("");
let receivedData = ref();
let filteredData = ref(null);
let mouseHover = ref(false);

const handleHover = () => {
  mouseHover.value = !mouseHover.value;
  console.log(mouseHover.value);
};

const submitSearch = async () => {
  console.log(searchTerm.value.length);

  if (searchTerm.value.length >= 3) {
    console.log("Running search");
    await updateDebounceSearch(searchTerm);
  } else {
    console.log("text too short");
  }
};

const debounce = (cb, delay = 1000) => {
  console.log("time to delay: **", delay);
  let load;
  return (...args) => {
    clearTimeout(load);
    load = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const updateDebounceSearch = debounce(async (term) => {
  const { data, error } = await useFetch("https://fakestoreapi.com/products");
  // term.value.toLowerCase();
  try {
    console.log("all Data in header: >>> ", data.value[0]);
    receivedData.value = data.value;
    console.log(receivedData.value, " search term");
  } catch {
    console.log("Error in Data in Header: >>> ", error);
  }

  if (receivedData.value) {
    filteredData.value = receivedData.value.filter((item) =>
      item.title.toLowerCase().includes(term.value.toLowerCase())
    );
    console.log(filteredData.value);
  }
}, 800);

console.log("Searched Data: ", filteredData);
</script>
