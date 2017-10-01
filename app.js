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
	choices: ['create basic card','create cloze card','clear questions','show cards','exit'],
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
    if (answers.fnct == "show cards"){
      showCards();
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
  function showCards() {
    var ii = 0;
    var yourAnswer = "";
    var flashCards = [];
    var arrayOfText = [];
    var lineOfData = "";
    var type = "";
    var dd   = "";
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
      status = "Nothing to show create flash cards first";
    mainLoop();
    }
    //status = "The Flash cards created are \n";
    console .log("The Flash cards created are:");
    for  (j=0;j<flashCards.length;j++){
      var w = flashCards[j];
      if (w.type=="basic"){
        console.log("type = " + w.type + " question " + w.front + " answer " + w.back);
        //status = status + "type = " + w.type + " question " + w.front + " answer " + w.back + "\n";
      }
      if (w.type=="clozen") {
        console.log("type = " + w.type + " partial " + w.partial + " cloze " + w.cloze);
        //status = status + "type = " + w.type + " partial " + w.partial + " cloze " + w.cloze + "\n";
      }
    }
    mainLoop();
  }
  