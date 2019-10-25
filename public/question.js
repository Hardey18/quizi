const verifyAnswer =  (answer) => {
    const correct = [];
    document.querySelectorAll(".question-selector")
        .forEach((questionSelector, index) => {
            const allInputs = questionSelector.querySelectorAll('input[type=radio]:checked')
            Array.from(allInputs)
                .forEach((inputEl) => { if (inputEl.value == questions[index].answer) {
                    correct.push(inputEl.value)
                }});
        });
    document.querySelector('#results').innerText = `Your result is: ${correct.length}/${questions.length}`;
}

const check = (id) => {
    event.preventDefault();
    const parent = event.target.parentNode;
    const selectedInput = parent.querySelector('input[type=radio]:checked');
    let isCorrect = false;
    const question = questions.find((_question) => _question.id == id);
    if (selectedInput && question) isCorrect = selectedInput.value == question.answer;

    let resultElement = parent.querySelector(`#result-${id}`);

    const resultText = isCorrect ? 'Correct!' : 'Wrong!';
    const resultClass = `${isCorrect ? 'correct' : 'wrong'}-answer'`;
    if (!resultElement) {
        resultElement = document.createElement('div');
        resultElement.id = `result-${id}`;
        parent.append(resultElement);
    }

    resultElement.innerText = resultText;
    resultElement.className = resultClass;
}

function view(id) {
    event.preventDefault();
    window.location.assign(`http://localhost:3000/question.html?id=${id}`);
}

