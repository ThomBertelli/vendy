<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import {computed} from 'vue'
import { useStore } from '../stores/useStore';

const toast = useToast();
const apiUrl = import.meta.env.VITE_API_URL;
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const store = useStore();
const storeId = computed(() => store.currentStore?.id);
const storeName = computed(() => store.currentStore.name);
const productTitle = defineModel<string>('productTitle')
const productPrice = defineModel<number>('productPrice')


const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado!', life: 3000 });
}

const showErrorToast = (errorMessage: string) => {
    toast.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 });
}

const onSubmit = async () => {
    const title = productTitle.value;
    const price = productPrice.value;
    const body = {
        product: {
            title: title,
            price: price,
            store_id: storeId.value
        }
    };
    try {
        const response = await fetch(`${apiUrl}/products`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        });
        if (response.status === 201) {
            showSuccessToast()
            productTitle.value = ''
            productPrice.value = 0
        } else {
            const errorData = await response.json();
            showErrorToast(errorData.message || 'Erro ao cadastrar a produto.');
            
        }
    } catch (error: any) {
        showErrorToast(error.message || 'Erro de rede ou servidor.');
    }
}




</script>

<template>
    <div class="flex flex-col items-center">
        <h1> Cadastrar um <strong>Produto</strong> na loja <strong>{{ storeName }}</strong></h1>
        <form class="flex flex-col gap-8 mt-10  " @submit.prevent="onSubmit">
            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="productTitle" type="text" id="productTitle"
                    required />
                <label for="productTitle">Produto</label>
            </FloatLabel>
            <FloatLabel>
                <InputNumber class="w-full max-h-11" size="small" v-model="productPrice" inputId="currency-brazil" mode="currency" currency="BRL" locale="pt-BR" id="productPrice"
                    required />
                <label for="productPrice">Preço</label>
            </FloatLabel>
            <ButtonPrime :disabled="!productTitle || !productPrice" type="submit" label="Criar" />
        </form>
        <ToastPrime />
    </div>
</template>

<style scoped></style>
