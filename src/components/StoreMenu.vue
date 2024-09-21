<template>
<div class="menu">
  <div class="title">{{ shop.name }} Menu</div>
  <div class="setting">
    <button class="filter-button">Filter</button>
    <div class="sort">
      <img v-if="sortType" @click.prevent="changeDirection" class="asc-dsc" src="../assets/sort.png"/>
      <div>Sort By</div>
      <select class="sort-selection" v-model="sortType">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  </div>
  <div v-if="!sortType" class="products-grid">
    <div v-for="product in products" :key="product.id">
      <!-- Product ID: {{ product.product }} -->
      <ProductCard :product="product" />
    </div>
  </div>
  <div v-else class="products-grid">
    <div v-for="product in sortedProducts" :key="product.id">
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
    // console.log('Menu: ', props.shop);

    const store = useStore()
    store.dispatch('fetchProducts')

    const sortType = ref()
    const direction = ref(0)
    const products = computed(() => store.getters.products)
    const sortedProducts = computed(() => {
      const sorted = [...products.value]
      if (sortType.value === 'name') {
        if (!direction.value) {
          return sorted.sort((a, b) => a.name.localeCompare(b.name))
        }
        else {
          return sorted.sort((a, b) => b.name.localeCompare(a.name))
        }
      }
      else if (sortType.value === 'price') {
        if (!direction.value) {
          return sorted.sort((a, b) => a.price - b.price)
        }
        else {
          return sorted.sort((a, b) => b.price - a.price)
        }
      }
    })

    const changeDirection = () => {
      direction.value = !direction.value
    }

    return {
      props,
      products,
      sortedProducts,
      sortType,
      changeDirection
    }
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
  transition: 0.5s ease all
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

.filter-button {
  border: none;
  border-radius: 5px;
  padding: 12px 43px;
  background-color: rgb(34, 33, 80);
  color: rgb(245, 245, 245);
  font-size: 16px;
  cursor: pointer;
}

.sort {
  display: flex;
  align-items: center;
}

.asc-dsc {
  width: 12px;
  margin-right: 5px;
  opacity: 0.3;
  cursor: pointer;
  transition: 0.15s;
}
.asc-dsc:hover {
  opacity: 0.6;
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
  transition: 0.5s ease all
}

@media (min-width: 360px) and (max-width: 767px) {
  .products-grid {
    grid-template-columns: 1fr 1fr;
    column-gap: 10%;
  }
  .menu {
    margin-left: 70px;
  }
}

@media (min-width: 768px) and (max-width: 879px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 4%;
  }
  .menu {
    margin-left: 40px;
  }
}

@media (min-width: 890px) and (max-width: 999px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 6%;
  }
  .menu {
    margin-left: 50px;
  }
}

@media (min-width: 1000px) and (max-width: 1099px) {
  .menu {
    margin-left: 50px;
  }
}

@media (min-width: 1100px) and (max-width: 1159px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 3%;
  }
  .menu {
    margin-left: 100px;
  }
}

@media (min-width: 1160px) and (max-width: 1200px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 6%;
  }
  .menu {
    margin-left: 300px;
  }
}

@media (min-width: 1200px) and (max-width: 1249px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 8%;
  }
  .menu {
    margin-left: 330px;
  }
}

@media (min-width: 1250px) and (max-width: 1379px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 4%;
  }
  .menu {
    margin-left: 330px;
  }
}

@media (min-width: 1380px) and (max-width: 1459px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 5%;
  }
  .menu {
    margin-left: 300px;
  }
}

@media (min-width: 1460px) {
  .products-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>