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
    <div class="flex flex-col">
        <template v-if="isLoggedIn">
            <div class="flex flex-col items-center gap-2">
                <h3>Olá, {{ currentUser && currentUser.email }}</h3>     
                <nav>
                    <ButtonPrime @click="signOut">Sign Out</ButtonPrime>
                </nav>
            </div>
        </template>
        <template  v-else>
            <div class="flex gap-3">
                <nav>
                    <ButtonPrime>
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



</style>
