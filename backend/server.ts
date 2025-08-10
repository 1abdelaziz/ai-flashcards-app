import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Instantiate GoogleGenAI client (reads GEMINI_API_KEY from env)
const ai = new GoogleGenAI({});

app.post("/api/flashcards", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Received text:", text);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate flashcards covering everything from the following text. 
                 Each flashcard must have: question (string), answer (string), difficulty (1 | 2 | 3). 
                 Return ONLY a valid JSON array, nothing else. Text: ${text}`,
    });

    console.log("AI raw response:", response);

    let content : any = response.text;

    // Strip markdown JSON code fences if present
    content = content.trim()
      .replace(/^```json\s*/, '')  // Remove ```json at start
      .replace(/\s*```$/, '');     // Remove ``` at end

    console.log("Cleaned JSON content:", content);

    let flashcards;
    try {
      flashcards = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse JSON from Google Gemini response:", parseError);
      return res.status(500).json({ error: "Failed to parse JSON from AI response" });
    }

    res.json(flashcards);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
