var game = {

    questions: questionsList,
    currentQuestion: 0,
    clock: 30,
    totalCorrectAnswers: 0,
    totalIncorrectAnswers: 0,
    totalUnansweredQuestions: 0,


    loadQuestion: function() {

        game.clock = 30;
        timer = setInterval(game.countdown, 1000);
        $('body').html('<div class="main-wrapper"><ul class="nav justify-content-center"><li class="nav-item"><a class="nav-link disabled timer" href="#"><span id="clock">30</span><span></span></a></li></ul><div class="sub-wrapper text-center" id="subwrapper"><div class="container text-center questions-container"><div class="row text-center answers-container"></div></div></div></div>');
        $('.questions-container').prepend('<h2 class="question-text">' + questionsList[game.currentQuestion].question + '</h2>');

        // LOOP THROUGH QUESTIONS, MAKE BUTTONS AND APPEND TEXT
        for (var i = 0; i < questionsList[game.currentQuestion].answers.length; i++) {


            $('.answers-container').append(
                '<div class="col-sm"><button class="btn btn-outline-light answer-button" role="button" id="button-' + i + '" data-name="' + questionsList[game.currentQuestion].answers[i] + '">' + questionsList[game.currentQuestion].answers[i] + '</button></div>'

            );

        }

    },

    // HANDLE THE GAME'S TIMER

    countdown: function() {

        game.clock--;
        $('#clock').html(game.clock);

        if (game.clock <= 0) {

            game.timeUp();

        }
    },

    // AFTER USER SELECTS AN ANSWER, CHECK TO SEE IF THE ANSWER IS CORRECT OR NOT, (e) REPRESENTS WHAT THE ANSWER THE USER SELECTED

    clicked: function(e) {

        if ($(e.target).data('name') == questionsList[game.currentQuestion].correctAnswer) {

            game.answeredCorrectly();

        } else {

            game.answeredIncorrectly();

        }

    },

    // IF THE ANSWER WAS CORRECT - INCREASE THEIR CORRECT TOTAL AND LET THEM KNOW THEY WERE CORRECT VIA A MESSAGE
    // THEN CHECK TO SEE IF THERE ARE ANY MORE QUESTIONS, PAUSE FOR 1.5 SECS, IF NONE THEN SHOW THE USER THE RESULTS OTHERWISE LOAD THE NEXT QUESTION

    answeredCorrectly: function() {

        game.totalCorrectAnswers++;
        $('body').html('<div class="main-wrapper"><div class="sub-wrapper text-center" id="subwrapper"></div></div>');
        $('.sub-wrapper').append('<img src="assets/img/correct-face.svg" class="face">').append('<h2 class="result-text">"Correct!"</h2><br>');

        if (game.currentQuestion == questionsList.length - 1) {

            setTimeout(game.results, 1 * 1500);

        } else {

            setTimeout(game.nextQuestion, 1 * 1500)

        }

    },

    // IF THE ANSWER WAS INCORRECT - INCREASE THEIR INCORRECT TOTAL AND LET THEM KNOW THEY WERE INCORRECT AND WHAT THE CORRECT ANSWER WAS VIA A MESSAGE
    // THEN CHECK TO SEE IF THERE ARE ANY MORE QUESTIONS, PAUSE FOR 1.5 SECS, IF NONE THEN SHOW THE USER THE RESULTS OTHERWISE LOAD THE NEXT QUESTION

    answeredIncorrectly: function() {

        game.totalIncorrectAnswers++;
        $('body').html('<div class="main-wrapper"><div class="sub-wrapper text-center" id="subwrapper"></div></div>');
        $('.sub-wrapper').append('<img src="assets/img/incorrect-face.svg" class="face">').append('<div class="container"><h2 class="result-text">The correct answer is <span class="result-text-black"> " ' + questionsList[game.currentQuestion].correctAnswer + ' "</span></h2></div>');

        if (game.currentQuestion == questionsList.length - 1) {

            setTimeout(game.results, 1 * 1500);

        } else {

            setTimeout(game.nextQuestion, 1 * 1500)

        }

    },

    // IF THE USER RUNS OUT OF TIME (DID NOT ANSWER QUESTION) - INCREASE THEIR UNANSWERED TOTAL AND LET THEM KNOW THEY ARE OUT OF TIME AND WHAT THE CORRECT ANSWER WAS
    // THEN CHECK TO SEE IF THERE ARE ANY MORE QUESTIONS, PAUSE FOR 1.5 SECS, IF NONE THEN SHOW THE USER THE RESULTS OTHERWISE LOAD THE NEXT QUESTION

    timeUp: function() {
        clearInterval(timer);
        game.totalUnansweredQuestions++;
        $('body').html('<div class="main-wrapper"><div class="sub-wrapper text-center" id="subwrapper"></div></div>');
        $('.sub-wrapper').append('<h1>Out of time!</h1>').append('<h2 class="result-text">The correct answer is " ' + questionsList[game.currentQuestion].correctAnswer + ' "</h2>');

        if (game.currentQuestion == questionsList.length - 1) {

            setTimeout(game.results, 1 * 1500);

        } else {

            setTimeout(game.nextQuestion, 1 * 1500);

        }
    },

    // LOAD THE NEXT QUESTION, MAKE SURE AND MOVE UP ONE SO THE SAME QUESTION ISN'T ASKED A SECOND TIME

    nextQuestion: function() {

        clearInterval(timer);
        game.currentQuestion++;
        game.loadQuestion();

    },

    // AFTER ALL THE QUESTIONS HAVE BEEN ASKED DISPLAY THE RESULTS TO THE USER
    // THE USER IS ALSO PRESENTED WITH A BUTTON THEY CAN CLICK TO RESTART THE GAME OF THEY CHOOSE

    results: function() {

        clearInterval(timer);

        $('body').html('<div class="main-wrapper"><div class="sub-wrapper text-center" id="subwrapper"></div></div>');

        $('.sub-wrapper').append('<img src="assets/img/incorrect-face.svg" class="face">').append('<h2 class="end-text">"All Done!"</h2>')
            .append('<br><h4>Correct: ' + game.totalCorrectAnswers + '</h4>').append('<h4>Incorrect: ' + game.totalIncorrectAnswers + '</h4>').append('<h4>Unanswered: ' + game.totalUnansweredQuestions + '</h4>').append('<a class="btn btn-outline-light start-button" role="button" id="reset"><img src="assets/img/arrow-reload.svg" class="icons"></a>');
    },

    // RESET THE GAME FROM SCRATCH AND START LOADING THE QUESTIONS ALL OVER AGAIN

    reset: function() {

        game.currentQuestion = 0;
        game.clock = 0;
        game.totalCorrectAnswers = 0;
        game.totalIncorrectAnswers = 0;
        game.totalUnansweredQuestions = 0;
        game.loadQuestion();
    }

};

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


// ONLICK TO START GAME
$('#start').on('click', function() {

    $('#start').remove();
    game.loadQuestion();

});

// ONCLICK TO RESET GAME

$(document).on('click', '#reset', function() {

    game.reset();

});

// THIS IS THE BUTTON THE USER CLICKS TO SELECT AN ANSWER. THE VALUE OF THE BUTTON IS PASSED THROUGH (e).
// CLICKING THIS BUTTON INITIATES THE CHECK TO SEE IF THE USER ANSWER WAS CORRECT OR NOT

$(document).on('click', '.answer-button', function(e) {

    game.clicked(e);

});