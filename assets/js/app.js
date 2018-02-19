$(document).ready({

});

$('#multiple').click((() => {
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    questions = data.results;
    quizMultiple();
  })
  .catch((err) => {
    alert(err);
  });
})
)

$('#boolean').click(
  (() => {
    fetch('https://opentdb.com/api.php?amount=10&type=boolean')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      questions = data.results;
      quizBoolean();
    })
    .catch((err) => {
      alert(err);
    });
  })
)

let questions;
let rightAnswers = 0;
let numberQuestion = 0;
let actualAnswer = '';

function userAnswer(event) { 
  let textChange = $($(this).text()).html();
  actualAnswer = textChange;
  console.log(actualAnswer);
}

function quizMultiple() {
  if (numberQuestion === 10) {
    $('#quizContainer').empty();
    $('#quizContainer').append(`
      <div class="finalDiv-text">
        <h5 class="center final-text">Your Results</h5>
        <h5 class="center final-text"> Right Answers: ${rightAnswers} / 10 </h5>
      </div>
      <img src="assets/img/think.png" alt="" srcset="">
      <h3 class="center purple-text darken-3-text">Let's play again?</h3>
    `)
    return;
  }

  $('#quizContainer').empty();
  let answers = questions[numberQuestion].incorrect_answers;
  let actualRightAnswer = questions[numberQuestion].correct_answer;
  console.log(actualRightAnswer);
  answers.push(actualRightAnswer);
  /*   shuffledAnswers(answers);

    function shuffledAnswers(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return shuffledAnswers;
    } */

  $('#quizContainer').append(
    `<h5> Question ${numberQuestion+1} / 10 </h5>
    <h4> ${questions[numberQuestion].question}</h4>
    <form id="formAnswers" action="#">
    <a type="submit" class="submit waves-effect waves-light btn-large purple lighten-1">${answers[0]}</a>
    <a type="submit" class="submit waves-effect waves-light btn-large purple lighten-1">${answers[1]}</a>
    <a type="submit" class="submit waves-effect waves-light btn-large purple lighten-1">${answers[2]}</a>
    <a type="submit" class="submit waves-effect waves-light btn-large purple lighten-1">${answers[3]}</a>
    </form>`
  );

  $('.submit').click(function (event) {
    event.preventDefault();
    if (actualAnswer === rightAnswers) {
      rightAnswers++;
    }
    quizMultiple();
  });
    numberQuestion++;
}

function quizBoolean() {
  if (numberQuestion === 10) {
    $('#quizContainer').empty();
    $('#quizContainer').append(`
      <div class="finalDiv-text">
        <h5 class="center final-text">Your Results</h5>
        <h5 class="center final-text"> Right Answers: ${rightAnswers} / 10 </h5>
      </div>
      <img src="assets/img/think.png" alt="" srcset="">
      <h3 class="center purple-text darken-3-text">Let's play again?</h3>
    `)
    return;
  }

  $('#quizContainer').empty();
  let actualRightAnswer = questions[numberQuestion].correct_answer;
  console.log(actualRightAnswer);
  
  $('#quizContainer').append(
    `<h5> Question ${numberQuestion+1} / 10 </h5>
    <h4> ${questions[numberQuestion].question}</h4>
    <form id="formAnswers" action="#">
    <a type="submit" class="submit waves-effect waves-light btn-large purple lighten-1">True</a>
    <a type="submit" class="submit waves-effect waves-light btn-large purple lighten-1">False</a>
    </form>`
  );

  $('.submit').click(function (event) {
    event.preventDefault();
    if (actualAnswer === rightAnswers) {
      rightAnswers++;
    }
    quizBoolean();
  });
  numberQuestion++;
};