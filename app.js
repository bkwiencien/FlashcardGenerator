var inquirer = require("inquirer");
var done = false;
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
           });
           //mainLoop()		
	}
	function createClozeCard() {
		console.log("create cloecard");
		//mainLoop();
	}
	mainLoop();