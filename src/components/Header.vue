<template>
    <div>
        <div class="header">
            <div class="header-order">
                <h1>{{this.days.restDays}}</h1>
                <div>
                    <p class="light-grey">{{order.packageName}}</p>
                    <h4>{{order.packageCalories}}</h4>
                </div>
            </div>
            <div class="loading-bar">
                <div class="loading" :style="{'width': loading + '%'}">
                    <div class="progress"></div>
                </div>
            </div>
            <div class="header-date">
                <p class="light-grey">{{this.days.minDay}}</p>
                <p>Осталось {{this.days.totalRest}}</p>
                <p class="light-grey">{{this.days.maxDay}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "Header",
        props: ['order'],
        data () {
            return {
                sortDate: [],
                dates: [],
                days: {
                    restDays: '',
                    totalRest: '',
                    minDay: '',
                    maxDay: '',
                },
                loading: 65
            }
        },
        mounted() {
            moment.locale('ru')
            this.sortDates()
            this.datesArray()
            this.countRestDays()
            this.setProgress()
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
                        interval: item.interval
                    }
                })
            },

            countRestDays: function () {
                let minRestDays = moment(), dayMin = moment(), dayMax = moment()
                this.sortDate.forEach(item => {
                    dayMin = moment().isAfter(moment(item.date))? moment(item.date): dayMin
                    dayMax = moment().isBefore(moment(item.date))? moment(item.date): dayMax
                    minRestDays = dayMax.isAfter(moment()) && moment().isBefore(minRestDays)? minRestDays: moment(item.date)
                })
                this.days.minDay = dayMin.format('Do MMMM')
                this.days.maxDay = dayMax.format('Do MMMM')
                this.days.totalRest = moment.duration(dayMax - moment()).humanize()
                this.days.restDays = moment.duration( minRestDays - moment()).humanize()
            },

            setProgress: function () {
                let totalOrder = this.sortDate.length
                let inProcess = []
                let finished = []
                this.sortDate.forEach(item => {
                    if (moment().isSameOrAfter(item.date)) {
                        finished.push(item.date)
                    }else{
                        inProcess.push(item.date)
                    }
                })
                this.loading = Math.round((finished.length*100)/totalOrder)
            }
        }
    }
</script>

<style scoped>
    .loading-bar {
        position: relative;
        width: 500px;
        height: 10px;
        border-radius: 15px;
        overflow: hidden;
        border-bottom: 1px solid #ddd;
        box-shadow: inset 0 1px;
        background-color: #ebebeb;
    }

    .loading {
        position: absolute;
        display: block;
        height: 100%;
        width: 50%;
        border-radius: 15px;
        background-color: steelblue;
        background-size: 30px 30px;
    }
    * {
        margin: 0;
        padding: 0;
    }
    .header p{
        font-size: 12px;
    }

    .header-order {
        width: 500px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .header-date {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }

</style>