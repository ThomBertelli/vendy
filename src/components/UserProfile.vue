<script lang="ts" setup>
import { Auth } from '../auth'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())
const signOut = function () {
    auth.signOut(() => (isLoggedIn.value = auth.isLoggedIn()))
}
</script>

<template>
    <div class="flex flex-col ">
        <template v-if="isLoggedIn">
            <div class="flex flex-col items-center gap-2">
                <div>
                    <h3>Olá, {{ currentUser && currentUser.email }}</h3>     
                </div>
                <div class="flex gap-2">
                    <nav>
                        <ButtonPrime @click="signOut">Sair</ButtonPrime>
                    </nav>
                    <nav>
                        <ButtonPrime  >
                            <RouterLink :to="{name: 'stores'}"> Lojas</RouterLink>
                        </ButtonPrime>
                    </nav>
                </div>
            </div>
        </template>
        <template  v-else>
            <div class="flex gap-3">
                <nav>
                    <ButtonPrime class="custom-button">
                        <RouterLink :to="{ name: 'signin'}"> Entrar </RouterLink>
                    </ButtonPrime>
                </nav>
                <nav>
                    <ButtonPrime>
                        <RouterLink :to="{name: 'signup'}"> Cadastrar </RouterLink>
                    </ButtonPrime>
                </nav>
            </div>
        </template>
    </div>
</template>

<style scoped>
    .custom-button{
        background-color: white;
        color: #f59e0b ;
        border: solid #f59e0b 1px;
    }

    .custom-buttom :hover{
        color: #d97706;
        border: #d97706;
    }
    


</style>
