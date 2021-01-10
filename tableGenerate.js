var pinkCellList = [9, 11, 13, 19, 25, 31, 37, 39, 41];
var whiteCellList = [1, 4, 7, 10, 12, 15, 21, 23, 27, 29, 35, 38, 40, 43, 46, 49];

var numberOfPlayers = 2;

var selectedPlayer = 1;

var buttonsAdded = false;

document.body.onload = createTable;


function createTable(){
    //var gameBoard = document.getElementById("myTable");
    var gameBoard = document.createElement("TABLE");
    gameBoard.id = "gameBoard";
    document.getElementById("tableDiv").insertAdjacentElement("beforeend",gameBoard);

    var cellNo = 49;

    for (var row = 7; row > 0; row--){
        var thisRow = gameBoard.insertRow(0);
        for (var col = 7; col > 0; col--){
            var thisCell = thisRow.insertCell(0);
            //thisCell.innerText = cellNo;
            thisCell.id = "cell".concat(cellNo);
            thisCell.setAttribute("cellId", cellNo);
            thisCell.addEventListener('click', cellClick);
            if (pinkCellList.includes(cellNo)){
                thisCell.className = "pink";
                thisCell.setAttribute("scoreValue", 3);
            } else if (whiteCellList.includes(cellNo)){
                thisCell.className = "white";
                thisCell.setAttribute("scoreValue", 1);
            } else {
                thisCell.className = "black";
                thisCell.setAttribute("scoreValue", 2);
            }
            thisCell.setAttribute("occupiedBy", "");
            cellNo = cellNo - 1;
        }
    }
    if (!buttonsAdded){
        addButtons();
    }
}

function addButtons(){

    for (var i = 1; i <= numberOfPlayers; i++){
        var playerButton = document.createElement("button");
        var currentButton = document.getElementById("playerButtDiv").insertAdjacentElement('beforeend', playerButton);
        currentButton.innerText = "Player ".concat(i);
        currentButton.id = "playerButton".concat(i);
        currentButton.className = "playerButton";
        currentButton.setAttribute("playerID", i);
        currentButton.addEventListener('click', playerButtonClick);
        if (i % 2 === 0){
            var lineBreak = document.createElement("br");
            document.getElementById("playerButtDiv").insertAdjacentElement('beforeend', lineBreak);

        }
    }

    document.getElementById("playerButton".concat(selectedPlayer)).classList.add("selectedButton");

    var scoreButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', scoreButton);
    scoreButton.innerText = "Score";
    scoreButton.id = "scoreButton";
    scoreButton.className = "scoreButton";
    scoreButton.addEventListener('click', scoreButtonClick);

    var resetButton = document.createElement("button");
    document.getElementById("scoreButtDiv").insertAdjacentElement('beforeend', resetButton);
    resetButton.innerText = "Reset";
    resetButton.id = "resetButton";
    resetButton.className = "resetButton";
    resetButton.addEventListener('click', resetButtonClick);

    buttonsAdded = true;

}

function cellClick(passedMouseEvent){
    var clickedCell = passedMouseEvent.path[0];

    if (clickedCell.innerText === ""){
        clickedCell.innerText = selectedPlayer;
        clickedCell.setAttribute("occupiedBy", selectedPlayer);
    } else {
        if (clickedCell.innerText === selectedPlayer.toString()){
            clickedCell.innerText = "";
            clickedCell.setAttribute("occupiedBy", "");
        } else {
            clickedCell.innerText = selectedPlayer;
            clickedCell.setAttribute("occupiedBy", selectedPlayer);
        }
    }
}

function playerButtonClick(passedMouseEvent){
    selectedPlayer = passedMouseEvent.path[0].attributes.playerID.nodeValue;
    for (button of document.getElementsByClassName("playerButton")){
        button.className = "playerButton"
    }
    passedMouseEvent.path[0].classList.add("selectedButton");

}

function scoreButtonClick(){
    findHorizontalLines();
    findVerticalLines();
    console.log(findIndividualSquares());


}

function resetButtonClick(){
    for (tableRow of document.getElementById("gameBoard").rows){
        for (rowCell of tableRow.cells){
            rowCell.innerText = "";
            rowCell.setAttribute("occupiedBy", "");
        }
    }

    document.getElementById("gameBoard").remove();
    createTable();

}

function findHorizontalLines(){
    console.log("looking for h lines");
    var hLineArray = [];
    for (tableRow of document.getElementById("gameBoard").rows){
        for (var col = 0; col < 7; col++){
            if (tableRow.cells[col].getAttribute("occupiedBy") !== ""){
                if (col !== 6){
                    if (tableRow.cells[col].innerText === tableRow.cells[col+1].innerText || tableRow.cells[col].innerText === tableRow.cells[col-1].innerText){
                        tableRow.cells[col].style.backgroundColor = "yellow";
                    }
                } else {
                    if (tableRow.cells[col].innerText === tableRow.cells[col-1].innerText){
                        tableRow.cells[col].style.backgroundColor = "yellow";
                    }
                }
            }
        }
    }
}

function findVerticalLines(){
    console.log("looking for v lines");
    var gameTable = document.getElementById("gameBoard");
    for (var row = 0; row < 7; row++){
        for (var col = 0; col < 7; col++){
            if (gameTable.rows[row].cells[col].getAttribute("occupiedBy") !== ""){
                if (row !== 6){
                    if (gameTable.rows[row].cells[col].innerText === gameTable.rows[row+1].cells[col].innerText || gameTable.rows[row].cells[col].innerText === gameTable.rows[row-1].cells[col].innerText){
                        gameTable.rows[row].cells[col].style.backgroundColor = "orange";
                    }
                } else {
                    if (gameTable.rows[row].cells[col].innerText === gameTable.rows[row-1].cells[col].innerText){
                        gameTable.rows[row].cells[col].style.backgroundColor = "orange";
                    }
                }
            }
        }
    }
}

function findIndividualSquares() {
    var scores = {
        player1Score: 0,
        player2Score: 0,
        player3Score: 0,
        player4Score: 0
    }
    for (tableRow of document.getElementById("gameBoard").rows) {
        for (tableCell of tableRow.cells){
            if (tableCell.style.backgroundColor !== "orange" && tableCell.style.backgroundColor !== "yellow"){
                if (tableCell.getAttribute("occupiedBy") !== "") {
                    tableCell.style.backgroundColor = "green";
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
