<script lang="ts" setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter()
const email = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const userId = ref('')

const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro atualizado!', life: 3000 });

}

const showErrorToast = (errorMessage: string) => {
    toast.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 });
}

const getUser = async () => {
    try {
        const response = await fetch(`${apiUrl}/me`, {
            headers: {
                'Accept': 'application/json',
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar usuário')
        }
        const data = await response.json()
        email.value = data.email
        userId.value = data.id

    } catch (error) {
        console.error('Erro ao buscar usuário:', error)
    }
}

const signOut = () => {
    authStore.signOut();
    localStorage.clear()
};


const onSubmit = async () => {

    const body = {
        user:{
            email: email.value,
            current_password: currentPassword.value,
            password: newPassword.value}
    }

    try {
        const response = await fetch(`${apiUrl}/user/${userId.value}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-KEY': `${apiCredential}`,
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            showSuccessToast()
            
            setTimeout(() => {
                signOut()
            }, 2005)
        } else {
            const errorData = await response.json()
            showErrorToast(errorData.message || 'Erro ao atualizar a usuário.')
        }
    } catch (error: any) {
        showErrorToast(error.message || 'Erro de rede ou servidor.')
    }
}

onMounted(() => { getUser() })

</script>

<template>
    <div class=" backimage flex flex-col justify-center items-center h-screen w-screen">

        <form class=" form-layout flex flex-col gap-8 mt-10  " @submit.prevent="onSubmit">
            <h1 class="text-white text-center">Edite seu <strong>Perfil</strong></h1>

            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="email" type="email" id="email" required />
                <label for="email">E-mail</label>
            </FloatLabel>

            <FloatLabel>
                <PasswordInput class="w-full max-h-11" v-model="currentPassword" inputId="current-password" toggleMask
                :feedback="false">

                </PasswordInput>
                <label for="current-password">Senha Atual</label>
            </FloatLabel>

            <FloatLabel>
                <PasswordInput class="w-full max-h-11" v-model="newPassword" inputId="new-password" toggleMask
                    :feedback="true" promptLabel="Escolha sua senha" weakLabel="Ruim" mediumLabel="Boa"
                    strongLabel="Ótima">

                    <template #footer>

                        <p>Sugestões:</p>
                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                            <li>No mínimo 6 caractéres</li>
                            <li>Pelo menos um número</li>
                            <li>Pelo menos uma letra maiúscula</li>
                            <li>Pelo menos uma letra minúscula</li>
                        </ul>
                    </template>
                </PasswordInput>
                <label for="new-password">Nova Senha</label>
            </FloatLabel>

            <ToastPrime class="bg-white" />

            <ButtonPrime type="submit" label="Atualizar" />
        </form>
    </div>
</template>

<style scoped>

</style>
