var pinkCellList = [9, 11, 13, 19, 25, 31, 37, 39, 41];
var whiteCellList = [1, 4, 7, 10, 12, 15, 21, 23, 27, 29, 35, 38, 40, 43, 46, 49];

var numberOfPlayers = 2;

var selectedPlayer = 1;

var player1Cells = 0;
var player2Cells = 0;
var cellLimit = 10;

var buttonsAdded = false;
var scoreTableAdded = false;

var autoScore = false;
var ipadMode = false;
var phoneMode = false;

document.body.onload = createTable;


function createTable(){
    //var gameBoard = document.getElementById("myTable");
    var gameBoard = document.createElement("TABLE");
    gameBoard.id = "gameBoard";
    gameBoard.classList.add("gameBoard");
    document.getElementById("tableDiv").insertAdjacentElement("beforeend",gameBoard);

    var cellNo = 49;

    for (var row = 7; row > 0; row--){
        var thisRow = gameBoard.insertRow(0);
        for (var col = 7; col > 0; col--){
            var thisCell = thisRow.insertCell(0);
            //thisCell.innerText = cellNo;
            thisCell.id = "cell".concat(cellNo);
            thisCell.setAttribute("cellId", cellNo);
            thisCell.setAttribute("inHLine", "false");
            thisCell.setAttribute("inVLine", "false");
            thisCell.setAttribute("inHVLine", "false");

            if (ipadMode){
                thisCell.classList.add("iPadGameBoardCell");
            } else if (phoneMode){
                thisCell.classList.add("phoneGameBoardCell");
            } else {
                thisCell.classList.add("gameBoardCell");
            }
            thisCell.addEventListener('click', cellClick);
            if (pinkCellList.includes(cellNo)){
                thisCell.classList.add("pink");
                thisCell.setAttribute("scoreValue", "3");
            } else if (whiteCellList.includes(cellNo)){
                thisCell.classList.add("white");
                thisCell.setAttribute("scoreValue", "1");
            } else {
                thisCell.classList.add("black");
                thisCell.setAttribute("scoreValue", "2");
            }
            thisCell.setAttribute("occupiedBy", "");
            cellNo = cellNo - 1;
        }
    }
    if (!buttonsAdded){
        addButtons();
    }

    if (!scoreTableAdded){
        addScoreTable();
    }
}

function addScoreTable(){
    var scoreTable = document.createElement("TABLE");
    scoreTable.classList.add("scoreTable");
    scoreTable.id = "scoreTable";
    document.getElementById("scoreTableDiv").insertAdjacentElement("beforeend",scoreTable);
    scoreTable = document.getElementById("scoreTable");

    for (var rows = 0; rows < 5; rows++){
        var currentRow = scoreTable.insertRow(0);
        for (var col = 0; col <= numberOfPlayers; col++){
            let currentCell = currentRow.insertCell(0);
            currentCell.classList.add("scoreCell");
        }
    }

    for (var col = 1; col <= numberOfPlayers; col++){
        scoreTable.rows[0].cells[col].innerText = "Player ".concat(col);
    }

    scoreTable.rows[1].cells[0].innerText = "Horizontal lines"
    scoreTable.rows[2].cells[0].innerText = "Vertical lines"
    scoreTable.rows[3].cells[0].innerText = "Individual squares"
    scoreTable.rows[4].cells[0].innerText = "Total"

    scoreTableAdded = true;
}

function addButtons(){

    function createLineBreak() {
        var lineBreak = document.createElement("br");
        lineBreak.className = "settingsLineBreak";
        return lineBreak;
    }

    for (var i = 1; i <= numberOfPlayers; i++){
        var playerButton = document.createElement("button");
        var currentButton = document.getElementById("playerButtDiv").insertAdjacentElement('beforeend', playerButton);
        currentButton.innerText = "Player ".concat(i);
        currentButton.id = "playerButton".concat(i);
        currentButton.className = "playerButton";
        currentButton.setAttribute("playerID", i);
        currentButton.addEventListener('click', playerButtonClick);
        if (i % 2 === 0){
            document.getElementById("playerButtDiv").insertAdjacentElement('beforeend', createLineBreak());

        }
    }

    document.getElementById("playerButton".concat(selectedPlayer)).classList.add("selectedButton");

    var scoreButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', scoreButton);
    scoreButton.innerText = "Score";
    scoreButton.id = "scoreButton";
    scoreButton.className = "scoreButton";
    scoreButton.classList.add("buttonsToBeMoved");
    scoreButton.addEventListener('click', scoreButtonClick);

    var resetButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', resetButton);
    resetButton.innerText = "Reset";
    resetButton.id = "resetButton";
    resetButton.className = "resetButton";
    resetButton.classList.add("buttonsToBeMoved");
    resetButton.addEventListener('click', resetButtonClick);

    document.getElementById("resetButton").insertAdjacentElement('afterend', createLineBreak());

    var manScoreButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', manScoreButton);
    manScoreButton.innerText = "Manual Scoring";
    manScoreButton.id = "manScoreButton";
    manScoreButton.className = "resetButton";
    manScoreButton.classList.add("selectedButton");
    manScoreButton.classList.add("buttonsToBeMoved");
    manScoreButton.addEventListener('click', autoScoreButtonClick);

    var autoScoreButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', autoScoreButton);
    autoScoreButton.innerText = "Automatic Scoring";
    autoScoreButton.id = "autoScoreButton";
    autoScoreButton.className = "resetButton";
    autoScoreButton.classList.add("buttonsToBeMoved");
    autoScoreButton.addEventListener('click', autoScoreButtonClick);

    document.getElementById("autoScoreButton").insertAdjacentElement('afterend', createLineBreak());

    var resizeButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', resizeButton);
    resizeButton.innerText = "Resize for iPad";
    resizeButton.id = "resizeButton";
    resizeButton.className = "resetButton";
    resizeButton.classList.add("buttonsToBeMoved");
    resizeButton.addEventListener('click', resizeButtonClick);

    var resizePhoneButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', resizePhoneButton);
    resizePhoneButton.innerText = "Resize for iPhone";
    resizePhoneButton.id = "resizePhoneButton";
    resizePhoneButton.className = "resetButton";
    resizePhoneButton.addEventListener('click', resizePhoneButtonClick);

    buttonsAdded = true;

}

function resizePhoneButtonClick(){
    var buttons = document.getElementsByClassName("buttonsToBeMoved");
    var playerButtons = document.getElementsByClassName("playerButton");
    var lineBreaks = document.getElementsByClassName("settingsLineBreak");


    for (lBreak of buttons){
        document.getElementById("playerButtDiv").appendChild(lBreak);
        lBreak.classList.add("phoneButton");
    }

    for (lBreak of playerButtons){
        lBreak.classList.add("phoneButton");
    }

    for (lBreak of lineBreaks){
        lBreak.remove();
    }

    var rowList = document.getElementById("gameBoard").rows;

    phoneMode = true;

    for (var row of rowList){
        for (var cell of row.cells){
            cell.classList.remove("gameBoardCell");
            cell.classList.add("phoneGameBoardCell");
        }
    }

    document.getElementById("autoScoreButton").innerText = "Auto Score";
    document.getElementById("manScoreButton").innerText = "Man. Score";

    document.getElementById("resizePhoneButton").remove();
    document.getElementById("resizeButton").remove();

}

function resizeButtonClick(){
    var rowList = document.getElementById("gameBoard").rows;

    ipadMode = true;

    for (var row of rowList){
        for (var cell of row.cells){
            cell.classList.remove("gameBoardCell");
            cell.classList.add("iPadGameBoardCell");
        }
    }

    document.getElementById("resizeButton").remove();
    document.getElementById("resizePhoneButton").remove();


}

function autoScoreButtonClick(passedMouseEvent){
    if (passedMouseEvent.target.id === "manScoreButton"){
        autoScore = false;
        document.getElementById("scoreButton").disabled = false;
    } else {
        autoScore = true;
        document.getElementById("scoreButton").disabled = true;
    }

    for (button of document.getElementsByClassName("resetButton")){
        button.classList.remove("selectedButton");
    }

    passedMouseEvent.target.classList.add("selectedButton");
}

function cellClick(passedMouseEvent){
    try{
        document.getElementById("resizePhoneButton").remove();
        document.getElementById("resizeButton").remove();
    } catch(err){

    }


    console.log(passedMouseEvent);
    var clickedCell = passedMouseEvent.target;

    if (clickedCell.innerText === ""){
        if (eval("player" + selectedPlayer +"Cells") < cellLimit){
            clickedCell.innerText = selectedPlayer;
            console.log(eval("player" + selectedPlayer +"Cells"));
            eval("player" + selectedPlayer +"Cells++");
            clickedCell.setAttribute("occupiedBy", selectedPlayer);
        } else {
            alert("You can only select " + cellLimit + " cells!");
        }
    } else if (clickedCell.innerText === selectedPlayer.toString()){
        clickedCell.innerText = "";
        eval("player" + selectedPlayer +"Cells--");
        clickedCell.setAttribute("occupiedBy", "");
    } else {
        if (eval("player" + selectedPlayer +"Cells") < cellLimit) {
            eval("player" + clickedCell.innerText +"Cells--");
            clickedCell.innerText = selectedPlayer;
            eval("player" + selectedPlayer +"Cells++");
            clickedCell.setAttribute("occupiedBy", selectedPlayer);
        } else {
            alert("You can only select " + cellLimit + " cells!");
        }
    }

    console.log("player one has", player1Cells);
    console.log("player two has", player2Cells);


    if (autoScore){

        var allRows = document.getElementById("gameBoard").rows

        for (row of allRows){
            for (cell of row.cells){

                cell.classList.remove("indiCell");
                cell.classList.remove("hLineCell");
                cell.classList.remove("vLineCell");
                cell.classList.remove("hvLineCell");
                cell.setAttribute("inHLine", "false");
                cell.setAttribute("inVLine", "false");
                cell.setAttribute("inHVLine", "false");
            }

        }


        scoreButtonClick();

    }
}

function playerButtonClick(passedMouseEvent){
    selectedPlayer = passedMouseEvent.target.attributes.playerID.nodeValue;
    for (button of document.getElementsByClassName("playerButton")){
        button.className = "playerButton";
        if (phoneMode){
            button.classList.add("phoneButton");
        }
    }
    passedMouseEvent.target.classList.add("selectedButton");

}

function scoreButtonClick(){
    var scoreTable = document.getElementById("scoreTable");


    if (player1Cells !== 10 || player2Cells !== 10){
        scoreTable.rows[0].cells[0].innerText = "Tokens Missing!";
        scoreTable.rows[0].cells[0].style.color = "red";
    } else {
        scoreTable.rows[0].cells[0].innerText = "All tokens placed";
        scoreTable.rows[0].cells[0].style.color = "green";
    }


    for (var i = 0; i < 50; i++){
        console.log("");
    }
    var hLineScores = (scoreLines(processHlines(findHorizontalLines())));
    var vLineScores = (scoreLines(processVLines(findVerticalLines())));
    var squareScores = (findIndividualSquares());

    console.log(hLineScores);
    console.log(vLineScores);
    console.log(squareScores);

    if (hLineScores == undefined){
        hLineScores = {player1Score: 0, player2Score: 0, player3Score: 0, player4Score: 0};
    }

    if (vLineScores == undefined){
        vLineScores = {player1Score: 0, player2Score: 0, player3Score: 0, player4Score: 0};
    }

    var p1Score = hLineScores.player1Score + vLineScores.player1Score + squareScores.player1Score;
    var p2Score = hLineScores.player2Score + vLineScores.player2Score + squareScores.player2Score;
    var p3Score = hLineScores.player3Score + vLineScores.player3Score + squareScores.player3Score;
    var p4Score = hLineScores.player4Score + vLineScores.player4Score + squareScores.player4Score;


    scoreTable.rows[1].cells[1].innerText = hLineScores.player1Score;
    scoreTable.rows[2].cells[1].innerText = vLineScores.player1Score;
    scoreTable.rows[3].cells[1].innerText = squareScores.player1Score;
    scoreTable.rows[4].cells[1].innerText = p1Score;

    scoreTable.rows[1].cells[2].innerText = hLineScores.player2Score;
    scoreTable.rows[2].cells[2].innerText = vLineScores.player2Score;
    scoreTable.rows[3].cells[2].innerText = squareScores.player2Score;
    scoreTable.rows[4].cells[2].innerText = p2Score;




    console.log(p1Score);


}

function resetButtonClick(){
    /*for (tableRow of document.getElementById("gameBoard").rows){
        for (rowCell of tableRow.cells){
            rowCell.innerText = "";
            rowCell.setAttribute("occupiedBy", "");
        }
    }*/

    var scoreTable = document.getElementById("scoreTable");
    for (var i = 1; i < 5; i++){
        for (var col = 1; col <= numberOfPlayers; col++){
            scoreTable.rows[i].cells[col].innerText = "0";
        }
    }

    document.getElementById("gameBoard").remove();
    createTable();
    document.getElementById("scoreTable").rows[0].cells[0].innerText = "";


    player1Cells = 0;
    player2Cells = 0;

}

function findHorizontalLines(){
    console.log("looking for h lines");
    var hLineCells = [];
    for (tableRow of document.getElementById("gameBoard").rows){
        var hLineRowCells = [];
        for (var col = 0; col < 7; col++){
            if (tableRow.cells[col].getAttribute("occupiedBy") !== ""){
                tableRow.cells[col].classList.remove("indiCell");
                if (0 < col && col < 6){
                    if (tableRow.cells[col].innerText === tableRow.cells[col+1].innerText || tableRow.cells[col].innerText === tableRow.cells[col-1].innerText){
                        tableRow.cells[col].classList.add("hLineCell");
                        hLineRowCells.push(parseInt(tableRow.cells[col].getAttribute("cellId")));
                        tableRow.cells[col].setAttribute("inHLine", "true");
                    }
                } else if (col > 5) {
                    if (tableRow.cells[col].innerText === tableRow.cells[col-1].innerText){
                        tableRow.cells[col].classList.add("hLineCell");
                        hLineRowCells.push(parseInt(tableRow.cells[col].getAttribute("cellId")));
                        tableRow.cells[col].setAttribute("inHLine", "true");
                    }
                } else if (col < 1) {
                    if (tableRow.cells[col].innerText === tableRow.cells[col+1].innerText){
                        tableRow.cells[col].classList.add("hLineCell");
                        hLineRowCells.push(parseInt(tableRow.cells[col].getAttribute("cellId")));
                        tableRow.cells[col].setAttribute("inHLine", "true");
                    }
                }
            }
        }
        if (hLineRowCells.length !==0){
            hLineCells.push(hLineRowCells);
        }
    }
    console.log(hLineCells);
    return hLineCells;
}

function findVerticalLines() {
    console.log("looking for v lines");
    var vLineCells = [];
    var gameTable = document.getElementById("gameBoard");
    for (var row = 0; row < 7; row++) {
        var vLineRowCells = [];
        for (var col = 0; col < 7; col++) {
            if (gameTable.rows[row].cells[col].getAttribute("occupiedBy") !== "") {
                if (0 < row && row < 6) {
                    if (gameTable.rows[row].cells[col].innerText === gameTable.rows[row + 1].cells[col].innerText || gameTable.rows[row].cells[col].innerText === gameTable.rows[row - 1].cells[col].innerText) {
                        if (gameTable.rows[row].cells[col].getAttribute("inHLine") === "true") {
                            gameTable.rows[row].cells[col].classList.add("hvLineCell");
                            gameTable.rows[row].cells[col].setAttribute("inHVLine", "true");
                        } else {
                            gameTable.rows[row].cells[col].classList.add("vLineCell");
                        }
                        vLineRowCells.push(parseInt(gameTable.rows[row].cells[col].getAttribute("cellId")));
                        gameTable.rows[row].cells[col].setAttribute("inVLine", "true");
                    } else {
                        vLineRowCells.push("x");
                    }
                } else if (row > 5) {
                    if (gameTable.rows[row].cells[col].innerText === gameTable.rows[row - 1].cells[col].innerText) {
                        if (gameTable.rows[row].cells[col].getAttribute("inHLine") === "true") {
                            gameTable.rows[row].cells[col].classList.add("hvLineCell");
                            gameTable.rows[row].cells[col].setAttribute("inHVLine", "true");

                        } else {
                            gameTable.rows[row].cells[col].classList.add("vLineCell");
                        }
                        vLineRowCells.push(parseInt(gameTable.rows[row].cells[col].getAttribute("cellId")));
                        gameTable.rows[row].cells[col].setAttribute("inVLine", "true");
                    } else {
                        vLineRowCells.push("x");

                    }
                } else if (row < 1) {
                    if (gameTable.rows[row].cells[col].innerText === gameTable.rows[row + 1].cells[col].innerText) {
                        if (gameTable.rows[row].cells[col].getAttribute("inHLine") === "true") {
                            gameTable.rows[row].cells[col].classList.add("hvLineCell");
                            gameTable.rows[row].cells[col].setAttribute("inHVLine", "true");

                        } else {
                            gameTable.rows[row].cells[col].classList.add("vLineCell");
                        }
                        vLineRowCells.push(parseInt(gameTable.rows[row].cells[col].getAttribute("cellId")));
                        gameTable.rows[row].cells[col].setAttribute("inVLine", "true");
                    } else {
                        vLineRowCells.push("x");

                    }
                }
            } else {
                vLineRowCells.push("x");
            }
        }
        if (vLineRowCells.length !== 0) {
            vLineCells.push(vLineRowCells);
        }
    }
    return vLineCells;
}

function findIndividualSquares() {
    var scores = {
        player1Score: 0,
        player2Score: 0,
        player3Score: 0,
        player4Score: 0
    }
    console.log("looking for individual squares");
    for (tableRow of document.getElementById("gameBoard").rows) {
        for (tableCell of tableRow.cells) {
            if (tableCell.getAttribute("inHLine") === "false" && tableCell.getAttribute("inVLine") === "false") {
                if (tableCell.getAttribute("occupiedBy") !== "") {
                    tableCell.classList.add("indiCell");
                    if (tableCell.getAttribute("occupiedBy") === "1") {
                        scores.player1Score = scores.player1Score + parseInt(tableCell.getAttribute("scoreValue"));
                    } else if (tableCell.getAttribute("occupiedBy") === "2") {
                        scores.player2Score = scores.player2Score + parseInt(tableCell.getAttribute("scoreValue"));
                    } else if (tableCell.getAttribute("occupiedBy") === "3") {
                        scores.player3Score = scores.player3Score + parseInt(tableCell.getAttribute("scoreValue"));
                    } else if (tableCell.getAttribute("occupiedBy") === "4") {
                        scores.player4Score = scores.player4Score + parseInt(tableCell.getAttribute("scoreValue"));
                    }
                }
            }
        }
    }
    return scores;
}

function processHlines(hLineArrays) {
    var allLines = [];
    for (var hlineArray of hLineArrays){
        var currentLine = [];
        for (var arrayItem = 1; arrayItem < hlineArray.length; arrayItem++){
            var thisItem = parseInt(hlineArray[arrayItem]);
            var lastItem = parseInt(hlineArray[arrayItem-1]);
            if (document.getElementById("cell".concat(thisItem)).getAttribute("occupiedBy") !== document.getElementById("cell".concat(lastItem)).getAttribute("occupiedBy")) {
                allLines.push(currentLine);
                currentLine = [];
                currentLine.push(hlineArray[arrayItem]);
                continue;
            }
            if (thisItem === lastItem+1){
                if (currentLine.length === 0){
                    currentLine.push(lastItem);
                }
                currentLine.push(thisItem);
            } else {
                allLines.push(currentLine);
                currentLine = [];
                currentLine.push(hlineArray[arrayItem]);
            }
            if (arrayItem === hlineArray.length-1){
                allLines.push(currentLine);
                currentLine = [];
                currentLine.push(hlineArray[arrayItem]);
            }
        }
    }
   /* for (line of allLines){
        console.log(line);
        for (var cell = 0; cell < line.length; cell++){
            if (cell === 0){
                document.getElementById("cell".concat(line[cell])).classList.add("hLineLeftCell");
            } else if (cell === line.length-1){
                document.getElementById("cell".concat(line[cell])).classList.add("hLineRightCell");
            } else {
                document.getElementById("cell".concat(line[cell])).classList.add("hLineMidCell");
            }
        }
    }*/
    return allLines;
}

function processVLines(vLineArrays){
    var allLines = [];
    console.log(vLineArrays);
    for (var i = 0; i < 7; i++){
        var currentLine = [];
        for (var i2 = 0; i2 < 7; i2++){
            if (vLineArrays[i2][i] !== "x"){
                if (i2 !== 0 && vLineArrays[i2-1][i] !== "x"){
                    if (document.getElementById("cell".concat(vLineArrays[i2][i])).getAttribute("occupiedBy") !== document.getElementById("cell".concat(vLineArrays[i2-1][i])).getAttribute("occupiedBy")){
                        allLines.push(currentLine);
                        currentLine = [];
                        currentLine.push(vLineArrays[i2][i]);
                        continue;
                    }
                }
                currentLine.push(vLineArrays[i2][i]);
            }
        }
        if (currentLine.length !== 0){
            allLines.push(currentLine);
        }
    }
    /*for (line of allLines){
        console.log(line);
        for (var cell = 0; cell < line.length; cell++){
            if (document.getElementById("cell".concat(line[cell])).getAttribute("inHVLine") !== "true"){
                if (cell === 0){
                    document.getElementById("cell".concat(line[cell])).classList.add("vLineTopCell");
                } else if (cell === line.length-1){
                    document.getElementById("cell".concat(line[cell])).classList.add("vLineBottomCell");
                } else {
                    document.getElementById("cell".concat(line[cell])).classList.add("vLineMidCell");
                }
            } else {
                document.getElementById("cell".concat(line[cell])).classList.remove("hLineMidCell");
            }
        }
    }*/
    return allLines;
}

function scoreLines(linesAsArray){

    for (var innerArray = 0; innerArray < linesAsArray.length; innerArray++){
        if (linesAsArray[innerArray].length < 2){
            linesAsArray.splice(innerArray);
        }
    }

    if (linesAsArray.length === 0){
        return;
    }
    var scores = {
        player1Score: 0,
        player2Score: 0,
        player3Score: 0,
        player4Score: 0
    }
    for (var line of linesAsArray){
        var score = 0;
        console.log(line);
        var player = document.getElementById("cell".concat(line[0])).getAttribute("occupiedBy");
        for (var lineItem of line){
            score = score + parseInt(document.getElementById("cell".concat(lineItem)).getAttribute("scoreValue"));
        }
        score = score * line.length;
        if (player === "1") {
            scores.player1Score = scores.player1Score + score;
        } else if (player === "2") {
            scores.player2Score = scores.player2Score + score;
        } else if (player === "3") {
            scores.player3Score = scores.player3Score + score;
        } else if (player === "4") {
            scores.player4Score = scores.player4Score + score;
        }
    }
    console.log(scores);
    return scores;
}
