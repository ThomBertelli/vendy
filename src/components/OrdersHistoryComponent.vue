<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from '@/stores/useStore';


const orders = ref([])
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const store = useStore();
const storeId = computed(() => store.currentStore.id)
const storeName = computed(() => store.currentStore.name);

const totalPages = ref()

const pageNumber = ref(1)

const getOrderHistory = async () => {
    try {
        const response = await fetch(`${apiUrl}/stores/${storeId.value}/orders/history/?page=${pageNumber.value}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'X-API-KEY': `${apiCredential}`
            }

        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar histórico de pedidos')
        }
        const data = await response.json()
        totalPages.value = data.result.pagination.pages
        orders.value = [...orders.value, ...data.result.orders]

    } catch (error) {
        console.error('Erro ao buscar histórico de pedidos:', error)
    }

}

const showMore = () =>{
    pageNumber.value++
    getOrderHistory()
}


onMounted(() => { getOrderHistory() })

</script>

<template>
    <div class="flex flex-col py-40 items-center">
        <h1 class="border-b-2 pb-2">Histórico de Pedidos - {{ storeName  }} </h1>
        <table class="border border-black rounded">
            <thead>
                <tr>
                    <th class="border border-black">Nº Pedido</th>
                    <th class="border border-black">Estado</th>
                    <th class="border border-black">Produtos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id" class="border">
                    <td class="border border-black"> {{ order.id }}</td>
                    <td class="border border-black">{{ order.state }}</td>
                    <td class="border border-black">
                        <ul>
                            <li v-for="item in order.order_items" :key="item.id" class="border ">
                                {{ item.amount }} x {{ item.product.title }}
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="pageNumber < totalPages" class="mt-10">
            <ButtonPrime outlined @click="showMore">Mostrar mais</ButtonPrime>
        </div>
    </div>

</template>

<style scoped></style>
