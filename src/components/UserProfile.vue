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
    <main>
        <template v-if="isLoggedIn">
            <h3>Hi, {{ currentUser && currentUser.email }}</h3>
            
            <nav>
                <a @click="signOut">Sign Out</a>
            </nav>
        </template>
        <template v-else>
            <h3>Please log in to have access</h3>
            <nav>
                <RouterLink :to="{ name: 'signin'}"> Sign In </RouterLink>
            </nav>
        </template>
    </main>
</template>

<style scoped></style>
