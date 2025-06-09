const { default: mongoose } = require("mongoose");

const ordersSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
    unique: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
  orderNotes: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },

  customerDetail: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  itemDetail: [
    {
      title: {
        type: String,
      },
      cost: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      total: {
        type: Number,
      },
      image: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("orders", ordersSchema);
