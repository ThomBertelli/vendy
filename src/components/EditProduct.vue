<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import ButtonPrime from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { computed } from 'vue';
import { useProduct } from '../stores/useProduct';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const apiUrl = import.meta.env.VITE_API_URL;
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const product = useProduct();
const productId = computed(() => product.currentProduct.id);
const productTitle = computed({
    get: () => product.currentProduct.title,
    set: (value: string) => product.setCurrentProduct(productId.value, value,productPrice.value)
});
const productPrice = computed({
    get: () => product.currentProduct.price,
    set: (value: string) => product.setCurrentProduct(productId.value,productTitle.value, value)
});

console.log(productPrice.value)

const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto atualizado!', life: 3000 });
}

const showErrorToast = (errorMessage: string) => {
    toast.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 });
}



const updateProduct = async (event: Event) => {
    event.preventDefault();
    const title = productTitle.value;
    const id = productId.value
    const price = productPrice.value
    let priceNoMoney = price.replace("R$", "").replace(",", ".")
    let priceNumber = parseFloat(priceNoMoney)
    const body = {
        product: {
            title: title,
            price: priceNumber
        }
    };
    try {
        const response = await fetch(`${apiUrl}/products/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            showSuccessToast()
            setTimeout(() => {
                router.push('/products')
            }, 3005)

        } else {
            const errorData = await response.json();
            showErrorToast(errorData.message || 'Erro ao atualizar o produto.');

        }
    } catch (error: any) {
        showErrorToast(error.message || 'Erro de rede ou servidor.');
    }

}


</script>

<template>
    <div class="flex flex-col items-center">
        <h1>Editar Produto</h1>
        <form class="flex flex-col gap-8 mt-10" @submit.prevent="updateProduct">
            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="productTitle" type="text" id="productTitle"
                    required />
                <label for="productTitle">Produto</label>
            </FloatLabel>
            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="productPrice" id="productPrice"
                    required />
                <label for="productPrice">Preço</label>
            </FloatLabel>
            <ButtonPrime type="submit" label="Atualizar" />
        </form>
        <ToastPrime />
    </div>
</template>

<style scoped></style>
