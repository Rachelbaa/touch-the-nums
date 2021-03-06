'use strict'
console.log('Game: Touch Nums');
var gNums;
var orderNums;
var nextNum;
var elboxNextNum = document.querySelector('.textNN');
var elNextNum = document.querySelector('.next-num');


function init(num) {
    elboxNextNum.innerText = 'Your next number is : ';
    elNextNum.innerHTML = 1;
    nextNum = 1;
    gNums = []
    orderNums = []
    makeGNums(num)
    makeOrder()
}

document.querySelector('#newgame').addEventListener('click',()=> {
    init(4)
})



function makeOrder() {
    for (var i = 1; i < gNums.length + 1; i++) {
        orderNums.push(i)
    }
}

function makeGNums(count) {
    for (var i = 0; i < count; i++) {
        gNums.push(i + 1)
    }
    shuffle(gNums)
    makeGBoard()
}

function makeGBoard() {
    var gBoard = [];
    var count1 = 0;
    for (var i = 0; i < Math.sqrt(gNums.length); i++) {
        gBoard.push([])
        for (var j = 0; j < Math.sqrt(gNums.length); j++) {
            gBoard[i].push(gNums[count1])
            count1++
        }
    }
    makeElBoard(gBoard)
    return gBoard
}

function makeElBoard(gBoard) {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            strHTML += `<td onclick="clickedCell(this)">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    var elTbody = document.querySelector('.board');
    elTbody.innerHTML = strHTML;
}

function clickedCell(elCell) {
    var cellNum = Number(elCell.innerText)
    if (cellNum === 1) {
        stopWatch()
        nextNum ++
        elNextNum.innerHTML = nextNum
    }
    if (cellNum === orderNums[0]) {
        elCell.style.backgroundColor = 'orange';
        elCell.style.color = 'orange';
        orderNums.shift()
        nextNum = cellNum + 1;
        elNextNum.innerHTML = nextNum
    }
}

function stopWatch() {
    var min = 0
    var sec = 0
    var milisec = 0
    var elStopper = document.querySelector('.stop-watch')
    elStopper.innerText = '00:00:000'
    var stoper = setInterval(() => {
        if (milisec === 990) {
            sec += 1
            milisec = 0
        }
        if (sec === 60) {
            min += 1
            sec = 0
        }
        if (nextNum === 1) {
            clearInterval(stoper)
            elNextNum.innerHTML = 1;
        }
        if (orderNums.length === 0) {
            clearInterval(stoper)
            elboxNextNum.innerText = 'GOOD JOB !!!'
            elNextNum.innerHTML = '';
        }
        milisec += 10
        elStopper.innerText = min + ':' + sec + ':' + milisec
    }, 10)
}


