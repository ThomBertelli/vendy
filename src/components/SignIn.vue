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
const remember = defineModel<boolean>('remember', { default: true })

const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Seja bem-vindo(a)!', life: 3000 });
}

const showErrorToast = () => {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Email e/ou senha incorretos!', life: 3000 });
}


function onSubmit(form: Event) {
    
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
            console.log('não foi dessa vez!')
        })
}
</script>

<template>
    <div>
        <h1>Sign In</h1>

        <form @submit.prevent="onSubmit">
            <label>E-Mail: </label>
            <input v-model="email" type="email" /><br />

            <label>Senha: </label>
            <input v-model="password" type="password" /><br />

            <label>Remember Me: </label>
            <input v-model="remember" type="checkbox" /><br />
            <Toast/>

            <button type="submit" v-show="!awaiting">Sign In</button>
        </form>
    </div>
</template>

<style lang="postcss" scoped></style>
