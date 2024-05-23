<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { Auth } from '../auth'
import { useToast } from 'primevue/usetoast';
import Divider from 'primevue/divider';


const toast = useToast();
const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const confirmPassword = defineModel<string>('confirmPassword')
const passwordMatch = ref(false)

watch([password, confirmPassword], () => {
    passwordMatch.value = password.value === confirmPassword.value;
});


const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Seja bem-vindo(a)!', life: 3000 });
}

const showErrorToast = () => {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Email e/ou senha incorretos!', life: 3000 });
}


function onSubmit() {

    let auth = new Auth()
    awaiting.value = true

    auth.signUp(email.value || ''

        , password.value || ''

        , () => {
            showSuccessToast()
            awaiting.value = false
            setTimeout(() => {
                router.push('/')
            }, 3005)

        }, () => {
            showErrorToast()
            awaiting.value = false

        })
}
</script>

<template>
    <div class="flex flex-col items-center">
        <h1>Cadastrar</h1>

        <form class="flex flex-col gap-8 mt-10  " @submit.prevent="onSubmit">

            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="email" type="email" id="email" required />
                <label for="email">E-mail</label>
            </FloatLabel>


            <FloatLabel>
                <PasswordInput 
                    class="w-full max-h-11" 
                    v-model="password" 
                    inputId="password" 
                    toggleMask
                    :feedback="true"
                    required promptLabel="Escolha sua senha" 
                    weakLabel="Ruim" 
                    mediumLabel="Boa" 
                    strongLabel="Ótima"
                >

                    <template #footer>
                        <Divider />
                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                            <li>Teve ter uma letra minúscula</li>
                            <li>Teve ter uma letra maiúscula</li>
                            <li>Teve ter um número</li>
                            <li>No mínimo 8 caractéres</li>
                        </ul>
                    </template>
                </PasswordInput>
                <label for="password">Senha</label>
            </FloatLabel>

            <FloatLabel>
                <PasswordInput 
                    class="w-full max-h-11" 
                    v-model="confirmPassword" 
                    inputId="confirm-password"
                    toggleMask 
                    required 
                    :feedback="false"
                >
                
                </PasswordInput>
                <label for="confirm-password">Confirmar Senha</label>
                <small id="confirm-password-help" class="block mt-1 text-red-500 text-sm" v-if="confirmPassword && !passwordMatch">
                Deve coincidir com a senha
                </small>
            </FloatLabel>
            

            <ToastPrime />

            <ButtonPrime :disabled="!passwordMatch" type="submit" label="Sign Up" v-show="!awaiting" />
        </form>
    </div>
</template>

<style scoped></style>