const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    date : {
        type : String,
        required : true
    },
   
    type : [
        {
            type : String,
            required : true
        }
    ],
    imageUrl : {
        type : String,
        required : false
    },
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Student'
        }
    ],
    status : {
        type : String,
        default : 'closed'
    }
},
{timestamps : true} 
);

module.exports = mongoose.model('Event', eventSchema);