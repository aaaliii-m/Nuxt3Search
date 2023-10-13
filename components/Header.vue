<template>
    <div class="container mx-auto px-[15px]">
        <div class="h-[85px] flex items-end justify-between">
            <ul class="flex gap-[32px] items-center text-[18px] text-indigo-700">
                <li class="mr-[7rem] cursor-pointer text-[28px] font-[700]">LOGO</li>
                <li class="cursor-pointer"><NuxtLink to="/">Home</NuxtLink></li>
                <li class="cursor-pointer"><NuxtLink to="/categories">Categories</NuxtLink></li>
                <li class="cursor-pointer"><NuxtLink to="/about">About</NuxtLink></li>
                <li class="cursor-pointer"><NuxtLink to="/contact">Contact</NuxtLink></li>
            </ul>
            <div class="flex relative">
                <form @submit.prevent>
                    <input v-model="searchTerm" type="text" id="pageSearch" name="pageSearch" placeholder="Search" class="border border-indigo-500 py-[8px] px-[16px]  mr-[16px]" @input="submitSearch(e)" />
                    <button class="border border-indigo-700 bg-indigo-700 text-white py-[8px] px-[16px]">Search</button>
                </form> 
                <div v-if="filteredData !== null && filteredData.length" class="border border-indigo-400 absolute top-[50px] py-[12px] cursor-pointer">
                    <ul v-for="search, i in filteredData" :key="i + 'searchItem'" class="text-[#111] text-[14px]"  :class="{'bg-gray-200': (i % 2) == 0,  'bg-white': (i % 2) == 1}" >
                        <li class="mb-[4px] py-[5px] px-[24px] hover:bg-indigo-400 hover:text-white">{{search.title}}</li>
                    </ul>
                </div> 
                <div v-else-if="filteredData !== null && filteredData.length == 0" class="border border-indigo-400 absolute top-[50px] py-[12px] cursor-default">
                    <div class="text-[#111] text-[14px] bg-gray-200">
                        <p class="mb-[4px] py-[5px] px-[24px]">No item found</p>
                    </div>
                </div> 
            </div>
        </div>
    </div>    
</template> 

<script setup>

let searchTerm = ref('');
let receivedData = ref();
let filteredData = ref(null);

const submitSearch = async () => {
    console.log(searchTerm.value.length);

    if (searchTerm.value.length >= 3) {
        console.log("Running search");
        await updateDebounceSearch(searchTerm);
    } else {
        console.log("text too short");
        filteredData.value = null;
    }
}

const debounce = (cb, delay = 1000) => {
    console.log("time to delay: **", delay)
    let load;
    return (...args) => {
        clearTimeout(load);
        load = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

const updateDebounceSearch = debounce(async term => {
    const { data, error } = await useFetch('https://fakestoreapi.com/products');
    // term.value.toLowerCase();
    try {
        console.log("all Data in header: >>> ", data.value[0]);
        filteredData.value = data.value.filter(item => item.title.toLowerCase().includes(term.value.toLowerCase()));
        // receivedData.value = data.value;
        console.log(filteredData.value, " search term")
    } catch {
      console.log("Error in Data in Header: >>> ", error)
    }

    // if (receivedData.value) {
    //     filteredData.value = receivedData.value.filter(item => item.title.toLowerCase().includes(term.value.toLowerCase()));
    //     console.log(filteredData.value)
    // }

}, 800);

console.log("Searched Data: ", filteredData)



</script>