import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        currentStore: {
            id: '',
            name: ''
        }
    }),
    actions: {
        setCurrentStore(id: string, name: string) {
            this.currentStore.id = id;
            this.currentStore.name = name;
        }
    }
});