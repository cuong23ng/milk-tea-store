<template>
  <div v-if="productDetail" class="product-card">
    <div>
      <div class="product-id">MT-0{{ productDetail.id }}</div>
      <h4 class="product-name">{{ productDetail.name }}</h4>
      <hr>
    </div>
    <div class="topping">
      <h5 class="topping-title">Toppings:</h5>
      <div class="topping-items">{{ productDetail.toppings }}</div>
    </div>
    <div class="outline">
      <div class="trending-box">Trending</div>
      <div class="price">&#36;{{ productDetail.price }}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const productDetail = ref()
    onMounted(async () => {
      try {
        const res = await fetch('/products.json')
        if (!res.ok) {
          throw new Error ('Failed to fetch products data')
        }
        const data = await res.json()
        productDetail.value = data.products.find((product) => product.id === props.product.product)
        console.log(productDetail.value)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      productDetail
    }
  }
}
</script>

<style>
.product-card {
  display: flex;
  flex-direction: column;
  color: rgb(34, 33, 80);
  text-align: left;
  border: 1 solid gray;
  box-shadow: 1px 0px 7px rgba(185, 185, 185, 0.9);
  background-color: white;
  border-radius: 5px;
  width: 170px;
  height: 215px;
  padding: 20px 18px;
  cursor: pointer;
  transition: 0.2s ease all;
}
.product-card:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 6px -4px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.product-header {
  flex: 6;
}

.product-id {
  font-size: 17px;
}

.product-name {
  margin-top: 8px;
  margin-bottom: 15px;
  font-size: 18px;
}

.topping-title {
  margin-top: 18px;
  margin-bottom: 10px;
  font-size: 16px;
}

.topping {
  flex: 6;
}

.topping-items {
  font-size: 16px;
}

.outline {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trending-box {
  background-color: rgb(34, 33, 80);
  color: rgb(235, 235, 235);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
}

.price {
  font-size: 20px;
  font-weight: 700;
}
</style>