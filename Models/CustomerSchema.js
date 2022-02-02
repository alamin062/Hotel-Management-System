const express = require('express');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    room_id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    room_type: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    guest: {
        type: Number,
        required: true,
    },
    night: {
        type: Number,
        required: true,
    },
    cheakin: {
        type: Date,
        required: true,
    },
    cheakout: {
        type: Date,
        required: true,
    }
});

module.exports = customerSchema;