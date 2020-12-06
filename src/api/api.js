import axios from 'axios'
import api from './../constants/domain'

export default {

    getOrders: function (callback, callbackError) {
        const instance = axios.create({
            baseURL: api.domain
        })
        instance.get('/getOrders')
            .then(response => {
                callback(response.data)
            })
            .catch(err => {
                callbackError(err)
            })
    },

    duplicateOrder: function (order, callback, callbackError) {
        const instance = axios.create({
            baseURL: api.domain
        })
        instance.post('/duplicateOrder', order)
            .then(response => {
                callback(response)
            })
            .catch(err => {
                callbackError(err)
            })
    },

    cancelOrder: function (order, callback, callbackError) {
        const instance = axios.create({
            baseURL: api.domain
        })
        instance.post('/cancelOrder', order)
            .then(response => {
                callback(response)
            })
            .catch(err => {
                callbackError(err)
            })
    }
}
