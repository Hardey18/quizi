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
        // if(inputEl.value == questions[index].answer) { 
        //     $('.check').on('click', function() {
        //         $('#slide').slideUp('slow');
        //     });
        // }
    document.querySelector('#results').innerText = `Your result is: ${correct.length}/${questions.length}`
}
