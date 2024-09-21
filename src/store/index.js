import { createStore } from 'vuex'

export default createStore({
  state: {
    shop: null,
    products: []
  },
  getters: {
    currentShop: (state) => state.shop,
    products: (state) => state.products
  },
  mutations: {
    setCurrentShop(state, payload) {
      state.shop = payload
      // console.log(state.shop)
    },
    setProducts(state, payload) {
      state.products = payload
      // console.log('Product: ', state.products)
    }
  },
  actions: {
    async fetchProducts({ commit, state }) {
      try {
        const res = await fetch('/storeProducts.json')
        if (!res.ok) {
          throw new Error('Failed to fetch data to product.json')
        }
        const data = await res.json()
        const currentSP = data.shopProducts.filter(product => product.shop === state.shop.id)
        commit('setProducts', currentSP)
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
