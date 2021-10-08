const wordEL = document.getElementById("word");
const wrongLettersEL = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
    "application",
    "programing",
    "wizard",
    "interface",
    "carwash",
    "car",
    "plain",
    "banana",
    "apple",
    "red",
    "blue",
    "bike",
    "app",
    "tank",
    "home",
    "hello",
    "human",
    "game",
    "program",
    "mohammad",
    "amir",
    "html",
    "php",
    "python",
    "javascript",
    "react",
    "vue",
    "pencil",
    "java"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word
function displayWord() {
    wordEL.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span>
            `
          )
          .join("")}
    `;
    const innerWord = wordEL.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord) {
        finalMessage.innerText = "آفرین حالا لفت بده";
        popup.style.display = "flex";
    }
}

// Update the wrong letters
function updateWrongLettersEL() {
    //display wrong letters
    wrongLettersEL.innerHTML = `${
    wrongLetters.length > 0 ? "<p>Wrong</p>" : ""
  } ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

    // display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    //check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "حقیر همینم بلد نبودی";
        popup.style.display = "flex";
    }
}

//Show notification
function showNotification() {
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

//keydown letter press
window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEL();
            } else {
                showNotification();
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener("click", () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEL();

    popup.style.display = "none";
});

displayWord();