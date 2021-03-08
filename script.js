// Initiate variables 
var impostors = 1;
var crewmates = 10;
var chances = [];
var players = ["blue", "cyan", "green", "yellow", "orange", "red", "purple", "pink", "white", "brown"];
var drawImpostor = [];
var currentSelection = [];
var pastSelection = [];
var numberDraw = 0;

function impostor(number) {

    // Change the number of impostors
    impostors = number;

    // Change visually the selected number of impostors
    for (i=1; i<=3; i++){
        var numbImp = "imp" + i;
        if (i != number) {
            document.getElementById(numbImp).style.border="0 solid white"; 
        } else {
            document.getElementById(numbImp).style.border="3px solid white";
        }
    }

    // Say which number of crewmates will be gray out depending on the number of impostors
    if (number == 1){
        var grayoutNumber = 4;
    } else if (number == 2){
        var grayoutNumber = 7;
    } else if (number == 3){
        var grayoutNumber = 9;
    }

    // If the numbers of selected crewmates if lower than allowed, they push it higher
    if (crewmates < grayoutNumber) {
            crewmates = grayoutNumber;
            selectCrew(grayoutNumber);
    }

    // Applying grayout
    for (i=4; i<=8; i++){
        var numbCrew = "crew" + i;
        if (i < grayoutNumber) {
            document.getElementById(numbCrew).disabled=true;
            document.getElementById(numbCrew).style.color="gray";
        } else {
            document.getElementById(numbCrew).disabled=false;
            document.getElementById(numbCrew).style.color="white";
        }
    }

    displayCrewImp(crewmates, impostors);
}


function crew(number) {

    // Change the number of crewmates
    crewmates = number;

    // Change visually the selected number of crewmates
    selectCrew(number);


    displayCrewImp(crewmates, impostors);
}



function selectCrew(number) {
    // Change visually the selected number of crewmates
    for (i=4; i<=10; i++){
        var numbCrew = "crew" + i;
        if (i != number) {
            document.getElementById(numbCrew).style.border="0 solid white"; 
        } else {
            document.getElementById(numbCrew).style.border="3px solid white";
        }
    }
}



function displayCrewImp(crew, imp){
    // Change visually the selected number of impostors
    for (i=1; i<=3; i++) {
        var imgImp = "img-imp" + i;
        if (i <= imp) {
            document.getElementById(imgImp).style.display="inline-block";
        } else {
            document.getElementById(imgImp).style.display="none";
        }
    }

    for (i=1; i<=9; i++) {
        var imgCrew = "img-crew" + i;
        var number = crew - imp;
        if (i <= number) {
            document.getElementById(imgCrew).style.display="inline-block";
        } else {
            document.getElementById(imgCrew).style.display="none";
        }
    }

}

/* On click on the button Confirm */
function validate() {
    /* The popup closes */
    document.getElementById("overlay").style.display="none";

    /* Make visible the players selected and populate the array chances and drawImpostor */
    for (i=0;i<crewmates;i++){
        var number = "hidden" + (i+1);
        document.getElementById(number).style.display="inline-block";
        chances.push(10);
        drawImpostor.push(0);
        pastSelection.push(" ");
    } 

    /* Push the informations of impostors and crewmates on the page */
    document.getElementById("nbimpostors").innerHTML = impostors;
    document.getElementById("nbcrewmates").innerHTML = crewmates;
}



function selection(){

    numberDraw += 1;

    // Put all the votes in an array
    var selectImp = [];
    for (i=0;i<crewmates;i++) {
        for (j=0;j<chances[i];j++) {
            selectImp.push(players[i]);
        }
    }

    // Randomly select impostors
    var impostorsResult = [];
    for (i=0; i<impostors; i++) {
       var inter;
       do {
           inter = selectImp[Math.floor(Math.random()*selectImp.length)];
       } while (impostorsResult.includes(inter));

       impostorsResult.push(inter);
    }

    currentSelection = [];
    for (i=0;i<crewmates;i++){

        // Pushing info on the current draw
        if (impostorsResult.includes(players[i])){
            currentSelection.push("impostor");
            drawImpostor[i] += 1;
        } else {
            currentSelection.push("crewmate");
        }

        // Changing the odds regarding the draw
        if (pastSelection[i] != " " && currentSelection[i] != pastSelection[i]) {
            chances[i] = 10;
        }
        
        if (currentSelection[i] == "impostor") {
            chances[i] -= 1;
        } else if (currentSelection[i] == "crewmate") {
            chances[i] += 1;
        }

        // Pushing infos in HTML
        var role = "role" + (i + 1) ;
        document.getElementById(role).innerHTML= currentSelection[i];
        if (currentSelection[i] == "impostor") {
            document.getElementById(role).style.color= "red";
        } else {
            document.getElementById(role).style.color= "white";
        }

        var currentChances = "chance" + (i+1);
        document.getElementById(currentChances).innerHTML= chances[i];

    }

    pastSelection = currentSelection;

}
