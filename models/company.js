const express=  require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const companySchema = new Schema ({
    company_name: {type: String, min: 2, max: 50, required: true},
    password: {type: String, min: 2, max: 20, required: true}
})



const company = mongoose.model('company', companySchema)

module.exports = company