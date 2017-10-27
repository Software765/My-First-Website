$(document).ready(() => {
	console.log("The quiz has been rendered.")
	let quiz = {
		getQuiz : (() => {
			console.log("Trying to get the quiz.");
			$.getJSON("https://opentdb.com/api.php?amount=15&category=15&type=multiple", (data) => {
				console.log("Got the quiz!");
				console.log(data)

				let getQuestion = (question) => {
					console.log(question);
					$("#questions").html(question.question)
					let correctChoice = Math.floor(Math.random() * 4);
					console.log(correctChoice + " was picked");
					for (i = 0; i < 4; i++) {
						if (correctChoice === i) {
							$("#choice" + i).html(question.correct_answer);
						} else {
							$("#choice" + i).html(question.incorrect_answers.pop());
						}
					}
				}
				let currentQuestion = 0;
				getQuestion(data.results[currentQuestion]);
				$("#nextQuestion").hide();
				$("#finalScore").html("0 / 10")
			})
		})
	}
	quiz.getQuiz()
})