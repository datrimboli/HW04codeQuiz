// Questions array
let questions = [
  {
    // Question 1
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 2
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 3
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 4
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 5
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 6
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 7
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 8
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 9
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
  {
    // Question 10
    question: "",
    correct_answer: "",
    answerchoices: ["", "", "", ""],
  },
];

let currentIndex = 0;
let score = 0;
let seconds = 100;
let timer;

const newQuestion = () => {
  document.getElementById("question").textContent =
    questions[currentIndex].question;

  let answerchoices = questions[currentIndex].answerchoices;

  document.getElementById("answerchoices").innerHTML = "";

  for (let i = 0; i < answerchoices.length; i++) {
    let answerElem = document.createElement("button");
    answerElem.className = "answer btn btn-secondary btn-lg";
    answerElem.dataset.answer = answerchoices[i];
    answerElem.textContent = answerchoices[i];

    document.getElementById("answerchoices").append(answerElem);
  }
};

const getAnswer = (answer) => {
  if (answer === questions[currentIndex].correct_answer) {
    score++;
    document.getElementById("score").textContent = score;
    let resultElem = document.createElement("div");
    resultElem.className = "alert alert-success";
    resultElem.textContent = "Correct Answer";
    document.getElementById("answerchoices").append(resultElem);
  } else {
    let resultElem = document.createElement("div");
    resultElem.className = "alert alert-danger";
    resultElem.textContent = "Incorrect Answer";
    document.getElementById("answerchoices").append(resultElem);
  }

  currentIndex++;

  setTimeout(() => {
    if (currentIndex < questions.length) {
      newQuestion();
    } else {
      endGame();
    }
  }, 1000);
};

const endGame = () => {
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

const submitScore = (submission) => {
  console.log(submission);

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push(submission);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  leaderboard.sort((a, b) => {
    return b.score - a.score;
  });

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

  let bodyElem = document.createElement("tbody");

  for (let i = 0; i < leaderboard.length; i++) {
    let rowElem = document.createElement("tr");
    rowElem.innerHTML = `
      <th scope="row">${i + 1}</th>
      <td>${leaderboard[i].username}</td>
      <td>${leaderboard[i].score}</td>
    `;
    bodyElem.append(rowElem);
  }

  tableElem.append(bodyElem);

  document.getElementById("quiz").append(tableElem);
};

document.getElementById("startTrivia").addEventListener("click", () => {
  timer = setInterval(() => {
    seconds--;
    document.getElementById("time").textContent = seconds;

    if (seconds <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  newQuestion();
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("answer")) {
    getAnswer(event.target.dataset.answer);
  } else if (event.target.id === "submitScore") {
    event.preventDefault();
    submitScore({
      username: document.getElementById("username").value,
      score: score,
    });
  }
});
