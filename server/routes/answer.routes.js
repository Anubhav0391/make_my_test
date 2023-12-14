const express = require("express");
const AnswerModel = require("../models/answer.model");
const answerRouter = express.Router();

answerRouter.post("/", async (req, res) => {
  try {
    const answer = new AnswerModel(req.body);
    await answer.save();
    res.status(200).send({ msg: "answer added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

answerRouter.patch("/:id", async (req, res) => {
  try {
    await AnswerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ message: "answer edited" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

answerRouter.get("/:id", async (req, res) => {
  try {
    const answer = await AnswerModel.find({ testID: req.params.id });
    res.status(200).send(answer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = answerRouter;
