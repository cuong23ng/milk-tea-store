<template>
<div class="menu">
  <div class="title">{{ shop.name }} Menu</div>
  <div class="setting">
    <button class="filter">Filter</button>
    <div class="sort">
      <div>Sort By</div>
      <select class="sort-selection">
        <option>Name</option>
        <option>Price</option>
      </select>
    </div>
  </div>
  <div class="products-grid">
    <div v-for="product in products" :key="product.id">
      <!-- Product ID: {{ product.product }} -->
      <ProductCard :product="product" />
    </div>
  </div>
</div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import ProductCard from './ProductCard.vue';

export default {
  name: 'Menu',
  components: {
    ProductCard
  },
  props: {
    shop: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    console.log('Menu: ', props.shop);

    const store = useStore()

    store.dispatch('fetchProducts')
    const products = computed(() => store.getters.products)

    return {
      props,
      products
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  margin-left: 400px;
  margin-bottom: 100px;
  text-align: center;
}

.title {
  font-size: 45px;
  font-weight: 700;
}

.setting {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: rgb(34, 33, 80);
  font-weight: 700;
  margin: 45px 0;
}

.filter {
  border: none;
  border-radius: 5px;
  padding: 12px 43px;
  background-color: rgb(34, 33, 80);
  color: rgb(245, 245, 245);
  font-size: 16px
}

.sort {
  display: flex;
  align-items: center;
}

.sort-selection {
  border: 2px solid rgba(34, 33, 80, 0.5);
  border-radius: 5px;
  padding: 12px 35px;
  background-color: rgb(245, 245, 245);
  color: rgb(34, 33, 80);
  font-size: 16px;
  margin-left: 18px;
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 45px;
  column-gap: 40px;
}

@media (min-width: 899px) and (max-width: 1399px) {
  .products-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1400px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>