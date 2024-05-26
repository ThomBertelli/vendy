import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        currentStore: {
            id: localStorage.getItem('currentStoreId') || null,
            name: localStorage.getItem('currentStoreName') || null,
        },
    }),
    actions: {
        setCurrentStore(storeId: string, storeName: string,) {
            this.currentStore.id = storeId
            this.currentStore.name = storeName
            localStorage.setItem('currentStoreId', storeId);
            localStorage.setItem('currentStoreName', storeName);
        },
    },
});