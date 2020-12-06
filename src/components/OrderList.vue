<template>
    <div class="order-component">
        <div class="order-count">
            <h2>Мои заказы <span class="light-grey">{{orderCount}}</span> </h2> <br>
        </div>
        <div>
            <Order v-for="order in allOrders" :key="order._id"
                   v-bind:order="order"
            ></Order>
        </div>
    </div>
</template>

<script>
    import axios from './../api/api'
    import Order from "./Order"

    export default {
        name: "OrderList",
        components: {
            Order
        },
        data (){
            return {
                orderCount: ''
            }
        },
        computed: {
          allOrders() {
              return this.$store.getters.allOrders
          }
        },
        beforeMount() {
            this.orderList()
        },
        methods: {
            orderList: function () {
                axios.getOrders(response =>{
                    this.$store.state.orders = response
                    this.orderCount = this.$store.state.orders.length
                }, err =>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style >
    .light-grey {
        color: #cccccc;
    }

    .order-count {
        padding: 2px;
    }

    .order-component {
        padding: 15px;
    }
</style>