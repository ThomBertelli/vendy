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
    <div></div>
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
