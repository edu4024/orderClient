<template>
    <div class="order">
        <div class="div-link">
            <router-link class="order-link" to="/">Назад</router-link>
        </div>
        <div>
            <Header
                    v-bind:order="order"
            />
            <div>
        </div>
            <h3>Доставки</h3>
        </div>
        <div v-if="!cancel">
            <div>
                <ul>
                    <li v-for="delivery in dates" :key="delivery._id">
                       <div class="delivery">
                           <p>{{delivery.date}}</p>
                           <p>{{delivery.interval}}</p>
                       </div>
                    </li>
                </ul>
            </div>
            <div class="order-button">
                <div class="button">
                    <span>Дублировать заказ</span>
                    <div class="duplicate" @click="orderDuplicate(order._id)"></div>
                </div>
                <hr>
                <div class="button">
                    <span>Отменить заказ</span>
                    <div class="cancel" @click="orderCancel(order._id)"></div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>Заказ Отменен!</h2>
        </div>
    </div>
</template>

<script>
    import axios from '../api/api'
    import moment from 'moment'
    import Header from './Header'

    export default {
        name: "OrderDetail",
        components: {
            Header
        },
        props: [
            'order'
        ],
        data () {
            return {
                sortDate: [],
                dates: [],
                cancel: false
            }
        },
        mounted() {
            moment.locale('ru')
            this.sortDates()
            this.datesArray()
        },
        methods: {
            orderDuplicate: function (id) {
                axios.duplicateOrder({id}, response => {
                    console.log(response)
                    this.$router.push('/')
                }, error => {
                    console.error(error)
                })
            },

            orderCancel: function (id) {
                axios.cancelOrder({id}, response => {
                    console.log(response)
                    this.cancel = true
                }, error => {
                    console.error(error)
                })
            },

            sortDates: function () {
                this.sortDate = [...this.order.orders]
                this.sortDate.sort((a, b) => {
                    if (a.date > b.date) return 1
                    if (a.date < b.date) return -1
                })
            },

            datesArray: function () {
                this.dates = this.sortDate.map(item => {
                    return {
                        date: moment(item.date).format('Do MMMM, dddd'),
                        interval: item.interval
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .order-link {
        color: steelblue;
        text-decoration: none;
        font-size: 18px;
    }

    .div-link {
        margin-bottom: 25px;
    }

    .order {
        padding: 15px;
        width: 500px;
    }


    ul {
        list-style-image: url("../assets/order.svg");
        margin-top: 15px;
        font-size: 14px;
    }

    li > p {
       width: 400px;
        text-align: justify;
    }

    .delivery {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
    }

    .delivery > p {
        font-size: 16px;
    }

    .order-button {
        border-radius: 10px;
        background: #f5f5f5;
    }

    .button {
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }

    .button > span {
        font-size: 18px;
        color: #3f3f3f;
    }

    .duplicate {
        padding: 12px 14px;
        background-image: url("../assets/duplicate.svg");
    }

    .cancel {
        padding: 14px 11px;
        background-image: url("../assets/remove.svg");
    }

</style>