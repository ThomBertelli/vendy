<script setup lang="ts">
import {RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'



</script>
<template>

  <div class="flex flex-col justify-center items-center">

    <header class="absolute top-0 w-full ">
      <HeaderComponent />
    </header>
    <RouterView />
  </div>

</template>

<style >

</style>
