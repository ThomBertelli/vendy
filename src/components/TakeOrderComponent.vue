<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import ButtonPrime from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { computed, watch, ref, onMounted } from 'vue'
import { useStore } from '../stores/useStore'
import { useRouter } from 'vue-router'
import { useConfirm } from "primevue/useconfirm";
import { fetchEventSource } from '@microsoft/fetch-event-source';

const confirm = useConfirm();
const router = useRouter()
const toast = useToast()
const apiUrl = import.meta.env.VITE_API_URL
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const store = useStore()
const storeId = computed(() => store.currentStore.id)
const storeName = computed({
    get: () => store.currentStore.name,
    set: (value: string) => store.setCurrentStore(storeId.value, value)
})

const newOrder = ref()
const acceptedOrders = ref([])


let controller;

const openSSE = async () => {
    console.log('vai')
    let id = storeId.value
    let url = `${apiUrl}/stores/${id}/orders/new`;

    controller = new AbortController();
    const signal = controller.signal;

    fetchEventSource(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'X-API-KEY': apiCredential,
        },
        signal: signal,
        async onopen(response) {
            if (response.ok) {
                console.log('connected!');
                return; // everything's good
            }
        },
        onmessage(msg) {
            if (msg.event === 'new-order') {
                let data = JSON.parse(msg.data)
                newOrder.value = data.order

            } else {
                console.log('nothing new here')
            }
        }


    });

}

const updateOrder = async (id, orderState) => {
    try {
        const url = `${apiUrl}/orders/${id}/update_state`;
        const body = {
            order: {
                state: orderState
            }
        }
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'X-API-KEY': `${apiCredential}`,
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            const data = await response.json();

            console.log(data)
        } else {
            const errorData = await response.json();

        }
    } catch (error: any) {
        console.log(error)
    }
}



const showNewOrder = (id) => {
    confirm.require({
        group: 'templating',
        header: 'Novo Pedido',
        message: `Pedido nº ${id}`,
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        rejectClass: 'p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Rejeitar',
        acceptLabel: 'Aceitar',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Aceito', detail: 'Pedido aceito', life: 3000 });
            acceptedOrders.value.push(newOrder)
            updateOrder(id, 'accepted')
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejeitado', detail: 'Pedido rejeitado', life: 3000 });
            updateOrder(id, 'rejected')
        }
    });
};


watch(newOrder, (newValue, oldValue) => {
    console.log(newValue)
    showNewOrder(newValue.id)

});

onMounted(() => {
    openSSE()
});


const removeAcceptedOrder = (index) => {
    acceptedOrders.value.splice(index, 1);
    }

</script>

<template>
    <div class="flex flex-col h-screen justify-center">
        <div class="text-center">
            <h1>Recebendo pedidos de <strong>{{ storeName }}</strong></h1>
            
        </div>
        <div v-for="(order,index) in acceptedOrders" :key="index">
            <div
                class=" pt-40 px-10 items-center w-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                <div
                    class=" cursor-pointer transition-transform duration-400 hover:scale-105 p-card px-4 py-5 flex justify-between items-center">
                    <div class="flex justify-between items-center">
                        <h2 class="font-bold text-black"> Pedido nº {{ order.value.id }}</h2>
                    </div>
                    <ButtonPrime @click="updateOrder(newOrder.id,'sended'); removeAcceptedOrder(index)">Saiu para Entrega</ButtonPrime>
                </div>
            </div>
        </div>

        <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex flex-col align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <div>
                        <h3 class="font-bold">{{ slotProps.message.message }}</h3>
                    </div>
                    <div v-for="items in newOrder.order_items" :key="items.id">
                        <a>{{ items.amount }} x {{ items.product.title }}</a>
                    </div>
                </div>
            </template>
        </ConfirmDialog>

    </div>

</template>

<style scoped></style>
