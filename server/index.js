const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 8080;
const prisma = new PrismaClient();

// app.use(cors());
app.use(function (req, res, next) {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://hawaii-memory-game.netlify.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌺 Hawaii Memory Game Server 🌺");
});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser) {
      console.log("existing user: ", existingUser);
      res.status(200).json(existingUser);
    } else {
      console.log("Did not find a user with this ID");
      res.status(500).send("Did not find a user with this ID");
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Error getting user");
  }
});

app.post("/create-user", async (req, res) => {
  const { nickname } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        nickname: nickname,
        levelsCompleted: 0,
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.put("/update-levels", async (req, res) => {
  const { id } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        levelsCompleted: {
          increment: 1,
        },
      },
    });

    console.log("User levels updated:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user levels:", error);
    res.status(500).send("Error updating levels");
  }
});

app.put("/update-nickname", async (req, res) => {
  const { id, newNickname } = req.body;

  try {
    const existingUserWithNickname = await prisma.user.findUnique({
      where: { nickname: newNickname },
    });

    if (existingUserWithNickname && existingUserWithNickname.id !== id) {
      console.log("Nickname must be unique");
      return res.status(201).json({ message: "Nickname must be unique" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        nickname: newNickname,
      },
    });

    console.log("User nickname updated:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user nickname:", error);
    res.status(500).send("Error updating nickname");
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

app.get("/best-players", async (req, res) => {
  try {
    const bestPlayers = await prisma.user.findMany({
      orderBy: {
        levelsCompleted: "desc",
      },
      take: 15,
    });

    res.status(200).json(bestPlayers);
  } catch (error) {
    console.error("Error getting best players:", error);
    res.status(500).send("Error getting best players");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
