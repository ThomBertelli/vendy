<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'
import { useToast } from 'primevue/usetoast';


const toast = useToast();
const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const confirmPassword = defineModel<string>('confirmPassword')


const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Seja bem-vindo(a)!', life: 3000 });
}

const showErrorToast = () => {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Email e/ou senha incorretos!', life: 3000 });
}


function onSubmit() {
    
    let auth = new Auth(remember.value)
    awaiting.value = true
    auth.signIn(email.value || ''

        , password.value || ''

        , () => {
            showSuccessToast()
            awaiting.value = false
            setTimeout(()=>{
                router.push('/')
            },3005)
            
        }, () => {
            showErrorToast()
            awaiting.value = false
        
        })
}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <h1>Sign Up</h1>

        <form class="flex flex-col gap-8 mt-10  " @submit.prevent="onSubmit">

            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="email" type="email" id="email" required/>
                <label for="email">E-mail</label>
            </FloatLabel>

            <FloatLabel>
                <PasswordInput class="w-full max-h-11" v-model="confirmPassword" inputId="confirm-password" toggleMask :feedback="false" required />
                <label for="confirm-password">Repetir Senha</label>
            </FloatLabel>

            <FloatLabel>
                <PasswordInput class="w-full max-h-11" v-model="password" inputId="password" toggleMask :feedback="false" required />
                <label for="password">Senha</label>
            </FloatLabel>
            
            <ToastPrime/>
            <div class="flex items-center justify-center gap-3">
                <label for="remember-me">Remember Me</label>
                <InputSwitch v-model="remember" inputId="remember-me" />
            </div>

            <ButtonPrime type="submit" label="Sign In" v-show="!awaiting" />
        </form>
    </div>
</template>

<style  scoped></style>