// An instructor can only access their own students' data.
const router = require("express").Router();
const prisma = require("../db");
const isLoggedIn = require("../auth/isLoggedIn");
const { getUserByToken } = require("../auth/helpers");

// Deny access if user is not logged in
router.use(isLoggedIn);

// Get all students
router.get("/", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      where: { instructorId: req.user.id },
    });
    res.send(students);
  } catch (error) {
    next(error);
  }
});

// Get a student by id
router.get("/:id", async (req, res, next) => {
  try {
    const student = await prisma.student.findFirst({
      where: {
        id: Number(req.params.id),
        instructorId: req.user.id,
      },
    });

    if (!student) {
      return res.status(404).send("❌Student not found.");
    }

    res.send(student);
  } catch (error) {
    next(error);
  }
});

// Create a new student
router.post("/", async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: {
        name: req.body.name,
        cohort: req.body.cohort,
        instructorId: req.user.id,
      },
    });
    res.status(201).send(student);
  } catch (error) {
    next(error);
  }
});

// Update a student
router.put("/:id", async (req, res, next) => {
  try {
    const student = await prisma.student.updateMany({
      where: {
        id: Number(req.params.id),
        instructorId: req.user.id,
      },
      data: {
        name: req.body.name,
        cohort: req.body.cohort,
      },
    });

    if (!student) {
      return res.status(404).send("Student not found.");
    }

    res.send(student);
  } catch (error) {
    next(error);
  }
});

// Delete a student by id
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await prisma.student.deleteMany({
      where: {
        id: Number(req.params.id),
        instructorId: req.user.id,
      },
    });

    if (deleted.count === 0) {
      return res.status(404).send("❌Student not found.");
    }

    res.send({ message: "Student deleted successfully." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
