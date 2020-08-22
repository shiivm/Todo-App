const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
    userId : {
      type : Schema.Types.ObjectId,
      ref : 'Users',
      required : true
    }
  },
  { versionKey: false }
);

module.exports = Item = mongoose.model("Item", ItemSchema);
