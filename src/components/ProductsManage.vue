<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from '../stores/useStore';
import ProgressSpinner from 'primevue/progressspinner';
import { useProduct } from '../stores/useProduct';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const router = useRouter()
const store = useStore();
const storeId = computed(() => store.currentStore.id);
const storeName = computed(() => store.currentStore.name);
const productPinia = useProduct();
const apiUrl = import.meta.env.VITE_API_URL;
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const productsList = ref();
const productId = ref()
const loading = ref(false);
const visible = ref(false);
const confirm = useConfirm();
const toast = useToast();


const fetchProducts = async () => {
    loading.value = true;


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
        loading.value = false
        const data = await response.json()

        productsList.value = data.result.products

    } catch (error) {
        console.error('Erro ao buscar produtos:', error)
    }
}

onMounted(() => {
    fetchProducts()
    console.log(productsList)
})


const handleEditProduct = (id: string, title: string, price: string) => {
    productPinia.setCurrentProduct(id, title, price);
    router.push({ name: 'edit-product' });
};


const toggleActive = async (id: number) => {
    try {
        const url = `${apiUrl}/products/${id}/toggle_active`;
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

const setIdProduct = (id) =>{
    productId.value = id
}

const uploadProductImage = async (event) => {
    const file = event.files[0]
    const formData = new FormData()
    formData.append('product[image]', file)


    try {
        const response = await fetch(`${apiUrl}/products/${productId.value}/upload_image`, {
            method: 'PATCH',
            headers: {
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
    fetchProducts()
}

const deleteProduct = async (productId: number) => {
    
    try {
        const response = await fetch(`${apiUrl}/products/${productId}`, {
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
    fetchProducts()
}

const deleteConfirmation = (storeId:number) => {
    confirm.require({
        message: 'Você tem certeza?',
        header: 'Cuidado!!!',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Deletar',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmado!', detail: 'Registro Deletado', life: 3000 });
            deleteProduct(storeId)
        },
        reject: () => {
            // toast.add({ severity: 'error', summary: 'Cancelado!', detail: '', life: 3000 });
        }
    });
};

</script>

<template>
    <div>
        <h1 class="mt-10 text-center">Produtos da loja <strong>{{ storeName }}</strong></h1>
        <ProgressSpinner v-if="loading"></ProgressSpinner>
        <div class="mt-10">
            <div class="flex flex-col items-center">

                <DialogPrime v-model:visible="visible" modal header="Editar Imagem" :style="{ width: '25rem' }">
                    <div>
                        <FileUpload chooseLabel="Selecionar " mode="basic" @uploader="uploadProductImage($event)"
                            accept="image/*" :maxFileSize="1000000" :multiple="false" name="image[]"
                            :customUpload="true" />
                    </div>
                </DialogPrime>

                <ul class="flex flex-col gap-2 ">
                    <li v-for="product in productsList" :key="product.id"
                        class="items-center pt-2 pb-2 pl-6 pr-6 flex gap-11 rounded-md border border-amber-600 ">
                        <div @click="visible = true, setIdProduct(product.id)" v-if="product.image_url"
                            class="cursor-pointer" v-tooltip="'Mudar imagem'">
                            <img class="image" :src="product.image_url" alt="">

                        </div>
                        <div v-else @click="visible = true, setIdProduct(product.id)" v-tooltip="'Add imagem'"
                            class="flex flex-col cursor-pointer heartbeat items-center text-green-600  ">
                            <i class="pi pi-image text-2xl"></i>

                        </div>


                        <h3 class="flex-1 text-xl text-amber-600">
                            {{ product.title }}
                        </h3>
                        <h3 class="text-xl text-amber-600">
                            {{ product.price }}
                        </h3>
                        <div class="flex text-center text-amber-600 gap-2">
                            <label for="toogle-active"> {{ product.active ? 'Desativar' : 'Ativar' }}</label>
                            <InputSwitch class="swith" @change="toggleActive(product.id)" v-model="product.active"
                                inputId="toogle-active" />
                        </div>
                        <div class="flex gap-4">
                            <i @click="handleEditProduct(product.id, product.title, product.price)"
                                class="pi pi-pen-to-square heartbeat cursor-pointer text-blue-500"
                                style="font-size: 1.5rem"
                                v-tooltip="'Editar'"></i>
                            <i @click="deleteConfirmation(product.id)" class="pi pi-trash heartbeat cursor-pointer text-red-500" style="font-size: 1.5rem" v-tooltip="'Excluir'"></i>
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
        <ToastPrime></ToastPrime>
        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<style scoped>

.image{
    width: 2em;
}

.swith{
    max-width: 48px;
    max-height: 25px;
}

</style>
