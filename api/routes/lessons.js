const express = require("express");
const router = express.Router();
const shortid = require("shortid");

let lessons = [];

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

//Get Single Lesson
router.get("/lessons/:getLessonId", (req, res) => {
  const { getLessonId } = req.params;
  const found = lessons.find((lesson) => lesson.id === getLessonId);
  console.log(found);
  if (found) {
    res.status(200).json({
      Message: `Lesson Found of ID: ${found.id}`,
      LessonFound: found,
    });
  } else {
    res.status(404).json({
      Message: "LESSON DOES NOT EXIST",
    });
  }
});

//Update Lesson
router.put("/lessons/:getPutId", (req, res) => {
  const { getPutId } = req.params;
  //updated = req.body;
  const findLesson = lessons.findIndex((lesson) => lesson.id === getPutId);
  if (findLesson !== -1) {
    //Found Lesson
    lessons[findLesson] = req.body;
    res.status(200).json({
      Message: "Updated Lesson Successfully",
      UpdatedLesson: lessons[findLesson],
    });
  } else {
    //Lesson NOT Found
    res.status(404).json({
      Message: "LESSON DOES NOT EXIST",
    });
  }
});

//Patch Lesson
router.patch("/lessons/:patchId", (req, res) => {
  const { patchId } = req.params;
  const foundLesson = lessons.find((lesson) => lesson.id === patchId);

  if (foundLesson) {
    //When Lesson is Found
    Object.assign(foundLesson, req.body);
    res.status(200).json({
      Message: "Lesson Patched",
      PatchedLesson: foundLesson,
    });
  } else {
    //Lesson NOT Found
    res.status(404).json({
      Message: "LESSON DOES NOT EXIST",
    });
  }
});

//Delete Lesson
router.delete("/lessons/:deleteId", (req, res) => {
  const { deleteId } = req.params;
  const deleted = lessons.find((lesson) => lesson.id === deleteId);
  console.log(deleted.id);

  if (deleted) {
    lessons = lessons.filter((lesson) => lesson.id !== deleteId);
    res.status(200).json({
      Message: "Successfully deleted Lesson",
      DeletedLesson: deleted,
    });
  } else {
    res.status(404).json({
      Message: "LESSON NOT FOUND",
    });
  }
});

module.exports = router;
