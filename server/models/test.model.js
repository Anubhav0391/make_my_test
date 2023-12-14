const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
  title: { type: String, isRequired: true },
  image: { type: String },
  questions: { type: {} },
});

const TestModel = mongoose.model("test", TestSchema);

module.exports = TestModel;
