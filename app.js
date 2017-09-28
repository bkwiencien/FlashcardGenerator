var inquirer = require("inquirer");
var done = false;
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var fs = require("fs");
var status = "";
var mainLoop = function() {
 console.log(status);
 inquirer.prompt([{
   	name: 'fnct',
	type: 'list',
	message: "What do you want to do?",
	choices: ['create basic card','create cloze card','exit'],
	}]).then((answers)=> {
		if (answers.fnct == "create basic card"){
			createBasicCard();
		}
		if (answers.fnct == "create cloze card"){
			createClozeCard();
		}
	});
}
	function createBasicCard() {
		var myanswer = ""; 
		var myquestion = "";
		inquirer.prompt([{
			name:'question',
			type: 'input',
			message: 'enter the question',
			validate: function(input) {
                    if (input === '') {
                        console.log('Please provide a question');
                        return false;
                    } else {
                        return true;
                    }
                }

		},{
			name: 'answer0',
			type: 'input',
			message: 'enter answer',
			validate: function(input) {
                    if (input === '') {
                        console.log('Please provide an answer');
                        return false;
                    } else {
                        return true;
                    }
                }

           }]).then((answers)=> {
           	myquestion = answers.question;
           	myanswer   = answers.answer0;
           	var toto = new BasicCard(myquestion,myanswer);
           	toto.logit();
           	status = "status: success";
           	mainLoop();
           });	
	}
	function createClozeCard() {
		var myFullQuestion = "";
		var myCloze = "";
		var myPartial = "";
		var indexo = 0;
		var errMessage = "";
		inquirer.prompt([{
			name: 'fullquestion',
			type: 'input',
			message: 'enter full question',
			validate: function(input) {
                    if (input === '') {
                        console.log('Please provide a question');
                        return false;
                    } else {
                        return true;
                    }
                }
	      },{
            name: 'clozepart',
            type: 'input',
            message: 'enter cloze',
            validate: function(input) {
                    if (input === '') {
                        console.log('Please input the cloze');
                        return false;
                    } else {
                        return true;
                    }
                }
		}]).then((answers)=> {
			myFullQuestion = answers.fullquestion;
			myCloze        = answers.clozepart;
			myPartial = myFullQuestion.replace(myCloze, '.....');
			indexo = myFullQuestion.indexOf(myCloze);
			if (indexo > -1 ){
			  var clozeObj = new ClozeCard(myFullQuestion,myCloze,myPartial);
			  clozeObj.logit();
			  status = "status: success";
			} else {
               errMessage = "cloze " + myCloze + " not found in string";
               logError(errMessage);
               status = "status: last operstion failed " + errMessage;
			}  
			mainLoop();
		});
	}
	function logError(erro){
		fs.appendFile("error.txt", erro + '\n', "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
	}
	mainLoop();