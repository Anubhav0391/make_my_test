const mongoose = require('mongoose')

const answerSchema= mongoose.Schema({
    testId:{type:mongoose.Schema.Types.ObjectId},
    marks:{type:Number,required:true},
})

const AnswerModel = mongoose.model("answer", answerSchema);

module.exports = AnswerModel;
