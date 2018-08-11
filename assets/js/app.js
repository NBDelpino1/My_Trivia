// List of questions that will be asked

var questionsList = [{
    question: '1. What does the aesthetic-usability effect refer to?',
    answers: [
        'People tend to perceive usable products as more attractive',
        'People tend to perceive attractive products as more usable',
        'Usability and aesthetics are equally important in web design',
        'The perception of attractiveness and usability of a new site are evaluated in the first 50ms when a user first sees the site'
    ],
    correctAnswer: 'People tend to perceive attractive products as more usable'
}, {
    question: '2. Which of the following is NOT a type of microcontent?',
    answers: [
        'Page title',
        'Headline',
        'Tagline',
        'Email body'
    ],
    correctAnswer: 'Email body'
}, {
    question: '3. Which of the following best describes the false-consensus effect?',
    answers: [
        'People tend to assume that others share their beliefs and responses to a given situation',
        'Designers think that their favorite web-design patterns are more widespread than they are in reality',
        'People assume that their needs are unique most of the time, and that only in exceptional situations they will react in the same way as others',
        'Members of a team tend to act cohesively to give outsiders the illusion of consensus'
    ],
    correctAnswer: 'People tend to assume that others share their beliefs and responses to a given situation'
}, {
    question: '4. What is a difference between a customer-journey map and an experience map?',
    answers: [
        'The customer-journey map is focused on customers, while the experience map is focused on employees',
        'The customer-journey map depicts events in chronological order, but the experience map is not chronological or sequential',
        'The experience map is agnostic of any specific products, while the customer-journey map is tied to a specific product or service',
        'The customer-journey map offers a general human perspective, not specific to a particular user'
    ],
    correctAnswer: 'The experience map is agnostic of any specific products, while the customer-journey map is tied to a specific product or service'
}, {
    question: '5. Which of the following best describes the exhaustive-review eye-movement pattern?',
    answers: [
        'The eyes are repeatedly drawn to the top left corner of the webpage because the user wants to make sure that the page belongs to the right site',
        'The eyes are drawn to the same area of the page repeatedly because the UI violates user’s expectations',
        'The eyes systematically visit all the areas of the page in an effort not to miss anything',
        'The eyes thoroughly scan the area of the page that has the most content'
    ],
    correctAnswer: 'The eyes are drawn to the same area of the page repeatedly because the UI violates user’s expectations'
}, {
    question: '6. Which of the following does NOT usually appear in a service blueprint?',
    answers: [
        'Customer emotions',
        'Customer actions',
        'Processes',
        'Backstage actions'
    ],
    correctAnswer: 'Customer emotions'
}, {
    question: '7. Which of the following is true of quantitative research?',
    answers: [
        'It typically requires just 5 users',
        'It is used mostly for formative purposes, in the early stages of a design to inform design decisions',
        'It produces statistically meaningful results that are likely to be replicated in a different study',
        'It allows for flexible study conditions that can be adjusted from session to session according to the team’s needs'
    ],
    correctAnswer: 'It produces statistically meaningful results that are likely to be replicated in a different study'
}, {
    question: '8. Which part of a webpage receives most of the users’ fixations?',
    answers: [
        'Left half of the page',
        'Right half of the page',
        'Both sides of the page receive about an equal proportion of fixations',
        'It depends on the page level in the site’s IA hierarchy'
    ],
    correctAnswer: 'Left half of the page'
}, {
    question: 'What is one advantage of sliders for application design?',
    answers: [
        'They represent a more fun and engaging input method compared with other UI controls',
        'They allow users to explore the effect of the control for the whole range of the associated parameter',
        'They support precise selection of a specific value within a range',
        'They allow both fine and coarse parameter adjustment'
    ],
    correctAnswer: 'They allow users to explore the effect of the control for the whole range of the associated parameter'
}, {
    question: 'Which of the following is true of tree testing?',
    answers: [
        'It should be done before card sorting when both card sorting and tree testing are used',
        'It does not typically collect any quantitative measures',
        'It is devoid of any visual styling and does not reflect well the experience of interacting with the full design',
        'It can be used interchangeably with card sorting'
    ],
    correctAnswer: 'It is devoid of any visual styling and does not reflect well the experience of interacting with the full design'
}];

 // Game operations
var game = {
    questions: questionsList,
    currentQuestion: 0,
    seconds: 30,
    totalCorrectAnswers: 0,
    totalIncorrectAnswers: 0,
    totalUnansweredQuestions: 0,

    loadQuestion: function() {
        game.seconds = 30;
        timer = setInterval(game.countdown, 1000);

        // Add wrapper to which the the timer, questions and answers will be appended to

        $('.content-wrapper').html(
            '<div class="question-info-wrapper shadow">' +
            '<h1 class="mb-5 shadow bold-700" id="timer"><span id="seconds">30</span></h1>' +
            '</div>');
        $('.question-info-wrapper').append(
            '<h4 class="mb-5 bold-700">' + questionsList[game.currentQuestion].question +
            '</h4>');

        // For each answer, create a new button

        for (var i = 0; i < questionsList[game.currentQuestion].answers.length; i++) {
            $('.question-info-wrapper').append(
               '<div class="button-wrapper">' +
               '<button role="button" class="btn btn-secondary btn-lg answer-button light-blue-shadow hvr-wobble-horizontal" id="button-' + i + '" data-name="' + questionsList[game.currentQuestion].answers[i] + '">' +
               questionsList[game.currentQuestion].answers[i] +
               '</button>' +
               '</div>')
        }
    },

    countdown: function() {
        game.seconds --;
        $('#seconds').html(game.seconds);

        if (game.seconds <= 0) {
            game.timeUp();
        }
    },

    // Check to see if answer correct or not and cal the appropriate function

    clicked: function(e) {

        if ($(e.target).data('name') == questionsList[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();

        } else {
            game.answeredIncorrectly();
        }
    },

    // If correct, increase correct total and alert them, pause for a few so user can view message then load the next question

    answeredCorrectly: function() {
        game.totalCorrectAnswers++;
        $('.button-wrapper').empty();
        $('.question-info-wrapper').append(
            '<div class="text-center">' +
            '<img src="assets/img/correct.svg" class="mt-5 mb-5">' +
            '</div>'
        );
        if (game.currentQuestion == questionsList.length - 1) {
            setTimeout(game.results, 1 * 1500);
        } else {
            setTimeout(game.nextQuestion, 1 * 1500)
        }
    },

    // If in-correct, increase in-correct total and alert them, pause for a few so user can view message then load the next question

    answeredIncorrectly: function() {
        game.totalIncorrectAnswers++;
        $('.button-wrapper').empty();
        $('.question-info-wrapper').append(
            '<div class="text-center">' +
            '<img src="assets/img/incorrect.svg" class="mt-5 mb-5">' +
            '<h6 class="result-text mt-5 bold-700">Not Exactly...The answer was ' + questionsList[game.currentQuestion].correctAnswer + '</h6>' +
            '</div>'
        );
        if (game.currentQuestion == questionsList.length - 1) {
            setTimeout(game.results, 1 * 1500);
        } else {
            setTimeout(game.nextQuestion, 1 * 1500)
        }
    },

    // If time runs out, increase unanswered total and alert them, pause for a few so user can view message then load the next question

    timeUp: function() {
        clearInterval(timer);
        game.totalUnansweredQuestions++;
        $('.button-wrapper').empty();
        $('.question-info-wrapper').append(
            '<div class="text-center">' +
            '<img src="assets/img/incorrect.svg" class="">' +
            '<h6 class="result-text mt-5 bold-700">Ran out of time there I see. The answer was ' + questionsList[game.currentQuestion].correctAnswer + '</h6>' +
            '</div>'
        );
        if (game.currentQuestion == questionsList.length - 1) {
            setTimeout(game.results, 1 * 1500);
        } else {
            setTimeout(game.nextQuestion, 1 * 1500)
        }
    },

    // Load the next question

    nextQuestion: function() {
        clearInterval(timer);
        game.currentQuestion++;
        game.loadQuestion();
    },

    // After all question answered or time runs out, display the results to the user along with the option to restart

    results: function() {
        clearInterval(timer);
        $('.question-info-wrapper').empty();
        $('.question-info-wrapper').append(
            '<div class="text-center">' +
            '<img src="assets/img/score.svg" class="mb-5">' +
            '<h4 class="stats-text bold-700">Correct: ' + game.totalCorrectAnswers + '</h4>' +
            '<h4 class="stats-text bold-700">Incorrect: ' + game.totalIncorrectAnswers + '</h4>' +
            '<h4 class="stats-text bold-700">Unanswered: ' + game.totalUnansweredQuestions + '</h4>' +
            '<button type="button" class="btn btn-primary btn-lg shadow cta-button bold-700 mt-4" id="reset-button">START OVER</button>' +
            '</div>'
        );
    },

    // Restart the quiz

    reset: function() {
        game.currentQuestion = 0;
        game.seconds = 0;
        game.totalCorrectAnswers = 0;
        game.totalIncorrectAnswers = 0;
        game.totalUnansweredQuestions = 0;
        game.loadQuestion();
    }
};

// Start game

$('#start').on('click', function() {
    $('#start').remove();
    game.loadQuestion();
});

// Answer user selects
$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});

// Restart game

$(document).on('click', '#reset-button', function() {
    game.reset();
});