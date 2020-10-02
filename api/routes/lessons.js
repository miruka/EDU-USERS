const express = require("express");
const router = express.Router();
const shortid = require("shortid");

const lessons = [];

//Post New Lessons
router.post("/lessons", (req, res) => {
  //Method 1
  // const lessonsInfo = {
  //   lessonId: shortid.generate(),
  //   name: req.body.name,
  // };
  // lessons.push(lessonsInfo);

  //Method 2
  const lessonsInfo = req.body;
  lessonsInfo.id = shortid.generate();
  lessons.push(lessonsInfo);

  res.status(201).json({
    Message: "Lesson Created Successfully",
    LessonsInformation: lessonsInfo,
  });
});

//Get Lessons
router.get("/lessons", (req, res) => {
  res.status(201).json({
    Lessons: lessons,
  });
});

router.delete("/lessons/:deleteId", (req, res) => {
  const { deleteId } = req.params;
  const deleted = lessons.find((lesson) => lesson.id === deleteId);
  console.log(deleted.id);

  if (deleted) {
    lessons.filter((lesson) => lesson.id !== deleteId);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      Message: "LESSON NOT FOUND",
    });
  }
});

module.exports = router;
