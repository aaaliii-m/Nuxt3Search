<template>
    <div class="container mx-auto px-[15px]">
        <h1 class="text-[32px] font-[500]">Home</h1>
        {{ newObj.name }}
        <div class="mt-[3rem] py-[8px] bg-violet-100 flex flex-wrap w-100 justify-between px-[16px] items-center">
            <p class="text-indigo-700 font-[500] text-[18px]">Counter Value: <span class="font-[700] text-emerald-700 text-[36px]">{{ getCount }}</span></p>
            <div class="flex flex-col items-end gap-[8px]">
                <button class="uppercase text-white bg-indigo-700 text-[12px] px-[36px] hover:bg-indigo-900 h-[30px] w-[110px]" @click="incrementCount">Add</button>
                <button class="uppercase text-white bg-indigo-700 text-[12px] px-[36px] hover:bg-indigo-900 h-[30px] w-[110px]" @click="resetCount">reset</button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { useCounterStore } from '@/modules/stores/counter';
// import {storeToRefs } from 'pinia';

let newObj = reactive({
    name: "Ali"
})

newObj.name = "Tile Mountain"        // when we use 'reactive', we do not need to use .value to update the value.

// we can not destructure the store properties etc. because store is wrapped object inside reactive function

// to destructure, we can use StoreToRefs, but this doesn't extract non reactive properties or actions/methods.

// IN THIS EXAMPLE WE ARE USING STATE DIRECTLY, BUT WE DON'T DO THAT. WE USE GETTERS/COMPUTED METHODS

const counter = useCounterStore();
const getCount = computed(() => counter.getCount)
const { resetCount, incrementCount } = counter;


</script>