<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '../stores/useStore';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();
const storesList = ref([])
const storePinia = useStore();
const visible = ref(false);
const idStoreLogo = ref()
const confirm = useConfirm();
const toast = useToast();
const totalPages = ref()
const pageNumber = ref(1)


const fetchStores = async () => {
    try {
        const response = await fetch(`${apiUrl}/stores?page=${pageNumber.value}`, {
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
        console.log(data)
        for(let store of data.result.stores){
            if(!storesList.value.includes(store)){
                storesList.value.push(store)
            }

        }


    } catch (error) {
        console.error('Erro ao buscar lojas:', error)
    }
}

onMounted(() => { fetchStores(),console.log(storesList) })

const redirectToProducts = (id: string, storeName: string) => {
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

const toggleActive = async (id: number) => {
    try {
        const url = `${apiUrl}/stores/${id}/toggle_active`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'X-API-KEY': `${apiCredential}`,
            },
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
};

const setIdStoreLogo = (id)=>{
    idStoreLogo.value = id
}

const uploadLogo = async (event) => {
    const file = event.files[0]
    const formData = new FormData()
    formData.append('store[logo]', file)
    

    try {
        const response = await fetch(`${apiUrl}/stores/${idStoreLogo.value}/upload_logo`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'X-API-KEY': `${apiCredential}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar a imagem')
        }

        const data = await response.json()
        console.log('Imagem enviada com sucesso', data)
    } catch (error) {
        console.error('Erro ao enviar a imagem', error)
    }
    storesList.value = []
    pageNumber.value = 1
    fetchStores()
}

const deleteStore = async (storeId: number) => {
    
    try {
        const response = await fetch(`${apiUrl}/stores/${storeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'X-API-KEY': `${apiCredential}`,
            }
        
        });
        const data = await response.json()
        console.log('Deletada', data)
    } catch (error) {
        console.error('Erro ao deletar', error)
    }
    storesList.value = []
    pageNumber.value = 1
    fetchStores()
}

const deleteConfirmation = (storeId:number) => {
    confirm.require({
        message: 'Você tem certeza ?',
        header: 'Cuidado!!!',
        icon: 'pi pi-exclamation-circle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Deletar',
        rejectClass: 'p-button-contrast p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmado!', detail: 'Registro Deletado', life: 3000 });
            deleteStore(storeId)
        },
        reject: () => {
            // toast.add({ severity: 'error', summary: 'Cancelado!', detail: '', life: 3000 });
        }
    });
};

const takeOrders = (storeId, storeName) =>{
    storePinia.setCurrentStore(storeId, storeName);
    router.push({ name: 'take-order' });
}

const ordersHistory = (storeId, storeName) =>{
    storePinia.setCurrentStore(storeId,storeName);
    router.push({ name: 'orders-history' });
}

const showMore = () =>{
    pageNumber.value++
    fetchStores()
}

</script>

<template>
    <div class="py-40 ">
        <h1 class="mt-10 text-center"> Administre as suas <strong>Lojas</strong></h1>

        <div class="fixed bottom-20 right-20">
            <RouterLink :to="{ name: 'new-store' }">
                <ButtonPrime>Criar Loja</ButtonPrime>
            </RouterLink>
        </div>

        <DialogPrime v-model:visible="visible" modal header="Editar Logo"  :style="{ width: '25rem' }">

            <div>
                <FileUpload chooseLabel="Selecionar " mode="basic" @uploader="uploadLogo($event)" accept="image/*" :maxFileSize="2000000" :multiple="false" name="logo[]" :customUpload="true" />
            </div>

        </DialogPrime>


        <div class="mt-10">
            <div class="flex flex-col gap-4 ">
                <div v-for="store in storesList" :key="store.id"
                    class="items-center pt-2 pb-2 pl-6 pr-6 flex gap-5 rounded-md border border-indigo-500 ">
                    <div @click="visible=true, setIdStoreLogo(store.id)" v-if="store.logo_url" class="cursor-pointer"  v-tooltip="'Mudar Logo'">
                        <img class="logo-image"  :src="store.logo_url" alt="">

                    </div>
                    <div v-else @click="visible=true, setIdStoreLogo(store.id)" v-tooltip="'Add logo'" class="flex flex-col cursor-pointer heartbeat items-center text-green-600  ">
                        <i class="pi pi-image text-2xl"></i>
                        
                    </div>

                    <h3 class="store-name text-center flex-1 text-xl text-indigo-700"
                        @click="redirectToProducts(store.id, store.name)"
                        v-tooltip="'Ver produtos'">
                        {{ store.name }}
                    </h3>
                    <div class="flex items-center text-indigo-700 gap-2">
                        <label class="text-center" for="toogle-active"> {{ store.active ? 'Desativar' : 'Ativar' }}</label>
                        <InputSwitch class="swith" @change="toggleActive(store.id)" v-model="store.active"
                            inputId="toogle-active" />
                    </div>
                    
                    <div class="flex gap-4">
                        <i @click="handleEditStore(store.id, store.name)"
                            class="pi pi-pen-to-square heartbeat cursor-pointer text-blue-500"
                            style="font-size: 1.5rem" 
                            v-tooltip="'Editar'"></i>
                        <i @click="deleteConfirmation(store.id)" class="pi pi-trash heartbeat cursor-pointer text-red-500" style="font-size: 1.5rem"  v-tooltip="'Excluir'"></i>
                        <i @click="ordersHistory(store.id, store.name)" class="pi pi-history heartbeat cursor-pointer" style="font-size: 1.5rem"  v-tooltip="'Histórico'"></i>
                        <i @click="takeOrders(store.id, store.name)" class="pi pi-receipt heartbeat cursor-pointer text-amber-500" v-tooltip="'Receber Pedidos'" style="font-size: 1.5rem"></i>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="pageNumber < totalPages" class="mt-10" >
            <ButtonPrime outlined @click="showMore">Mostrar mais</ButtonPrime>
        </div>
        <ToastPrime></ToastPrime>
        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<style scoped>
.store-name:hover {
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

.logo-image{
    width: 2em;
}

.swith{
    max-width: 48px;
    max-height: 25px;
}
</style>
