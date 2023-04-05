const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
 
    status: {
    type: String,
   
  },
    website: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  // likes: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId
  //     }
  //   }
  // ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('patient', PatientSchema);