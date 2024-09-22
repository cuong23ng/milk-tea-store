<template>
<div class="menu">
  <div class="title">{{ shop.name }} Menu</div>

  <div class="setting">
    <button @click="showFilterTable" class="filter-button">Filter</button>
    <div class="sort">
      <img v-if="sortType" @click="changeDirection" class="asc-dsc" src="../assets/sort.png"/>
      <div>Sort By</div>
      <select class="sort-selection" v-model="sortType">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  </div>

  <div v-if="filter" class="filter-table">
    <div class="filter-table-title">Toppings:</div>
    <div class="filter-table-grid">
      <div v-for="(item, index) in filterItems" :key="index">
          <label class="container">{{ item }}
            <input type="checkbox" :value="item" v-model="checkedItems"/>
            <span class="checkmark"></span>
          </label>
      </div>
    </div>
  </div>

  <div v-if="checkedItems[0]" class="products-grid">
    <div v-for="product in filterProducts" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
  <div v-else-if="sortType" class="products-grid">
    <div v-for="product in sortedProducts" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
  <div v-else class="products-grid">
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
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
    const filter = ref(0)
    
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

    const checkedItems = ref([])
    const filterProducts = ref([])
    watch(checkedItems, () => {
      // console.log('ticked: ', checkedItems.value)
      filterProducts.value = products.value.filter(product => {
        for(let i in checkedItems.value) {
          const item = checkedItems.value[i]
          if (!product.toppings.toLowerCase().includes(item)) {
            return false
          }
        }
        return true
      })
      console.log('filter: ', filterProducts.value)
    })

    const changeDirection = () => {
      direction.value = !direction.value
    }

    const showFilterTable = () => {
      filter.value = !filter.value
    }

    return {
      props,
      products,
      sortedProducts,
      sortType,
      changeDirection,
      filterItems: store.getters.filterItems,
      filter,
      showFilterTable,
      checkedItems,
      filterProducts
    }
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  margin-left: 400px;
  text-align: center;
  transition: 0.5s ease all;
  min-width: 62%;
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
  margin-bottom: 30px;
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

.filter-table {
  background-color: white;
  font-size: 20px;
  min-height: 110px;
  text-align: left;
  padding: 30px 40px;
  margin-bottom: 45px;
}

.filter-table-title {
  font-weight: 700;
  color: black;
  margin-bottom: 20px;
}

.filter-table-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 25px;
  column-gap: 120px;
}

/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 33px;
  cursor: pointer;
  align-items: center;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  border: 2px solid rgba(34, 33, 80, 0.8);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: white;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 2px;
	left: 2px;
	bottom: 2px;
  right: 2px;
	background: rgb(34, 33, 80);
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