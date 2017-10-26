$(document).ready(() => {
	let getQuiz = () => {
		console.log("Getting quiz..")
		$.getJSON("https://opentdb.com/api.php?amount=15&category=15&type=multiple", (data) => {
		console.log("Got quiz")
		console.log(data)
	}
})