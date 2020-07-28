// Questions array
let questions = [
  {
    // Question 1
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 2
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 3
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 4
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 5
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 6
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 7
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 8
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 9
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
  {
    // Question 10
    question: "",
    correct_answer: "",
    answerChoices: ["", "", "", ""],
  },
];
// Variable: Current Index. It moves us through questions array
let currentIndex = 0;
// Variable: Score. Score will increase with every right answer
let score = 0;
// Variable: Seconds. Seconds decrease as time continues
let seconds = 90;
// Variable: Timer. This will be the timer interval
let timer;

// newQuestion function will show the new questions
const newQuestion = () => {
  document.getElementById("question").textContent =
    questions[currentIndex].question;

  // Variable: answerChoices. Stores answerChoices array for the question being answered
  let answerChoices = questions[currentIndex].answerChoices;

  // Resets buttons for each question
  document.getElementById("answerChoices").innerHTML = "";

  // For loop that puts buttons on screen
  for (let i = 0; i < answerChoices.length; i++) {
    // Button element
    let answerElem = document.createElement("button");
    // Styling for answer button
    answerElem.className = "answer btn btn-secondary btn-lg";
    // Makes buttons value the answer and puts the text onto the button
    answerElem.dataset.answer = answerChoices[i];
    // text is equal to answer
    answerElem.textContent = answerChoices[i];
    // Pushes answer to answerElem
    document.getElementById("answerChoices").append(answerElem);
  }
};
// Variable:Answer
const getAnswer = (answer) => {
  // Checks if answer was correct by seeing if answer selected and the correct answer match
  if (answer === questions[currentIndex].correct_answer) {
    // Score goes up by single increments
    score++;
    // shows score on screen
    document.getElementById("score").textContent = score;

    let resultElem = document.createElement("div");
    resultElem.className = "alert alert-success";
    // Alerts correct answer
    resultElem.textContent = "Correct Answer";
    document.getElementById("answerChoices").append(resultElem);
  } else {
    // Alerts incorrect answer
    let resultElem = document.createElement("div");
    resultElem.className = "alert alert-danger";
    resultElem.textContent = "Incorrect Answer";
    document.getElementById("answerChoices").append(resultElem);
  }

  currentIndex++;
  // Timeout set
  setTimeout(() => {
    // Determines how many questions are left
    if (currentIndex < questions.length) {
      newQuestion();
    } else {
      endGame();
    }
  }, 1000);
};

// End of game screen
const endGame = () => {
  // Displays game over, final score, prompts for username, and submits username
  document.getElementById("quiz").innerHTML = `
    <h1 class="display-2">Game Over!</h1>
  <p class="display-4">Your final score is: ${score}</p>
  <hr class="my-4">
  <p>Please enter a username for the leaderboard</p>
  <form>
    <div class="form-group">
      <label for="username">username</label>
      <input type="text" class="form-control" id="username">
      <button id="submitScore" class="btn btn-primary">Submit</button>
    </div>
  </form>
  `;
};

// Submits score to the leaderboard
const submitScore = (submission) => {
  console.log(submission);

  // Gets leaderboard array from local storage
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  // Pushes submission to leaderboard array
  leaderboard.push(submission);
  // Resets leaderboard
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  // Scores show in decending order
  leaderboard.sort((a, b) => {
    return b.score - a.score;
  });
  // Table of elements for leaderboard, assigns table class
  let tableElem = document.createElement("table");
  tableElem.className = "table";
  tableElem.innerHTML = `
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">username</th>
        <th scope="col">score</th>
      </tr>
    </thead>
  `;
  // Table body element
  let bodyElem = document.createElement("tbody");
  // For loop for leaderboard array
  for (let i = 0; i < leaderboard.length; i++) {
    // Creates new row elements for all usernames entered in leaderboard
    let rowElem = document.createElement("tr");
    rowElem.innerHTML = `
      <th scope="row">${i + 1}</th>
      <td>${leaderboard[i].username}</td>
      <td>${leaderboard[i].score}</td>
    `;
    // Sends rowElem to bodyElem to be shown on screen
    bodyElem.append(rowElem);
  }
  // Sends bodyElem to tableElem to be shown on screen
  tableElem.append(bodyElem);
  // tableElem appended to main container
  document.getElementById("quiz").append(tableElem);
};
// Starts game when start button is clicked
document.getElementById("startTrivia").addEventListener("click", () => {
  // setIntercal function to timer
  timer = setInterval(() => {
    // Decreses by 1 second intervals
    seconds--;
    // New seconds values
    document.getElementById("time").textContent = seconds;

    // If seconds are less than zero, endgame
    if (seconds <= 0) {
      clearInterval(timer);
      endGame();
    }
    // 1000ms=1sec for the decreasing interval values
  }, 1000);

  newQuestion();
});
// Click events
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("answer")) {
    getAnswer(event.target.dataset.answer);
  } else if (event.target.id === "submitScore") {
    // Stops what would normally happen, refreshing screen on end of game
    event.preventDefault();
    submitScore({
      username: document.getElementById("username").value,
      score: score,
    });
  }
});
