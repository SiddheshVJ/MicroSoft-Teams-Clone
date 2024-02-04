import { connect } from 'mongoose'

connect('mongodb://127.0.0.1:27017/microsoft-teams-clone').then(() => {
    console.log('DB Connected')
}).catch((err) => {
    console.log(err)
})