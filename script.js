$(document).ready(() => {
	console.log("The quiz has been rendered.")
	let quiz = {
		getQuiz : (() => {
			console.log("Trying to get the quiz.");
			$.getJSON("https://opentdb.com/api.php?amount=15&category=15&type=multiple", (data) => {
				console.log("Got the quiz!");
				console.log(data)
			})
		})
	}
	quiz.getQuiz()
})