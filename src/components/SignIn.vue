<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter()
const awaiting = ref(false)
const authStore = useAuthStore();
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const remember = defineModel<boolean>('remember', { default: true })

const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Seja bem-vindo(a)!', life: 3000 });
}

const showErrorToast = (errorMessage: string) => {
    toast.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 });
}

const onSubmit = async () => {
    try {
        await authStore.signIn(email.value || '', password.value || '', remember.value, () => {
            showSuccessToast();
            setTimeout(() => {
                router.push('/stores')
            }, 3005)
        }, () => {
            showErrorToast('Email e/ou senha incorretos!');
        });
    } catch (error:any) {
        showErrorToast(error.message);
    }
};


// function onSubmit() {

//     let auth = new Auth(remember.value)
//     awaiting.value = true
//     auth.signIn(email.value || ''

//         , password.value || ''

//         , () => {
//             showSuccessToast()
//             awaiting.value = false
//             setTimeout(() => {
//                 router.push('/')
//             }, 3005)

//         }, () => {
//             showErrorToast()
//             awaiting.value = false

//         })
// }
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <h1>Faça seu <strong>Login</strong></h1>

        <form class="flex flex-col gap-8 mt-10  " @submit.prevent="onSubmit">

            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="email" type="email" id="email" required />
                <label for="email">E-mail</label>
            </FloatLabel>

            <FloatLabel>
                <PasswordInput class="w-full max-h-11" v-model="password" inputId="password" toggleMask
                    :feedback="false" required />
                <label for="password">Senha</label>
            </FloatLabel>

            <ToastPrime />
            <div class="flex items-center justify-center gap-3">
                <label for="remember-me">Lembrar de mim</label>
                <InputSwitch v-model="remember" inputId="remember-me" />
            </div>

            <ButtonPrime type="submit" label="Entrar" v-show="!awaiting" />
        </form>
    </div>
</template>

<style scoped></style>
