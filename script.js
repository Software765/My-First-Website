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
					hightlight(-1);
				}
				let choosenAnswer = -1;

				let hightlight = (Index) => {
					for (i = 0; i < 4; i++) {
						$("#choice" + i).removeClass("choosen");
					}
					if (Index >= 0) {
						choosenAnswer = Index;
						$("#choice" + Index).addClass("choosen");
						$("#checkAnswer").show();
					} else {
						choosenAnswer = -1
						$("#checkAnswer").hide();
					}
				}
				$("#choice0").click(() => {
					console.log("Clicked 0")
					hightlight(0)
				})	
				$("#choice1").click(() => {
					console.log("Clicked 1")
					hightlight(1)
				})
				$("#choice2").click(() => {
					console.log("Clicked 2")
					hightlight(2)
				})
				$("#choice3").click(() => {
					console.log("Clicked 3")
					hightlight(3)
				})

				let currentQuestion = 0;
				getQuestion(data.results[currentQuestion]);
				$("#nextQuestion").hide();
				$("#finalScore").html("0 / 15");

				let score = 0;

				$("#checkAnswer").click(() => {
					if (data.results[currentQuestion].correct_answer === $("#choice" + choosenAnswer).html()) {
						score++
						$("#finalScore").html("That's correct! " + score + "/15");
					} else {
						$("#finalScore").html("That's wrong. Sorry! " + score + "/15. The correct is " + (data.results[currentQuestion].correct_answer));
					}
					$("#nextQuestion").show();
					$("#checkAnswer").hide();
				})
				let ques = 1

				$("#nextQuestion").click(() => {
					currentQuestion++
					if (currentQuestion >= 15) {
						$("#finalScore").html("The quiz is over! You have scored " + score + "/15! Well done!");
					} else {
						getQuestion(data.results[currentQuestion]);
						$("#finalScore").html(score +"/15");
						ques++
						$("#moment").html("Question No. " + ques)
					}
					$("#nextQuestion").hide();
				})
			})
		})
	}
	let tries = 0
	$("#tries").html("Attempts: " + tries)

	$("#restart").click( () => {
		quiz.getQuiz()
		tries++
		$("#tries").html("Attempts: " + tries)
	})

	quiz.getQuiz()
})