import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import bodyParser from "body-parser";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";


const app = express(); // ✅ Define app BEFORE using it
const PORT = ENV.PORT || 5001;

if(ENV.NODE_ENV === "production") {
  job.start(); // Start the cron job
}


app.use(bodyParser.json());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.post("/api/favorites", async (req, res) => {
  try {

    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavorite = await db.insert(favoritesTable).values({
      userId: String(userId),
      recipeId: Number(recipeId),
      title: String(title),
      image: image ? String(image) : null,
      cookTime: cookTime ? String(cookTime) : null,
      servings: servings ? String(servings) : null,
    }).returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.error("🔥 Final caught error:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
});

app.delete("/api/favorites/:userId/:recipeId", async(req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db.delete(favoritesTable).where(
      and(
        eq(favoritesTable.userId, userId), 
        eq(favoritesTable.recipeId, parseInt(recipeId))
      )
    );
    res.status(200).json({ message: "Favorite deleted successfully" });

  } catch (error) {
    console.error("Error removing a favorite:", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
});

app.get("/api/favorites/:userId", async(req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db.select().from(favoritesTable)
      .where(
        eq(favoritesTable.userId, userId)
      )

      res.json(userFavorites);

  } catch (error) {
    console.error("Error fetching favorites", error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
})

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
