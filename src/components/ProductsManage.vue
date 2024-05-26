<script lang="ts" setup>
import { computed,ref,onMounted } from 'vue';
import { useStore } from '../stores/useStore';
import { useRouter } from 'vue-router';




const apiUrl = import.meta.env.VITE_API_URL;
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const store = useStore();
const storeId = computed(() => store.currentStore?.id);
const storeName = computed(() => store.currentStore.name);
const productsList = ref();

const fetchProducts = async () => {



    try {
        const response = await fetch(`${apiUrl}/stores/${storeId.value}/products?locale=pt-BR`, {
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-API-KEY": `${apiCredential}`,
                
            },
        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos')
        }
        const data = await response.json()

        productsList.value = data.result.products

    } catch (error) {
        console.error('Erro ao buscar produtos:', error)
    }
}

onMounted(() => { fetchProducts() })



</script>

<template>
    <div>
        <h1>Produtos da loja <strong>{{ storeName }}</strong></h1>

        <div class="mt-20">
            <div class="flex flex-col items-center">
                <ul class="flex flex-col gap-4 ">
                    <li v-for="product in productsList" 
                        :key="product.id"
                        
                        class="items-center pt-2 pb-2 pl-6 pr-6 flex gap-20 rounded-md border border-amber-600 ">
                            <h3  class="flex-1 text-xl text-amber-600">
                                {{ product.title }}
                            </h3>
                            <h3 class="text-xl text-amber-600">
                                {{ product.price }}
                            </h3>
                            <div class="flex gap-4">
                                <i class="pi pi-pen-to-square heartbeat cursor-pointer text-blue-500" style="font-size: 1.5rem"></i>
                                <i class="pi pi-trash heartbeat cursor-pointer text-red-500" style="font-size: 1.5rem; color:red"></i>
                            </div>
                    </li>
                </ul>

               

            </div>
            
            
        </div>

        <div class="fixed bottom-20 right-20">
            <RouterLink :to="{ name: 'new-product' }">
                <ButtonPrime>Cadastrar Produto</ButtonPrime>
            </RouterLink>
        </div>

    </div>
</template>

<style lang="css" scoped>
    
</style>
