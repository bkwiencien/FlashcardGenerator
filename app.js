var inquirer = require("inquirer");
var done = false;
var BasicCard = require("./BasicCard");
var clozecard = require("./ClozeCard");
var mainLoop = function() {
 inquirer.prompt([{
   	name: 'fnct',
	type: 'list',
	message: "What do you want to do?",
	choices: ['create basic card','create cloze card','exit'],
	}]).then((answers)=> {
		console.log("I got here " + answers.fnct);
		if (answers.fnct == "create basic card"){
			createBasicCard();
		}
	});
}
	function createBasicCard() {
		var myanswer = ""; 
		var myquestion = "";
		console.log("create basic card");
		inquirer.prompt([{
			name:'question',
			type: 'input',
			message: 'enter the question'
		},{
			name: 'answer0',
			type: 'input',
			message: 'enter answer',
           }]).then((answers)=> {
           	console.log(answers.question);
           	console.log(answers.answer0);
           	myquestion = answers.question;
           	myanswer   = answers.answer0;
           	var toto = new BasicCard(myquestion,myanswer);
           	console.log("in toto " + toto.front);
           	toto.logit();
           });
           //mainLoop()		
	}
	function createClozeCard() {
		console.log("create cloecard");
		//mainLoop();
	}
	mainLoop();