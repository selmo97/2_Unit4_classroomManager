const jwt = require("jsonwebtoken");
const prisma = require("../db");

const getUserByToken = async (token) => {
      const payload = jwt.verify(token, process.env.JWT);

        const user = await prisma.instructor.findUnique({ 
          where: { id: payload.id },
  });
  return user;
}

module.exports = {
  getUserByToken,
};