const express = require('express')
const mongoose = require('mongoose')
const jwt = require ('jsonwebtoken')

const Schema = mongoose.Schema

const singleUserSchema = new Schema ({
    motivational: {type: String},
    job_title: {type: String, min: 2, max: 50},
    first_name: {type: String, min: 2, max: 50},
    last_name: {type: String, min: 2, max: 50},
    email: {type: String, min: 2, max: 50},
    video:{type: String},
    profile_pic:{type: String},
    CV:{type: String},
    phone: {type: Number},
    transfer_skills:{type: String},
    coding_skills:{type: String},
    further_hard_skills:{type: String},
    password: {type: String, min: 6, max: 20},
    last_updated:{type: Date, default: Date.now},
    dob:{type: Date},
    street:{type: String},
    city:{type: String, min: 2, max: 50},
    postal_code:{type: Number},
    province:{type:String, max: 50},
    country:{type: String, max: 50},
    relocate:{type: Boolean},
    available: {type: Boolean},
    personal_url:{type: String},
    github_url:{type: String},
    portfolio_url:{type: String},
    linkedin_url:{type: String},
    xing_url:{type: String},
    twitter:{type: String}

})


singleUserSchema.methods.createToken = function() {
    const payload = {_id: this._id, email: this.email}
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey, {expiresIn: '10h'})
    return token
}


const singleUser = mongoose.model('singleUser', singleUserSchema)

module.exports = singleUser