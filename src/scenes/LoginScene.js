import Phaser from "phaser";
import { loginUser } from "../services/api";

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super("LoginScene");
  }

  create() {
    this.add.text(400, 100, "Login 🌿", {
      fontSize: "36px",
      color: "#ffffff",
    }).setOrigin(0.5);

    const loginButton = this.add.text(400, 250, "Click To Login", {
      fontSize: "28px",
      backgroundColor: "#00aa88",
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive();

    loginButton.on("pointerdown", async () => {
      try {
        const data = await loginUser("test7@test.com", "123456");

        localStorage.setItem("token", data.access_token);

        this.scene.start("MainScene");
      } catch (error) {
        console.error(error);
        alert("Login failed");
      }
    });
  }
}