<template>
  <div v-if="product" class="product-card">
    <div>
      <div class="product-id">MT-0{{ product.id }}</div>
      <h4 class="product-name">{{ product.name }}</h4>
      <hr>
    </div>
    <div class="topping">
      <h5 class="topping-title">Toppings:</h5>
      <div class="topping-items">{{ product.toppings }}</div>
    </div>
    <div class="outline">
      <div class="trending-box">Trending</div>
      <div class="price">&#36;{{ product.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
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

@media (min-width: 360px) and (max-width: 767px) {
  .product-card {
    width: 200px;
    height: 252px;
  }
}

@media (min-width: 768px) and (max-width: 879px) {
  .product-card {
    width: 170px;
    height: 215px;
  }
}

@media (min-width: 890px) and (max-width: 999px) {
  .product-card {
    width: 200px;
    height: 252px;
  }
}

@media (min-width: 1000px) and (max-width: 1160px) {
  .product-card {
    width: 170px;
    height: 215px;
  }
}

@media (min-width: 1160px) and (max-width: 1249px) {
  .product-card {
    width: 200px;
    height: 252px;
  }
}

@media (min-width: 1250px) and (max-width: 1379px) {
  .product-card {
    width: 220px;
    height: 278px;
  }
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