var quizContainer = document.getElementById('orders');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var questions = document.getElementById('');

function showResults(questions, quizContainer, resultsContainer) {
    var answer = document.getElementById('answer')
    var answerContainers = answer.val();

    var userAnswer = '';
    var numCorrect = 0;

    for (var i = 0; i < questions.length; i++) {
        //find selected answer
        var rates = document.getElementById('user').value;
        var userAnswer;
        if(document.getElementById('r1').checked) {
            userAnswer = document.getElementById('r1').value;
        }else if(document.getElementById('r2').checked) {
            userAnswer = document.getElementById('r2').value;
        }else if(document.getElementById('r3').checked) {
            userAnswer = document.getElementById('r3').value;
        }else if(document.getElementById('r4').checked) {
            userAnswer = document.getElementById('r4').value;
        }
        return userAnswer;

        //if user answer is correct
        if(userAnswer === answerContainers[i]) {
            //add to the number of correct answers
            numCorrect++;

            //color the answer green
            answerContainers[i].style.color = 'red';
        }
    }

    //show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}

//on submit, show result
submitButton.onclick = function() {
    showResults(questions, quizContainer, resultsContainer);
}