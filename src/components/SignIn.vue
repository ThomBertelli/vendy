<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'

import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';

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
    <div class="flex flex-col justify-center items-center h-screen">
        <h1>Sign In</h1>

        <form class="flex flex-col gap-8 mt-10" @submit.prevent="onSubmit">

            <FloatLabel>
                <InputText v-model="email" type="email" id="email" inputType="email"/>
                <label for="email">E-mail</label>
            </FloatLabel>
            


            <FloatLabel>
                <Password v-model="password" inputId="password" toggleMask :feedback="false" />
                <label for="password">Senha</label>
            </FloatLabel>
            
            <Toast/>
            <div class="flex items-center justify-center gap-3">
                <label for="remember-me">Remember Me</label>
                <InputSwitch v-model="remember" inputId="remember-me" />
            </div>

            <Button @click="onSubmit"  label="Sign In" v-show="!awaiting"/>
        </form>
    </div>
</template>

<style  scoped></style>
