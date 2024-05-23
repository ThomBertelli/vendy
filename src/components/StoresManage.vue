<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div>
    
    
        <h1>Lojas</h1>
    
    <div>

        <RouterLink :to="{name: 'new-store'}">
            <ButtonPrime>Criar Loja</ButtonPrime>
        
        </RouterLink>



    </div>
    
    </div>



</template>

<style scoped>
    
</style>
