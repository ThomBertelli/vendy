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



</script>

<template>
    <div>
        <h1>Recebendo pedidos de <strong>{{ storeName }}</strong></h1>

    </div>
</template>

<style scoped>
    
</style>
