
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: {
    type : String
  },
  category : [
    {type : String
    }
  ],
  description: String,
  image: String,
});

module.exports = mongoose.model('Product', ProductSchema);
