<template>
    <div class="order">
        <div>
            <Header
                    v-bind:order="order"
            />
        </div>
        <div>
            <div class="order-body">
                <div class="order-date">
                    <p>{{nearlyDelivery.month}}</p>
                    <p class="number-font">{{nearlyDelivery.day}}</p>
                </div>
                <div>
                    <div>
                        <h3>Ближайшая доставка</h3>
                        <router-link class="order-link" :to="{name:'Order', params:{order: order}}">
                            <h3>{{nearlyDelivery.dayOfWeek}} -</h3>
                        </router-link>
                    </div>
                    <div class="order-info">
                        <p>с {{nearlyDelivery.interval}}</p>
                        <p class="light-grey">{{nearlyDelivery.address}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import  moment from 'moment'
    import Header from './Header'

    export default {
        name: "Order",
        components: {
            Header
        },
        props: ['order'],
        data () {
            return {
                sortDate: [],
                dates: [],
                nearlyDelivery: {
                    dayOfWeek: '',
                    day: '',
                    month: '',
                    address: '',
                    interval: ''
                }
            }
        },
        mounted() {
            moment.locale('ru')
            this.sortDates()
            this.datesArray()
            this.nearestDelivery()
        },
        methods: {
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
                        interval: item.interval,
                        address: item.address
                    }
                })
            },

            nearestDelivery: function () {
                let nearDelivery = {
                    nearDay: moment(),
                    interval: '',
                    address: ''
                }
                let maxDay = moment()
                this.sortDate.forEach(item => {
                    maxDay = moment().isBefore(moment(item.date))? moment(item.date): maxDay
                    nearDelivery = maxDay.isAfter(moment()) && moment().isBefore(nearDelivery.nearDay)? {
                        nearDay: nearDelivery.nearDay,
                        interval: item.interval,
                        address: item.address
                    }: {
                        nearDay: moment(item.date),
                        interval: item.interval,
                        address: item.address
                    }
                })
                this.nearlyDelivery.day = nearDelivery.nearDay.format('D')
                this.nearlyDelivery.month = nearDelivery.nearDay.format('MMMM')
                this.nearlyDelivery.dayOfWeek = nearDelivery.nearDay.format('dddd')
                this.nearlyDelivery.address = nearDelivery.address
                this.nearlyDelivery.interval = nearDelivery.interval
            }

        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .order {
        width: 500px;
        margin-bottom: 10px;
        padding: 20px 10px 10px;
        background: #f5f5f5;
        border-radius: 5px;
    }

    .order-body {
        display: flex;
    }

    .order-date {
        width: 70px;
        background: steelblue;
        border-radius: 10px;
        color: white;
        padding: 30px 5px 0px 0px;
        margin-right: 20px;
    }

    .order-date > p {
        margin: 0 auto;
        width: 45px;
        text-align: center;
    }

    .number-font {
        font-size: 25px;
    }

    .order-link {
        color: steelblue;
        text-decoration: none;
    }

    .order-info{
        margin-top: 15px;
    }
</style>