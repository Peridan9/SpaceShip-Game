# 🛸 Space Invaders Game 🚀

This project was developed as part of the **Web Development Environments** course at Ben-Gurion University. It is a browser-based game inspired by **Chicken Invaders**, created using **HTML5**, **CSS3**, and **JavaScript**. Players control a spaceship to defeat enemies while aiming for the highest score.

---

## ✨ Features

- **Responsive Design:** Optimized for Chrome and resolutions of 1366x768 or higher.
- **Dynamic Gameplay:**
  - Player spaceship moves freely within a defined area using arrow keys.
  - Enemies move in unison and shoot projectiles randomly.
  - Accelerating difficulty as the game progresses.
- **Score System:** Earn points based on which row of enemies you destroy:
  - Row 1: +20 points
  - Row 2: +15 points
  - Row 3: +10 points
  - Row 4: +5 points
- **Lives and Game Endings:** Players start with 3 lives. Game ends when:
  - Lives reach zero: `"You Lost"`
  - Time runs out: `"You can do better"` (if score < 100) or `"Winner!"`
  - All enemies are defeated: `"Champion!"`
- **Configuration Options:** Customize controls, game duration, and spaceship colors.
- **Sound Effects:** Background music and sound cues for hits, misses, and special events.
- **High Score Table:** Displays personal score history at the end of each game.

---

## 🎮 How to Play

1. Launch the game by opening `index.html` in a web browser.
2. **Controls:**
   - Move: Arrow keys
   - Shoot: Configurable key (default is Spacebar)
3. Destroy enemy spaceships to gain points while avoiding their projectiles.
4. Survive with 3 lives and aim to eliminate all enemies or achieve a high score.

---

## 🛠️ Technologies Used

- **HTML5**: Structure and game canvas.
- **CSS3**: Styling and animations.
- **JavaScript**: Core logic, interactivity, and gameplay mechanics.

---

## 📂 File Structure

```
SpaceShip-Game/
├── media/
│   ├── background.jpg
│   ├── rocket-launch.png
│   └── spaceship.png
├── README.md
├── frontend.js
├── index.html
├── index.js
└── style.css
```

- `index.html`: Main game structure.
- `style.css`: Styling and visual elements.
- `index.js` & `frontend.js`: Core game logic, enemy behavior, and collision detection.
- `media/`: Contains images used in the game.

---

## 🚀 Game Flow

1. **Welcome Screen:** Includes logo, developer details, and navigation to registration/login pages.
2. **Registration:** Players register with username, password, and personal details.
3. **Login:** Authenticate users to allow gameplay. A predefined user (`p:testuser`) bypasses registration.
4. **Configuration Screen:** Players set shooting controls, game duration, and appearance settings.
5. **Game Screen:** Players control a spaceship, destroy enemies, and avoid projectiles.
6. **End Screen:** Displays final score, status, and high score history.

---

## 🎨 Design and Sounds

- **Customizable Visuals:** Players can select colors for their spaceship and enemies.
- **Music and Effects:**
  - Background music during gameplay.
  - Unique sound effects for hits and defeats.

---

## 🏆 Bonus Features

- **Diagonal Movement:** All elements (spaceships and projectiles) support diagonal movement.
- **Timer:** Displays time remaining to complete the game.

---

## 📡 Live Demo

The game is hosted on GitHub Pages:  
[Space Invaders Game Demo](https://web-development-environments-2023.github.io/assignment2-205968126_315340349/#game)
