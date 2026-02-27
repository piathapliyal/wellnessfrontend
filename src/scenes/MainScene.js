import Phaser from "phaser";
import { getWellnessEntries, createWellness } from "../services/api";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  async create() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.scene.start("LoginScene");
      return;
    }

    this.add.text(400, 40, "Wellness Dashboard 🌿", {
      fontSize: "28px",
      color: "#ffffff",
    }).setOrigin(0.5);

    // --- HTML FORM (Professional Approach) ---
    const formHTML = `
      <div style="display:flex; flex-direction:column; gap:10px; width:250px;">
        <input id="moodInput" placeholder="Mood" />
        <input id="sleepInput" type="number" placeholder="Sleep Hours" />
        <button id="submitBtn">Add Entry</button>
      </div>
    `;

    const form = this.add.dom(400, 120).createFromHTML(formHTML);

    form.addListener("click");

    form.on("click", async (event) => {
      if (event.target.id === "submitBtn") {
        const mood = document.getElementById("moodInput").value;
        const sleep = document.getElementById("sleepInput").value;

        if (!mood || !sleep) {
          alert("Fill all fields");
          return;
        }

        try {
          await createWellness(token, mood, sleep);
          document.getElementById("moodInput").value = "";
          document.getElementById("sleepInput").value = "";
          await this.loadEntries(token);
        } catch (err) {
          console.error(err);
        }
      }
    });

    this.entriesContainer = this.add.text(400, 250, "", {
      fontSize: "18px",
      color: "#00ff99",
      align: "center",
      wordWrap: { width: 600 },
    }).setOrigin(0.5);

    await this.loadEntries(token);

    // Logout
    const logout = this.add.text(400, 520, "Logout", {
      fontSize: "22px",
      backgroundColor: "#aa4444",
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive();

    logout.on("pointerdown", () => {
      localStorage.removeItem("token");
      this.scene.start("LoginScene");
    });
  }

  async loadEntries(token) {
    const data = await getWellnessEntries(token);

    if (!data.length) {
      this.entriesContainer.setText("No entries yet");
      return;
    }

    const formatted = data
      .map(
        (entry) =>
          `Mood: ${entry.mood} | Sleep: ${entry.sleep_hours} hrs`
      )
      .join("\n");

    this.entriesContainer.setText(formatted);
  }
}