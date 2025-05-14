const router = require("express").Router();
const prisma = require("../db");
const jwt = require("jsonwebtoken");


// Register a new instructor account
router.post("/register", async (req, res, next) => {
  try {
    const instructor = await 
    prisma.instructor.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });

    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing instructor account
router.post("/login", async (req, res, next) => {
  try {
        console.log(req.body)
    const instructor = await 
    prisma.instructor.findUnique({
      where: { username: req.body.username },
    });
    console.log("Found instructor", instructor);
    console.log(instructor.password)
    console.log(req.body)
    if (!instructor || instructor.password !== req.body.password) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in instructor
router.get("/me", async (req, res, next) => {
  try {
    const instructor = await 
    prisma.instructor.findUnique({
      where: { id: req.user.id },
    });

    res.send(instructor);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
