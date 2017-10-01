var inquirer = require("inquirer");
var done = false;
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var fs = require("fs");
var os = require("os");
var eline = "\n";
var status = "";
var numberCorrect = 0;
var numberWrong   = 0;
var mainLoop = function() {
 console.log(status);
 inquirer.prompt([{
   	name: 'fnct',
	type: 'list',
	message: "What do you want to do?",
	choices: ['create basic card','create cloze card','clear questions','study','exit'],
	}]).then((answers)=> {
		if (answers.fnct == "create basic card"){
			createBasicCard();
		}
		if (answers.fnct == "create cloze card"){
			createClozeCard();
		}
    if (answers.fnct == "clear questions"){
      clearQuestions();
    }
    if (answers.fnct == "study"){
      study();
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
		fs.appendFile("error.txt", erro + eline, "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
	}
	determineOS();
	mainLoop();
	function determineOS() {
	   var array = ["BasisCard","ClozeCard"];
	   var obj =  "";
	   var myOs = os.platform();
       if (myOs == "darwin") {
       	  eline = "\n";
       } else {
       	  eline = "\r\n";
       }
       	 BasicCard.prototype.determineOS = function(){
       	 	this.myOS = os.platform
       	 	if (this.myOS == "darwin"){
       	 		this.eline = "\n";
       	 	} else {
       	 		this.eline = "\r\n";
       	 	}

       	 };
       	 ClozeCard.prototype.determineOS = function(){
       	 	this.myOS = os.platform
       	 	if (this.myOS == "darwin"){
       	 		this.eline = "\n";
       	 	} else {
       	 		this.eline = "\r\n";
       	 	}

       	 };
       BasicCard.prototype.determineOS();
       ClozeCard.prototype.determineOS();
	}
  function clearQuestions() {
    fs.writeFile("log.txt", "", "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    fs.writeFile("error.txt","", "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    mainLoop();

  }
  function study() {
    var yourAnswer = "";
    var flashCards = [];
    var arrayOfText = [];
    var lineOfData = "";
    var type = "";
    var dd   = "";
    console.log("in study");
//  begin read logic
    var lines = require('fs').readFileSync('log.txt', 'utf-8')
    .split(eline)
    .filter(Boolean);
    var leno = lines.length;
    arrayOfText = lines.slice("@");
    for (k=0;k<arrayOfText.length;k++){
      arrayOfText[k] = arrayOfText[k].replace('@','');
      dd  = JSON.parse(arrayOfText[k]);
      flashCards.push(dd);
    }
//  end of read logic
    if (arrayOfText.length == 0){
      status = "Nothing to study create flash cards first";
    mainLoop();
    }
    for (i=0;i<flashCards.length;i++) {
      var work = flashCards[i];
      switch (work.type){
        case "basic":
        inquirer.prompt([{
      name:'question',
      type: 'input',
      message: work.front
      }]).then((answers)=> {
        yourAnswer = answers.question;
        if (yourAnswer == work.back){
          numberCorrect++;
        } else {
          numberWrong++;
        }
      });  
        break;
        case "clozed":
         inquirer.prompt([{
          name:'question1',
          type: 'input',
          message: work.partial
      }]).then((answers)=> {
        yourAnswer = answers.question1;
        if (yourAnswer == work.cloze){
          numberCorrect++;
        } else {
          numberWrong++;
        }
      });  
      
        break;
      }
    }
  }
  