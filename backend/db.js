const mongoose = require('mongoose');
const mongo_URI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const connect_to_mongo = ()=> {
   mongoose.connect(mongo_URI, ()=>{
       console.log('connected to mongo successfully')
   })
}

module.exports = connect_to_mongo;