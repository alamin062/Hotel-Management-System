//const express = require('express');
const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
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
    address: {
        type: String,
        required: true,
    }
});

module.exports = employeeSchema;