const express = require('express')
const app = express()
const QRcode = require('qrcode')
const generatePayload = require('promptpay-qr')
const bodyParser = require('body-parser')
const _ = require('lodash')
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

const server = app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})

app.post('/generateQR',(req,res) => {
    
    const amount = parseFloat(_.get(req, ["body","amount"]))
    console.log(amount)
    const telephone = '0902207271'
    const payload = generatePayload(telephone,{amount});

    const option = {
        color: {
            dark: '#000',
            light: '#FFF'
        }
    }
    QRcode.toDataURL(payload,option,(err,url) => {
        if(err) {
            console.log('generate fail')
            return res.status(400).json({
                RespCode: 400,
                RespMessage: 'bad : ' + err
            })
        } else {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good',
                Result: url
            })
        }

    })
})

// module.exports = app()