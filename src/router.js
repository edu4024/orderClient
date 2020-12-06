import Vue from 'vue'
import Router from 'vue-router'
import OrderList from './components/OrderList';
import Order from './components/OrderDetail'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            props: true,
            name: 'OrderList',
            component: OrderList
        },
        {
            path: '/order',
            props: true,
            name: 'Order',
            component: Order
        }
    ]
})