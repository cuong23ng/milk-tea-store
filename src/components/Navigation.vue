<template>
  <div class="navigation">
    <h2>Milk Tea Store</h2>
    <div @click.prevent="showMenu(shop)" class="shop" v-for="shop in shops" :key="shop.id">
      {{ shop.name }} 
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Navigation',
  props: {
    shops: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const showMenu = (selectedShop) => {
      store.commit('setCurrentShop', selectedShop)
    }

    return {
      showMenu,
      props
    }
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  height: 100%;
  width: 250px;
  flex-direction: column;
  background-color: rgb(34, 33, 80);
  color: rgb(240, 240, 240);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding-top: 20px;
  z-index: 200;
}

.shop {
  display: flex;
  font-size: 18px;
  height: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
}

@media (max-width: 1160px) {
  .navigation {
    opacity: 0.9;
    width: 100%;
    height: 40px;
    right: 0;
    flex-direction: row;
    padding-top: 0;
    padding-left: 20px;
  }

  .shop {
    font-size: 15px;
    padding: 0;
    margin-right: 20px;
  }
  
  h2 {
    margin-right: 20px;
    font-size: 15px;
  }
}

.shop:hover {
  transition: 0.1s;
  background-color: rgba(15, 99, 167, 0.2);
}

.shop:active {
  background-color: rgb(34, 33, 80);
}
</style>