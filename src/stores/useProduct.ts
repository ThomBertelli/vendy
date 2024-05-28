import { defineStore } from 'pinia';

export const useProduct = defineStore('main', {
    state: () => ({
        currentProduct: {
            id: localStorage.getItem('currentProductId') || null,
            title: localStorage.getItem('currentProductTitle') || null,
            price: localStorage.getItem('currentProductPrice') || null
        },
    }),
    actions: {
        setCurrentStore(productId: string, productTitle: string, productPrice:string ) {
            this.currentProduct.id = productId
            this.currentProduct.title = productTitle
            this.currentProduct.price = productPrice
            
            localStorage.setItem('currentProductId', productId);
            localStorage.setItem('currentProductTitle', productTitle);
            localStorage.setItem('currentProductPrice', productPrice);

        },
    },
});