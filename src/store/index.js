import { createStore } from 'vuex'

export default createStore({
  state: {
    shop: null,
    products: [],
    filterItems: [],
  },
  getters: {
    currentShop: (state) => state.shop,
    products: (state) => state.products,
    filterItems: (state) => state.filterItems
  },
  mutations: {
    setCurrentShop(state, payload) {
      state.shop = payload
      // console.log(state.shop)
    },
    setProducts(state, payload) {
      state.products = payload
      // console.log('Product: ', state.products)
    },
    setFilterItems(state, payload) {
      state.filterItems = payload
    }
  },
  actions: {
    async fetchProducts({ commit, state }) {
      try {
        const res = await fetch('/storeProducts.json')
        const res2 = await fetch('/products.json')
        if (!res.ok || !res2.ok) {
          throw new Error('Failed to fetch data to storeProducts.json')
        }
        const data = await res.json()
        const data2 = await res2.json()
        
        const productsId = data.shopProducts.filter(product => product.shop === state.shop.id).map(product => product.product)

        const products = data2.products.filter(product => productsId.includes(product.id))
        
        commit('setProducts', products)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchFilterItems({ commit, state }) {
      try {
        const res = await fetch('/products.json')
        if (!res.ok) {
          throw new Error('Failed to fetch data to products.json')
        }
        const data = await res.json()
        const filterItems = new Set()
        data.products.forEach(product => {
          const items = product.toppings.split(', ');
          items.forEach(item => {
            filterItems.add(item.toLowerCase())
          })
        })
        commit('setFilterItems',filterItems)
        // console.log('Filter: ', state.filterItems)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
