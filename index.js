let qNumber = 0;
let score = 0;

function generateQuestion() {
    $('.questionBox').html(
        `<div>
            <form class="questionForm" method="post">
                <fieldset>
                    <legend>${QUESTIONS[qNumber].question}</legend>
                    <label>
                        <input type="radio" name="warriors" value=0 required>
                        ${QUESTIONS[qNumber].choices[0]}
                    </label>
                    <label>
                        <input type="radio" name="warriors" value=1>
                        ${QUESTIONS[qNumber].choices[1]}
                    </label>
                    <label>
                        <input type="radio" name="warriors" value=2>
                        ${QUESTIONS[qNumber].choices[2]}
                    </label>
                    <label>
                        <input type="radio" name="warriors" value=3>
                        ${QUESTIONS[qNumber].choices[3]}
                    </label>
                </fieldset>
                <button type="submit" class="submitAnswer">Submit Answer</button>
            </form>
        </div>`
    );
    formSubmit();
}

function formSubmit() {
    $('.questionForm').submit(function(event) {
        event.preventDefault();
        const userAnswer = parseInt($('input[name="warriors"]:checked').val());
        const rightAnswer = QUESTIONS[qNumber].correctAnswer;

        if (userAnswer === rightAnswer) {
            choseRightAnswer();
        } else {
            choseWrongAnswer();
        }
    });
}

function choseRightAnswer() {
    let explanation = QUESTIONS[qNumber].explanation;
    $('.questionBox').html(
        `<div>
            <strong>Correct!<strong>
            <img src="swish.jpg" class="swish" alt="Swish">
            <p>${explanation}</p>
            <button class="nextButton">Next Question</button>
        </div>`
    );
    score++;
    $('.scoreNumber').html(`${score}`);
    nextQuestion();
}

function choseWrongAnswer() {
    let explanation = QUESTIONS[qNumber].explanation;
    $('.questionBox').html(
        `<div>
            <strong>Wrong!<strong>
            <img src="wrong.jpg" class="wrong" alt="Draymond Green Block">
            <p>${explanation}</p>
            <button class="nextButton">Next Question</button>
        </div>`
    );
    nextQuestion();
}

function nextQuestion() {
    $('.nextButton').on('click', function() {
        qNumber++;
        if (qNumber <= 9) {
            $('.questionNumber').html(`${qNumber + 1}`);
            generateQuestion();
        } else {
            showResults();
        }
    });
}

function showResults() {
    $('.questionBox').html(`
        <p>You got ${score} correct out of 10!</p>
        <button class="restartQuiz">Restart Quiz</button>
    `);
    restartQuiz();
}

function restartQuiz() {
    $('.restartQuiz').on('click', function() {
        qNumber = 0;
        score = 0;
        $('.questionNumber').html(`${qNumber + 1}`);
        $('.scoreNumber').html(`${score}`);
        generateQuestion();
    });
}

function generateQuiz() {
    $('.startButton').on('click', function() {
        $('.questionNumber').html(`${qNumber + 1}`);
        $('.startBox').remove();
        $('.startButton').remove();
        $('.questionBox').css('display', 'block');
        generateQuestion();
    });
}

function startQuiz() {
    generateQuiz();
}

$(startQuiz);