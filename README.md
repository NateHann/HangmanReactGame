# Hangman Game

Welcome to the Hangman game! This is a modern, interactive, and visually appealing version of the classic Hangman game built with React.
Follow the link to play https://evening-oasis-79944-d4724b4f019e.herokuapp.com/

## Features

- Dynamic and interactive gameplay with a clean and intuitive user interface.
- Attractively styled components with a pastel gradient background.
- Victory and Game Over messages with emojis for a delightful user experience.
- Fully functional keyboard with disabled buttons for used letters.
- A Restart button to reset the game and fetch a new random word.
- Help button with a popup explaining the rules of the game.
- Random word selection from a dictionary file containing thousands of words.
- Modular and well-organized code structure.

## Rules of the Game

1. Guess the word by selecting letters one at a time.
2. Each incorrect guess adds a part to the hangman figure.
3. Win by guessing all letters before the hangman is fully drawn.
4. Lose if the hangman figure is completed before the word is guessed.

## Installation Instructions

Follow these steps to install and run the Hangman game on your local machine:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to play the game.

## File Structure

The project is organized as follows:

```
src/
├── assets/             # GIFs and dictionary file
├── components/         # React components
├── styles/             # CSS stylesheets
├── App.js              # Main app logic
├── index.js            # App entry point
```

## Technologies Used

- React
- JavaScript
- CSS

## Future Enhancements

- Add a leaderboard to track high scores.
- Include multiple difficulty levels (easy, medium, hard).
- Implement sound effects for user interactions.

## License

This project is licensed under the MIT License. Feel free to use and modify it as you wish.

---
Enjoy the game!
