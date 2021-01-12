const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer')
const creds = require('../config')

const transport = {
    service: "gmail",
    
    auth: {
        user:creds.USER,
        pass:creds.PASS
    }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error , success) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Server is ready to take emails')
    }
})

router.post('/', (req , res, next) => {
    let name = req.body.name
    let email = req.body.email 
    let message = req.body.message

    let content =  `name: ${name} \n email: ${email} \n message: ${message}`

    let mail = {
        from : name,
        to : 'itsrobel.schwarz@gmail.com',
        subject: 'A New Message From Your Website',
        text: content,
    }
    console.log(req.body)
    transporter.sendMail(mail, (err, data) => {
        if(err) {
            console.log(err)
            res.json({
                status:'fail'
            })
        } else {
            res.json({status:'success'})
            console.log(data)
        }
    })
})

module.exports = router;