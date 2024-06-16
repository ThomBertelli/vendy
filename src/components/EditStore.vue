<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import ButtonPrime from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { useStore } from '../stores/useStore'
import { useRouter } from 'vue-router'

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

const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja atualizada!', life: 3000 })
}

const showErrorToast = (errorMessage: string) => {
    toast.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 })
}

const updateStore = async (event: Event) => {
    event.preventDefault()
    const name = storeName.value
    const id = storeId.value
    const body = { 
        store: {
            name: name
        }
    }
    try {
        const response = await fetch(`${apiUrl}/stores/${id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-API-KEY': `${apiCredential}`,
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            showSuccessToast()
            setTimeout(() => {
                router.push('/stores')
            }, 3005)
        } else {
            const errorData = await response.json()
            showErrorToast(errorData.message || 'Erro ao atualizar a loja.')
        }
    } catch (error: any) {
        showErrorToast(error.message || 'Erro de rede ou servidor.')
    }
}


</script>

<template>
    <div class="flex flex-col items-center">
        <h1>Editar Loja</h1>
        <form class="flex flex-col gap-8 mt-10" @submit.prevent="updateStore">
            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="storeName" type="text" id="store-name"
                    required />
                <label for="store-name">Nome da Loja</label>
            </FloatLabel>
            <ButtonPrime type="submit" label="Atualizar" />
        </form>
        <ToastPrime />
    </div>
</template>

<style scoped></style>
