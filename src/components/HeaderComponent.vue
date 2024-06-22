<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { isLoggedIn, currentUser } = storeToRefs(authStore);

onMounted(()=>{
    authStore.checkAuth()
})


const signOut = () => {
    authStore.signOut();
};

</script>

<template>

    <div class="flex justify-between w-full p-5 items-center bg-white z-100">
        <div class="flex gap-2">
            <RouterLink :to="{name: 'home'}">
                <i class="pi pi-home text-3xl"></i>
            </RouterLink>
            <h1 class="font-bold">Delivery - Logistas</h1>
            
        </div>
        <div class="flex flex-col ">
        <template v-if="isLoggedIn">
            <div class="flex flex-col items-center gap-2">
                <div>
                    <h3>Olá, {{ currentUser && currentUser.email }}</h3>     
                </div>
                <div class="flex gap-2">
                    <nav>
                        <ButtonPrime outlined  @click="signOut">Sair</ButtonPrime>
                    </nav>
                    <nav>
                        <ButtonPrime  >
                            <RouterLink :to="{name: 'stores'}"> Lojas</RouterLink>
                        </ButtonPrime>
                    </nav>
                </div>
            </div>
        </template>
        <template  v-else>
            <div class="flex gap-3">
                <nav>
                    <ButtonPrime class="custom-button">
                        <RouterLink :to="{ name: 'signin'}"> Entrar </RouterLink>
                    </ButtonPrime>
                </nav>
                <nav>
                    <ButtonPrime>
                        <RouterLink :to="{name: 'signup'}"> Cadastrar </RouterLink>
                    </ButtonPrime>
                </nav>
            </div>
        </template>
    </div>
    </div>
</template>

<style scoped >
    
    
</style>
