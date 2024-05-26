<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '../stores/useStore';

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();
const storesList = ref()
const storePinia = useStore();

const fetchStores = async () => {
    try {
        const response = await fetch(`${apiUrl}/stores`, {
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar lojas')
        }
        const data = await response.json()
        storesList.value = data

    } catch (error) {
        console.error('Erro ao buscar lojas:', error)
    }
}

onMounted(() => { fetchStores() })

const redirectToProducts = (id: string, storeName: string) =>{
    storePinia.setCurrentStore(id, storeName);
    router.push({ name: 'products' });
}


const redirectToEdit = (id: string, storeName: string) => {
    storePinia.setCurrentStore(id, storeName);
    router.push({ name: 'EditStore' });
};

const handleEditStore = (storeId: string, storeName: string) => {
    redirectToEdit(storeId, storeName);
};

</script>

<template>
    <div>
        <h1 class="mt-20 text-center"> Administre as suas <strong>Lojas</strong></h1>

        <div class="fixed bottom-20 right-20">
            <RouterLink :to="{ name: 'new-store' }">
                <ButtonPrime>Criar Loja</ButtonPrime>
            </RouterLink>
        </div>

        <div class="mt-20">
            <ul class="flex flex-col gap-4 ">
                <li v-for="store in storesList" 
                    :key="store.id"
                    @click="redirectToProducts(store.id,store.name)"
                    class="items-center pt-2 pb-2 pl-6 pr-6 flex gap-20 rounded-md border border-amber-600 ">
                    <h3 class="store-name flex-1 text-xl text-amber-600">
                        {{ store.name }}
                    </h3>
                    <div class="flex gap-4">
                        <i @click="handleEditStore(store.id, store.name)"
                            class="pi pi-pen-to-square heartbeat cursor-pointer text-blue-500" style="font-size: 1.5rem"></i>
                        <i class="pi pi-trash heartbeat cursor-pointer text-red-500" style="font-size: 1.5rem; color:red"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>




.store-name:hover{
    animation: pulse 1s;
    cursor: pointer;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}
</style>
