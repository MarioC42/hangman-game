// Import Animals. (Helps us with keeping our code clean.)
import { animals } from "./animals.js";
const wrongGuesses = document.querySelector("#wrong--guesses");
const getHint = document.querySelector("#hint");
const hangmanImage = document.querySelector("#hangman--image");
const lettersContainer = document.querySelector("#letters--container");
const showAnswer = document.querySelector("#answer");
const gameResult = document.querySelector("#win--lose");

let word = animals[Math.floor(Math.random() * 12)];

// Game Variables
let wrongAttempts = 0;
let wrongLetter = [];
let correct = [];
let innerWord = word.name;
let gotHint = false;
let isGameOver = false;

// Generate all buttons
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const buttons = letters.forEach((letter) => {
  const newButton = document.createElement("Button");
  newButton.classList.add("btn");
  newButton.textContent = letter;
  lettersContainer.appendChild(newButton);
});

// Generate Answer fields.
word.name.split("").forEach((letter) => {
  let newSpan = document.createElement("span");
  newSpan.classList.add("correctLetter");
  showAnswer.appendChild(newSpan);
});

const btn = document.querySelectorAll(".btn");
// Add Button Functionality for each button
btn.forEach((button) => {
  button.addEventListener("click", () => {
    if (isGameOver === false) {
      let btnValue = button.textContent;
      let letters = document.querySelectorAll(".correctLetter");
      let words = word.name.split("");
      let letterArr = [];
      letters.forEach((letter) => {
        letterArr.push(letter);
      });
      // If the value of clicked button includes any of the word letter. Run this
      if (words.includes(btnValue)) {
        for (let i = 0; i < words.length; i++) {
          if (btnValue === words[i]) {
            letterArr[i].textContent = btnValue;
          }
        }
      }
      // If the the Button Value is the same as any word letter push the letter to array
      if (words.includes(btnValue)) {
        if (!correct.includes(btnValue)) {
          correct.push(btnValue);
          if (correct.join("") === innerWord) {
            isGameOver = true;
            document.querySelector("body").style.backgroundColor = "green";
          }
        }
      }
      // Finish Game
      if (!words.includes(btnValue)) {
        wrongAttempts++;
        wrongGuesses.textContent = wrongAttempts;
        hangmanImage.src = `/images/${wrongAttempts}.jpg`;
        if (wrongAttempts >= 6) {
          document.querySelector("body").style.backgroundColor = "black";
          gameResult.textContent = "You lost!";
          isGameOver = true;
        }
      }
    }
  });
});
// Same as pressing buttons.
window.addEventListener("keyup", (e) => {
  if (isGameOver === false) {
    let value = e.key;
    let letters = document.querySelectorAll(".correctLetter");
    let words = word.name.split("");
    let letterArr = [];
    letters.forEach((letter) => {
      letterArr.push(letter);
    });
    // If the value of clicked button includes any of the word letter. Run this
    if (words.includes(value)) {
      for (let i = 0; i < words.length; i++) {
        if (value === words[i]) {
          letterArr[i].textContent = value;
        }
      }
    }
    // If the the Button Value is the same as any word letter push the letter to array

    if (words.includes(value)) {
      if (!correct.includes(value)) {
        correct.push(value);
        if (correct.join("") === innerWord) {
          isGameOver = true;
          document.querySelector("body").style.backgroundColor = "green";
          gameResult.textContent = "You won! 🎉";
        }
      }
    }
    // Finish Game
    if (!words.includes(value)) {
      wrongAttempts++;
      wrongGuesses.textContent = wrongAttempts;
      hangmanImage.src = `/images/${wrongAttempts}.jpg`;
      if (wrongAttempts >= 6) {
        document.querySelector("body").style.backgroundColor = "black";
        gameResult.textContent = "You lost! 😢";
        isGameOver = true;
      }
    }
  }
});

getHint.addEventListener("click", () => {
  if (!gotHint) {
    let hint = document.createElement("p");
    hint.classList.add("hint-text");
    hint.textContent = word.hint;
    document.querySelector(".hint-container").appendChild(hint);
    gotHint = true;
  }
});
