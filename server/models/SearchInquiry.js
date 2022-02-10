const { Schema, model } = require("mongoose");
const { schema } = require("./User");

const SearchInquirySchema = new Schema({
  // _id:{ type: Schema.Types.ObjectId},
  firstName: {
    type: String,
    // required: true,
    trim: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  dateOfBirth: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
});

const SearchInquiry = model("SearchInquiry", SearchInquirySchema);

module.exports = SearchInquiry;
