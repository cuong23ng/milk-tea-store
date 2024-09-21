<template>
  <div class="home">
    <Navigation :shops="shops"/>
    <StoreMenu v-if="currentShop" class="menu" :key="renderKey" :shop="currentShop"/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import StoreMenu from '@/components/StoreMenu.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    Navigation,
    StoreMenu
  },
  setup() {
    const store = useStore()
    const shops = ref([])
    onMounted(async () => {
      try {
        const response = await fetch('/stores.json')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        shops.value = data.stores
        // console.log('HomeView: ', shops.value)
      } catch (error) {
        console.error(error);
      }
    })

    const renderKey = ref(0);

    watch(() => store.state.shop, (newShop, oldShop) => {
      console.log(`Shop changed from ${oldShop?.name || 'none'} to ${newShop?.name || 'none'}`);
      renderKey.value += 1;
    });

    return {
      shops,
      currentShop: computed(() => store.getters.currentShop),
      renderKey
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
}

.menu {
  
}
</style>
