import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {},
    mutations: {},
    state: {
        orders:[]
    },
    getters: {
        allOrders(state) {
            return state.orders
        }
    }
})