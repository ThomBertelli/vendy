<script lang="ts" setup>
import UserProfile from './UserProfile.vue'
import { RouterLink } from 'vue-router'
</script>

<template>

    <div class="flex justify-between w-full p-5 items-center">
        <div class="flex gap-2">
            <RouterLink :to="{name: 'home'}">
                <i class="pi pi-home text-3xl"></i>
            </RouterLink>
            <h1>Delivery - Logistas</h1>
        </div>
        <UserProfile/>
    </div>
</template>

<style >
    
</style>
