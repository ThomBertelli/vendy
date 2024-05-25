<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL;

const storesList = ref()

const fetchProdutos = async () => {
    try {
        const response = await fetch(`${apiUrl}/stores`,{
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

onMounted(() => {fetchProdutos()})
</script>

<template>
    <div>
        <h1>Lojas</h1>

        <div>
            <RouterLink :to="{ name: 'new-store' }">
                <ButtonPrime>Criar Loja</ButtonPrime>
            </RouterLink>
        </div>

        <div>
            <ul>
                <li v-for="store in storesList" :key="store.id">
                    {{ store.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
