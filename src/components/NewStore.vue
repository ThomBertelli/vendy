<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const storeName = defineModel<string>('storeName')
const apiUrl = import.meta.env.VITE_API_URL;
const apiCredential = import.meta.env.VITE_API_CREDENTIAL


const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado!', life: 3000 });
}

const showErrorToast = (errorMessage: string) => {
    toast.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 });
}

const onSubmit = async (event: Event) => {
    event.preventDefault();
    const name = storeName.value;
    const body = {
        store: {
            name: name,

        }
    };
    try {
        const response = await fetch(`${apiUrl}/stores`, {
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
            console.log("CRIADO")
            showSuccessToast()
            storeName.value = ''
        } else {
            const errorData = await response.json();
            showErrorToast(errorData.message || 'Erro ao criar a loja.');
            storeName.value = ''
        }
    } catch (error: any) {
        showErrorToast(error.message || 'Erro de rede ou servidor.');
    }
}




</script>

<template>
    <div class="flex flex-col items-center">
        <h1> Crie uma <strong>Nova Loja</strong></h1>
        <form class="flex flex-col gap-8 mt-10  " @submit="onSubmit">
            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="storeName" type="text" id="storeName"
                    required />
                <label for="storeName">Nome da Loja</label>
            </FloatLabel>
            <ButtonPrime :disabled="!storeName" type="submit" label="Criar" />
        </form>
        <ToastPrime />
    </div>
</template>

<style scoped></style>
