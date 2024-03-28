const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 8080;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌺 Hawaii Memory Game Server 🌺");
});

app.post("/create-user", async (req, res) => {
  const { nickname } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        nickname: nickname,
        levelsCompleted: "0",
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.post("/update-user", async (req, res) => {
  const { id, nickname, levelsCompleted } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { nickname: nickname },
    });

    if (existingUser && existingUser.id !== id) {
      console.log("Nickname must be unique");
      return res.status(201).json({ message: "Nickname must be unique" });
    }
  } catch (error) {
    console.error("Error finding user with the same nickname:", error);
    res.status(500).send("Error finding user with the same nickname");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        nickname: nickname,
        levelsCompleted: levelsCompleted,
      },
    });
    console.log(updatedUser);

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
