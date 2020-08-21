/**
 * appendChild를 사용한 stageLock
 * 스테이지 선택할 때 level에 따라 선택할 수 있는 스테이지와 그렇지 않은 스테이지로 바뀜
 * @param level
 * @returns {*}
 */
function stepLock(level) {
    let index;
    let element = document.getElementById("stepBox");
    for (index = 0; index <= 9; index++) {
        let newElement = document.createElement("button");
        if (level <= index) {
            newElement.textContent = "STEP " + (index + 1);
            newElement.setAttribute("disabled", true);
            newElement.setAttribute("class","stepbutton");
            element.appendChild(newElement);
        } else {
            newElement.textContent = "STEP " + (index + 1);
            newElement.setAttribute("class","stepbutton");
            element.appendChild(newElement);
        }
        if(index %5 == 4){
            element.appendChild(document.createElement("BR"));
        }
    }
}

// const Timer = (function() {
//     let id;
//     let intervalId = null;
//     let timer = 0;
//     let el;
//
//     function setTimer(time) {
//         timer = time;
//     }
//     function initTimer() {
//         id = el_id;
//         if(id === undefined) {
//             throw "Provide a valid Id!";
//         }
//         el = document.getElementById("mainTimer");
//
//         if(el === null) {
//             throw "Element does not exists!";
//         }
//     }
//     function update() {
//         //console.log(timer);
//         timer -= 1;
//     }
//     function startTimer() {
//         if(intervalId !== null) {
//             throw "Timer is already running!";
//         }
//         intervalId = setInterval(update, 1000);
//     }
//     function stopTimer() {
//         if(intervalId === null) {
//             throw "Timer is not running!";
//         }
//         clearInterval(intervalId);
//         intervalId = null;
//     }
//     function resumeTimer() {
//         if (intervalId !== null) {
//             throw "Timer is already running";
//         }
//         intervalId = setInterval(update, 1000);
//     }
//     return {
//         'setter',setTimer,
//         'init':initTimer,
//         'start': startTimer,
//         'stop': stopTimer,
//         'resume': resumeTimer
//     };
// })();

let interval = 0;
let timerTime = 0;
let startFlag = false;

function startTimer(timeLimit) {
    timerTime = timeLimit;
    const mainTimer = document.getElementById("gameTimer");
    let timerHeight = document.getElementById("gameTimerBox").clientHeight;
    const minusHeight =  timerHeight / timeLimit;
    // let element = document.createElement("p");
    // mainTimer.appendChild(element);

    interval = setInterval(function () {

        if (!startFlag) {
            // mainTimer.textContent = timerTime;
            mainTimer.style.height = timerHeight + "px";
            timerHeight -= minusHeight;
            timerTime--;
        }

        if (timerTime < 0) {
            resetTimer();
            window.canvas.sendTextQuery("get fail result");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    startFlag = true;
}

function resumeTimer(timeLimit) {
    startFlag = false;
    startTimer(timeLimit);
}

function resetTimer() {
    clearInterval(interval);
    startFlag = true;
}

function main() {
    window.canvas.sendTextQuery("let's play the game");
}

// //main에서 back 해서 welcome화면으로 가는 함수
// function backwelcome(){
//     window.canvas.sendTextQuery("select stage");
// }

//상점으로 가는 함수
function shop() {
    window.canvas.sendTextQuery("store");
}
//setting으로 가는 함수
function setting() {
    window.canvas.sendTextQuery("setting");
}

//ranking으로 가는 함수
function ranking() {
    window.canvas.sendTextQuery("ranking");
}
//main에서 continue눌렀을 때
function conTinueButton(){
    window.canvas.sendTextQuery("continue");
}
//main에서 viewall 눌렀을 때
function viewallButton() {
    window.canvas.sendTextQuery("view all");
}

function easyGame() {
    window.canvas.sendTextQurey("easy");
}

function mediumGame() {
    window.canvas.sendTextQurey("medium");
}

function hardGame() {
    window.canvas.sendTextQurey("hard");
}


/**
 * This class is used as a wrapper for Google Assistant Canvas Action class
 * along with its callbacks.
 */
class Action {

    /**
     * @param {*} scene which serves as a container of all visual elements
     */
    constructor(scene) {

        // index.html 안의 <div id="screen"></div>
        const container = document.getElementById("screen"); // container
        const headerheight = async () => {
            return await window.interactiveCanvas.getHeaderHeightPx();
        };
        headerheight().then(function (result) {
            console.log(result);
            container.setAttribute("style", "margin-top: " + result + "px; " + "height:" + (window.innerHeight - result) + "px; width: " + window.innerWidth + "px");
            console.log(window.innerHeight - result);
            console.log(window.innerWidth);
        });
        container.setAttribute("class", "container");

        //main, stageselect, difficultyselect에서 사용
        let level = 0;
        let exp = 0;
        let myHint = 0;
        let myCoin = 0;

        let winMoney1 = 0;
        let winMoney2 = 0;
        let winMoney3 = 0;
        let betMoney1 = 0;
        let betMoney2 = 0;
        let betMoney3 = 0;
        let timeLimit1 = 0;
        let timeLimit2 = 0;
        let timeLimit3 = 0;

        //ingame, correct에서 사용
        let remainingWord = 0;

        //openHint, closeHint에서 사용
        let hint = "";
        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");

                const welcomeBox = document.createElement("div");
                welcomeBox.setAttribute("id", "welcomeBox");
                container.appendChild(welcomeBox);

                const title = document.createElement("h1");
                title.setAttribute("id", "title");
                title.textContent = "WORD SEARCH";
                welcomeBox.appendChild(title);

                const playButton = document.createElement("button");
                playButton.setAttribute("id", "playbutton");
                playButton.onclick = main;
                playButton.textContent = "PLAY";
                welcomeBox.appendChild(playButton);

                /**
                 * 문제 발생, 위치 제대로 배치되지 않음
                 * @type {HTMLDivElement}
                 */
                const copyright = document.createElement("span");
                copyright.setAttribute("id", "copyright");
                copyright.textContent = "COPYRIGHT O2O.INC. ALL RIGHT RESERVED";
                container.appendChild(copyright);

                const o2ologo = document.createElement("span");
                o2ologo.setAttribute("id", "o2ologo");
                o2ologo.textContent = "O2OCI";
                container.appendChild(o2ologo);
            },
            MAIN: function (data) {
                console.log("실행 : main");

                while(container.hasChildNodes()){
                    container.removeChild(container.firstChild);
                }

                /**
                 * 메인 화면에서 보여줄 사용자의
                 * 레벨, 경험치, 힌트, 코인
                 */
                if(data.level != null){
                    level = data.level;
                }
                if(data.myExp != null){
                    exp = data.myExp; // "31/54"
                }
                if(data.myHint != null){
                    myHint = data.myHint;
                }
                if(data.myCoin != null){
                    myCoin = data.myCoin;
                }

                /**
                 * 좌측 사용자 레벨, 경험치
                 * @type {HTMLDivElement}
                 */
                const levelBox = document.createElement("div");
                levelBox.setAttribute("id", "levelBox");
                container.appendChild(levelBox);

                const navLevel = document.createElement("div");
                navLevel.textContent = "Lv." + level;
                levelBox.appendChild(navLevel);

                const navIcon = document.createElement("div");
                navIcon.textContent = "O2O.gmail.com";
                levelBox.appendChild(navIcon);

                const navExp = document.createElement("progress");
                navExp.setAttribute("value",exp);
                navExp.setAttribute("max","1000");
                levelBox.appendChild(navExp);

                /**
                 * 중앙에 이어하기, 단계 선택 버튼
                 * @type {HTMLDivElement}
                 */
                const continueNviewallButton = document.createElement("div")
                continueNviewallButton.setAttribute("id","continueNviewallButton")
                container.appendChild(continueNviewallButton);

                const continueButton = document.createElement("button");
                continueButton.setAttribute("id","continueButton");
                continueButton.onclick = conTinueButton;
                continueButton.textContent = "continue";
                continueNviewallButton.appendChild(continueButton);

                const viewAllButton = document.createElement("button");
                viewAllButton.setAttribute("id","viewallButton");
                viewAllButton.onclick = viewallButton;
                viewAllButton.textContent = "view all";
                continueNviewallButton.appendChild(viewAllButton);
                /**
                 * 우측 상단에
                 * 힌트와 코인
                 * @type {HTMLDivElement}
                 */
                const hintNcoin = document.createElement("div");
                hintNcoin.setAttribute("id", "hint-coin");
                container.appendChild(hintNcoin);

                const hintBox = document.createElement("i");
                hintBox.setAttribute("class","fa fa-neuter");
                hintBox.setAttribute("id", "hintBox");
                hintBox.onclick = shop;
                hintNcoin.appendChild(hintBox);

                const hintText = document.createElement("span");
                hintText.textContent = myHint;
                hintBox.appendChild(hintText);

                const coinBox = document.createElement("i");
                coinBox.setAttribute("class", "fa fa-eur");
                coinBox.setAttribute("id", "coinBox");
                coinBox.onclick = shop;
                hintNcoin.appendChild(coinBox);

                const coinText = document.createElement("span");
                coinText.textContent = myCoin;
                coinBox.appendChild(coinText);

                /**
                 * 우측 하단에
                 * 메인, 랭킹, 설정
                 * @type {HTMLDivElement}
                 */
                const bottomCommon = document.createElement("div");
                bottomCommon.setAttribute("id", "bottomCommon");
                container.appendChild(bottomCommon);

                const mainButton = document.createElement("i");
                mainButton.setAttribute("class","fa fa-home");
                mainButton.setAttribute("id","main");
                mainButton.onclick = main;
                bottomCommon.appendChild(mainButton);

                const welcomeback = document.createElement("i");
                welcomeback.setAttribute("class","fa fa-reply");
                welcomeback.setAttribute("id","welcomeback");
                // welcomeback.onclick = backwelcome;
                bottomCommon.appendChild(welcomeback);

                const rankingButton = document.createElement("i");
                rankingButton.setAttribute("class","fa fa-star");
                rankingButton.setAttribute("id","ranking");
                rankingButton.onclick = ranking;
                bottomCommon.appendChild(rankingButton);

                const settingButton = document.createElement("i");
                settingButton.setAttribute("class", "fa fa-cog");
                settingButton.setAttribute("id","setting");
                settingButton.onclick = setting;
                bottomCommon.appendChild(settingButton);

                //메인 화면에서 메인 버튼, 뒤로가기가 보이지 않도록 함
                // document.getElementById("welcomeBox").style.visibility = "hidden";
                // document.getElementById("backBox").style.visibility = "hidden";
            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");
                /**
                 * 메인 화면, 중앙에 생성했던
                 * continue, view all 버튼 제거
                 */

                container.removeChild(document.getElementById("continueNviewallButton"));

                /**
                 * 중앙에
                 * 선택할 수 있는 단계 보여줌
                 * @type {HTMLDivElement}
                 */
                const stepBox = document.createElement("div");
                stepBox.setAttribute("id", "stepBox");
                container.appendChild(stepBox);

                stepLock(level); //단계 버튼 생성(10개)

            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");

                /**
                 * 단계 선택, 중앙에 생성했던
                 * 단계 버튼 제거
                 */
                if (document.getElementById("stepBox") != null) {
                    container.removeChild(document.getElementById("stepBox"));
                }

                /**
                 * 배팅머니, 획득머니, 시간제한 등을 fulfillment에서 가져옴
                 * 변동사항이 있으면 안되므로 상수 선언
                 */
                if(data.winMoney1 != null){
                    winMoney1 = data.winMoney1;
                }
                if(data.winMoney2 != null){
                    winMoney2 = data.winMoney2;
                }
                if(data.winMoney3 != null){
                    winMoney3 = data.winMoney3;
                }
                if(data.betMoney1 != null){
                    betMoney1 = data.betMoney1;
                }
                if(data.betMoney2 != null){
                    betMoney2 = data.betMoney2;
                }
                if(data.betMoney3 != null){
                    betMoney3 = data.betMoney3;
                }
                if(data.timeLimit1 != null){
                    timeLimit1 = data.timeLimit1;
                }
                if(data.timeLimit2 != null){
                    timeLimit2 = data.timeLimit2;
                }
                if(data.timeLimit3 != null){
                    timeLimit3 = data.timeLimit3;
                }

                /**
                 * 몇 단계를 선택했는지 표시 -> fulfillment에서 가져와야 함
                 */

                /**
                 * 난이도별 경험치 표시해야 함
                 * @type {HTMLDivElement}
                 */
                const difficultyBox = document.createElement("div");
                difficultyBox.setAttribute("id", "difficultyBox");
                container.appendChild(difficultyBox);

                const easyBox = document.createElement("div");
                easyBox.setAttribute("id", "easyBox");
                easyBox.setAttribute("class", "difficultyBoxMargin");
                easyBox.onclick = easyGame;
                difficultyBox.appendChild(easyBox);
                const easyText = document.createElement("div");
                easyText.setAttribute("class", "difficultyText");
                easyText.textContent = "EASY";
                easyBox.appendChild(easyText);
                const easyDetail = document.createElement("div");
                easyDetail.setAttribute("class", "difficultyDetail");
                easyDetail.textContent = "★ \r\nSUCCESS : " + winMoney1 + "c GET \r\nFAIL : " + betMoney1 + "c CUT \r\nTime Limit : " + timeLimit1 + "s \r\n---------------------\r\n EXP x1";
                easyBox.appendChild(easyDetail);

                const mediumBox = document.createElement("div");
                mediumBox.setAttribute("class", "difficultyBoxMargin");
                difficultyBox.appendChild(mediumBox);
                const mediumText = document.createElement("div");
                mediumText.setAttribute("class", "difficultyText");
                mediumText.textContent = "MEDIUM";
                mediumText.onclick = mediumGame;
                mediumBox.appendChild(mediumText);
                const mediumDetail = document.createElement("div");
                mediumDetail.setAttribute("class", "difficultyDetail");
                mediumDetail.textContent = "★★ \r\nSUCCESS : " + winMoney2 + "c GET \r\nFAIL : " + betMoney2 + "c CUT \r\nTime Limit : " + timeLimit2 + "s \r\n---------------------\r\n EXP x2";
                mediumDetail.onclick = mediumGame;
                mediumBox.appendChild(mediumDetail);

                const hardBox = document.createElement("div");
                hardBox.setAttribute("class", "difficultyBoxMargin");
                hardBox.onclick = hardGame;
                difficultyBox.appendChild(hardBox);
                const hardText = document.createElement("div");
                hardText.setAttribute("class", "difficultyText");
                hardText.textContent = "HARD";
                hardBox.appendChild(hardText);
                const hardDetail = document.createElement("div");
                hardDetail.setAttribute("class", "difficultyDetail");
                hardDetail.textContent = "★★★ \r\nSUCCESS : " + winMoney3 + "c GET \r\nFAIL : " + betMoney3 + "c CUT \nTime Limit : " + timeLimit3 + "s \r\n---------------------\r\nEXP x3";
                hardBox.appendChild(hardDetail);

            },
            INGAME: function (data) {
                console.log("실행 : inGame");

                /**
                 * 게임판, 게임판 행과 열, 시간제한, 맞춰야 할 모든 단어 수는 변경되면 안 되서 상수 선언
                 * 맞춰야 하는 단어 수는 변경되어야 하므로 let 선언 -> correct에서도 사용할 변수
                 */
                    // const board = data.board;
                    // const boardRow = data.board[0].length; //열
                    // const boardCol = data.board.length; //행
                    // const timeLimit = data.timeLimit;
                    // const totalWord = data.totalWord;

                const board = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l'], ['m', 'n', 'o', 'p']];
                console.log(board[0][0]);
                const boardRow = board[0].length;
                console.log(boardRow);
                const boardCol = board.length;
                console.log(boardCol);
                const timeLimit = 100;
                const totalWord = 3;
                remainingWord = totalWord; //처음에는 남은 단어 수 = 맞춰야 할 모든 단어 수

                /**
                 * 좌측 중앙에
                 * 사용자가 사용한 힌트가 보임
                 *
                 * 좌측 하단에 게임 진행상황을 보임
                 * @type {HTMLDivElement}
                 */
                const inGameBox = document.createElement("div");
                inGameBox.setAttribute("id", "inGameBox");
                container.appendChild(inGameBox);

                const usedHint = document.createElement("div");
                usedHint.setAttribute("id", "usedHint");
                usedHint.setAttribute("class", "inGameBoxMargin");
                usedHint.textContent = "HINT\r\n-------------------\r\n";
                inGameBox.appendChild(usedHint);

                const gameBoardBox = document.createElement("div");
                gameBoardBox.setAttribute("id", "gameBoardBox");
                gameBoardBox.setAttribute("class", "inGameBoxMargin");
                inGameBox.appendChild(gameBoardBox);

                const gameProgressBox = document.createElement("div");
                gameProgressBox.setAttribute("id", "gameProgressBox");
                gameProgressBox.setAttribute("class", "inGameBoxMargin");
                inGameBox.appendChild(gameProgressBox);

                // " 2/5 " 이런 식으로 보이도록 함
                const gameProgress = document.createElement("span");
                gameProgress.setAttribute("id", "gameProgress");
                gameProgress.textContent = remainingWord;
                gameProgressBox.appendChild(gameProgress);

                const words = document.createElement("span");
                words.textContent = "/" + totalWord;
                gameProgressBox.appendChild(words);

                /**
                 * 중앙에
                 * 게임판 위치
                 *
                 * 게임판 좌측에 타이머
                 *
                 * @type {HTMLDivElement}
                 */


                const gameBoard = document.createElement("div");
                gameBoard.setAttribute("id", "gameBoard");
                gameBoardBox.appendChild(gameBoard);

                //게임판 안에 넣을 n x n 배열
                for (let col = 0; col < boardCol; col++) {
                    const rowBox = document.createElement("div");
                    rowBox.setAttribute("class", "rowBox");
                    gameBoard.appendChild(rowBox);
                    for (let row = 0; row < boardRow; row++) {
                        const alphabet = document.createElement("div");
                        alphabet.setAttribute("id", row + "," + col);
                        alphabet.setAttribute("class", "gameBoardMargin");
                        alphabet.textContent = board[col][row];
                        rowBox.appendChild(alphabet);
                    }
                }

                //게임보드에 높이 맞추기
                usedHint.style.height = gameBoardBox.clientHeight + "px";

                //main의 게임판 우측에 타이머 배치
                const gameTimerBox = document.createElement("div");
                gameTimerBox.setAttribute("id", "gameTimerBox");
                gameTimerBox.style.height = gameBoardBox.clientHeight + "px";
                gameBoardBox.appendChild(gameTimerBox);
                const gameTimer = document.createElement("div");
                gameTimer.setAttribute("id", "gameTimer");
                gameTimerBox.appendChild(gameTimer);
                startTimer(timeLimit);

                // //제한 시간이 지나면 fulfillment쪽으로 textQuery를 전송 -> 혹시의 오류를 감안하여 남겨둠
                // timerOver = setTimeout(function () {
                //     window.canvas.sendTextQuery("get fail result");
                // }, timeLimit * 1000);

            },
            CORRECT: function (data) {
                console.log("실행 : correct");

                // 게임 종료 여부를 받아옴, 변경되면 안되므로 상수 선언
                const finish = data.finish;

                //남은 단어 수 보여줌 -> 진행 상황 박스에
                remainingWord--;
                const remain = document.getElementById("gameProgress");
                remain.textContent = remainingWord;

                //다 맞추면 fulfillment로 textQuery 전송
                if (finish) {
                    setTimeout(function () {
                        window.canvas.sendTextQuery("get success result");
                    }, 1000);
                    resetTimer();
                    console.log("get success result");
                }
            },
            WRONG: function (data) {
                console.log("실행 : wrong");

                /**
                 * 틀렸다는 팝업창보다는 소리가 나도록 하거나 게임판을 좌우로 흔드는 쪽으로 -> 한 번만 흔들림, 소리 재생되지 않음
                 */

                let wrongAudio = new Audio("https://o2o.actions.kr/devsvr1/audio/sound_button_wrong.wav");
                wrongAudio.play();

                const gameBoard = document.getElementById("gameBoard");
                gameBoard.classList.remove("shake");
                gameBoard.setAttribute("class", "shake");

            },
            OPENHINT: function (data) {
                console.log("실행 : openHint");

                /**
                 * hint = data.hint -> fulfillment에서 보내주는 hint
                 * 게임판을 가리고 힌트를 보여줌
                 * 타이머가 잠시 멈춤
                 */

                //힌트를 열면 타이머를 잠시 멈춤
                pauseTimer();

                //사용자의 남은 힌트를 보여줌
                const remainingHint = document.getElementById("hintText");
                myHint--;
                remainingHint.textContent = myHint;

                hint = data.hint;

                const backgroundModal = document.createElement("div");
                backgroundModal.setAttribute("class", "backgroundModal");
                backgroundModal.setAttribute("id", "backgroundModal");
                container.appendChild(backgroundModal);

                const contentModal = document.createElement("div");
                contentModal.setAttribute("class", "contentModal");
                backgroundModal.appendChild(contentModal);

                const close = document.createElement("span");
                close.setAttribute("class", "close");
                close.textContent = "X";
                contentModal.appendChild(close);

                const hintModal = document.createElement("p");
                hintModal.setAttribute("id", "hintModal");
                hintModal.textContent = hint;
                contentModal.appendChild(hintModal);

                backgroundModal.style.display = "block";

                close.onclick = function() {
                    window.canvas.sendTextQuery("close hint");
                    backgroundModal.style.display = "none";

                }

                window.onclick = function(event) {
                    if(event.target == backgroundModal) {
                        window.canvas.sendTextQuery("close hint");
                        backgroundModal.style.display = "none";
                    }
                }

            },
            CLOSEHINT: function (data) {
                console.log("실행: closeHint");
                /**
                 * 가렸던 게임판을 다시 보여줌
                 * 타이머 다시 시작
                 */

                resumeTimer(timerTime);

                const backgroundModal = document.getElementById("backgroundModal");
                backgroundModal.style.display = "none";

                if(hint!= "noHint") {
                    const usedHint = document.getElementById("usedHint");
                    usedHint.textContent += hint + "\r\n";
                } else if (hint == "noHint") {
                    document.getElementById("hintModal").textContent = "There's no hint..;(";
                }

            },
            RESULT: function (data) {
                console.log("실행 : result");

                /**
                 * 인게임 화면,
                 * 좌측 하단
                 * 뒤로 가기 버튼 보이기
                 *
                 * 좌측 중앙
                 * 사용한 힌트, 진행 상황
                 *
                 * 중앙
                 * 게임판, 타이머 제거
                 *
                 * 우측 상단
                 * 힌트, 코인 버튼 안 보이게 함
                 *
                 * 우측 하단
                 * 랭킹 버튼 보이게 함
                 */
                document.getElementById("backBox").style.visibility = "visible";
                container.removeChild(document.getElementById("usedHint"));
                container.removeChild(document.getElementById("gameProgressBox"));
                container.removeChild(document.getElementById("gameBoard"));
                container.removeChild(document.getElementById("gameTimer"));
                document.getElementById("hint-coin").style.visibility = "hidden";
                document.getElementById("ranking").style.visibility = "visible";


                /**
                 * 결과창에서 보여주는 게임 결과와 레벨, 경험치, 코인, 힌트 등의 변동사항 보여주
                 * 또한 맞춘 단어들과 못 맞춘 단어들을 구분하여 보여줌
                 */
                const result = data.result;
                level = data.level;
                exp = data.myExp + "/" + data.fullExp;
                myCoin = data.myCoin;
                myHint = data.myHint;
                const matchedList = data.correctList;
                const unmatchedList = data.wrongList;

                /**
                 * 화면 중앙에
                 * 결과 텍스트
                 * 사용자 아이콘, 레벨 정보
                 * 경험치,
                 * 코인
                 * 맞춘 단어(검은색), 틀린 단어(빨간색)
                 * 이어하기 or 재도전 버튼
                 * @type {HTMLHeadingElement}
                 */

                    //성공인지 실패인지 텍스트의 형태로 보여줌
                const resultText = document.createElement("h1");
                resultText.textContent = result;
                container.appendChild(resultText);

                const resultUserBox = document.createElement("div");
                resultUserBox.setAttribute("id", "resultUserBox");
                container.appendChild(resultUserBox);

                const resultUserIcon = document.createElement("div");
                resultUserIcon.setAttribute("class", "resultMargin");
                resultUserIcon.textContent = "user icon";
                resultUserBox.appendChild(resultUserIcon);

                const resultLevel = document.createElement("div");
                resultLevel.setAttribute("class", "resultMargin");
                resultLevel.textContent = "Lv." + level;
                resultUserBox.appendChild(resultLevel);

                const resultExpBox = document.createElement("div");
                resultExpBox.setAttribute("id", "resultExpBox");
                container.appendChild(resultExpBox);

                const resultExpBar = document.createElement("div");
                resultExpBar.setAttribute("class", "resultMargin");
                resultExpBar.textContent = "bar";
                resultExpBox.appendChild(resultExpBar);

                const resultExpText = document.createElement("div");
                resultExpText.setAttribute("class", "resultMargin");
                resultExpText.textContent = exp;
                resultExpBox.appendChild(resultExpText);

                const resultCoinBox = document.createElement("div");
                resultCoinBox.setAttribute("id", "resultCoinBox");
                container.appendChild(resultCoinBox);

                const resultCoinIcon = document.createElement("div");
                resultCoinIcon.setAttribute("class", "resultMargin");
                resultCoinIcon.textContent = "coin icon";
                resultCoinBox.appendChild(resultCoinIcon);

                const resultCoinText = document.createElement("div");
                resultCoinText.setAttribute("class", "resultMargin");
                resultCoinText.textContent = myCoin;
                resultCoinBox.appendChild(resultCoinText);

                const resultWords = document.createElement("div");
                resultWords.setAttribute("id", "resultWords");
                container.appendChild(resultWords);

                const matched = document.createElement("span");
                matched.setAttribute("class", "resultWordsMargin");
                matched.textContent = matchedList;
                resultWords.appendChild(matched);

                const unmatched = document.createElement("span");
                unmatched.setAttribute("class", "resultWordsMargin");
                unmatched.setAttribute("id", "unmatched");
                unmatched.textContent = unmatchedList;
                resultWords.appendChild(unmatched);

                const retryOrContinueBox = document.createElement("div");
                retryOrContinueBox.setAttribute("id", "retryOrContinueBox");
                container.appendChild(retryOrContinueBox);

                const retryOrContinueButton = document.createElement("button");
                const retryOrContinueText = document.createElement("p");
                retryOrContinueButton.setAttribute("id", "retryOrContinue");
                if (result == "success") {
                    retryOrContinueButton.textContent = "continue";
                    retryOrContinueText.textContent = "continue";
                } else if (result == "fail") {
                    retryOrContinueButton.textContent = "retry";
                    retryOrContinueText.textContent = "retry";
                }
                retryOrContinueBox.appendChild(retryOrContinueButton);

            },
            SETTING: function (data) {
                console.log("실행 : setting");
                /**
                 * 설정 화면은
                 * 뒤로 가기
                 * 사용자 계정
                 * 효과음 on/off
                 * 배경음 on/off
                 * 초기화 여부
                 */
                /**
                 * 좌측 하단 뒤로가기 버튼이 보이게 함
                 * main으로 돌아가는 버튼이 보이게 함
                 * main화면에서 setting로 넘어갈 때 continueNviewallButton이 사라지게 함
                 * setting 화면에서 불필요한 level과 hint-coin을 없애줌
                 * 우측에 설정,랭킹,메인을 보이지 않게 함
                 * step 선택 화면에서 setting으로 넘어갈 때 stepBox를 안보이게 함
                 * 난이도 선택 화면에서 setting으로 넘어갈 때 difficultyBox가 안보이게 함
                 */
                //step 선택, 난이도 선택에서 setting 했다가 back하면 화면 전환이 안됨
                document.getElementById("backBox").style.visibility = "visible";
                document.getElementById("mainBox").style.visibility = "visible"
                if(document.getElementById("continueNviewallButton") != null){
                    document.getElementById("continueNviewallButton").style.visibility = "hidden"
                }
                document.getElementById("levelBox").style.visibility = "hidden";
                document.getElementById("hint-coin").style.visibility = "hidden";
                document.getElementById("bottom").style.visibility = "hidden";
                if (document.getElementById("stepBox") != null) {
                    document.getElementById("stepBox").style.visibility = "hidden"                }
                if(document.getElementById("difficultyBox") != null){
                    document.getElementById("difficultyBox").style.visibility = "hidden"
                }
                const UserID = document.createElement("div");
                UserID.setAttribute("id","UserID");
                UserID.textContent = "O2Ogmail.com";
                container.appendChild(UserID);
                const leftBox = document.createElement("div");
                leftBox.setAttribute("id","leftBox");
                container.appendChild(leftBox);
                const SoundEffect = document.createElement("div");
                SoundEffect.setAttribute("id","SoundEffect");
                SoundEffect.textContent = "Sound Effect";
                leftBox.appendChild(SoundEffect);
                const BackGroundEffect = document.createElement("div");
                BackGroundEffect.setAttribute("id","BackGroundEffect");
                BackGroundEffect.textContent = "BackGround Effect";
                leftBox.appendChild(BackGroundEffect);
                const label = document.createElement("label");
                label.setAttribute("class","switch");
                container.appendChild(label);
                const input = document.createElement("input");
                input.setAttribute("type","checkbox");
                label.appendChild(input);
                const span = document.createElement("span");
                span.setAttribute("class","slider round");
                label.appendChild(span);
                const label2 = document.createElement("label");
                label2.setAttribute("class","switch2");
                container.appendChild(label2);
                const input2 = document.createElement("input");
                input2.setAttribute("type","checkbox");
                label2.appendChild(input2);
                const span2 = document.createElement("span");
                span2.setAttribute("class","slider round");
                label2.appendChild(span2);
                /**
                 * 초기화
                 */
                const ResetButton = document.createElement("button");
                ResetButton.setAttribute("id","ResetButton");
                ResetButton.textContent = "RESET";
                container.appendChild(ResetButton);
            },
            RANKING: function (data) {
                console.log("실행 : ranking");
                /**
                 * 랭킹 화면은
                 * 뒤로 가기
                 * 나의 랭킹
                 * 1위부터 ...
                 */
                document.getElementById("backBox").style.visibility = "visible";
                document.getElementById("mainBox").style.visibility = "visible"
                document.getElementById("continueNviewallButton").style.visibility = "hidden"
                document.getElementById("levelBox").style.visibility = "hidden";
                document.getElementById("hint-coin").style.visibility = "hidden";
                document.getElementById("bottom").style.visibility = "hidden";
                if(document.getElementById("stepBox") != null){
                    document.getElementById("stepBox").style.visibility = "hidden"
                }
                const rankBox = document.createElement("div");
                container.appendChild(rankBox);
                const yourrank = document.createElement("div");
                yourrank.setAttribute("id","yourrank");
                yourrank.textContent = "O2O@gmail.com 님의 랭킹은 1위";
                rankBox.appendChild(yourrank);
                const ranking = document.createElement("div");
                ranking.setAttribute("class","ranking");
                rankBox.appendChild(ranking);
                for(let i = 0; i < 30; i++){
                    const rank = document.createElement("div");
                    rank.setAttribute("id","rank");
                    ranking.appendChild(rank);
                    const User = document.createElement("div");
                    User.setAttribute("id","User");
                    rank.appendChild(User);
                    const ranknum = document.createElement("div");
                    ranknum.setAttribute("id","ranknum");
                    ranknum.textContent = "RANK "+(i+1);
                    User.appendChild(ranknum);
                    const rankId = document.createElement("div");
                    rankId.setAttribute("id","rankId");
                    rankId.textContent = "O**1@gmail.com";
                    User.appendChild(rankId);
                    const rankexp = document.createElement("div");
                    rankexp.setAttribute("id","rankexp");
                    rank.appendChild(rankexp);
                    rankexp.textContent = "exp       5140"
                }
            },
            SHOP: function (data) {
                console.log("실행 : shop");
                /**
                 * 상점은
                 * 뒤로 가기
                 * (광고 보기 -> 코인 지급)
                 * 코인 충전
                 * 힌트 충전
                 */
                    // document.getElementById("setting").style.visibility = "visible";
                    // document.getElementById("mainBox").style.visibility = "hidden"
                    // document.getElementById("continueNviewallButton").style.visibility = "hidden"
                    // document.getElementById("levelBox").style.visibility = "hidden";
                    // document.getElementById("hint-coin").style.visibility = "hidden";
                    // document.getElementById("bottom").style.visibility = "hidden";
                    //
                    // if(document.getElementById("stepBox") != null){
                    //     document.getElementById("stepBox").style.visibility = "hidden"
                    // }
                    // if(document.getElementById("difficultyBox") != null){
                    //     document.getElementById("difficultyBox").style.visibility = "hidden"
                    // }
                    //store
                const Store = document.createElement("div");
                Store.setAttribute("id","Store");
                container.appendChild(Store);
                const Hintbox = document.createElement("div");
                Hintbox.setAttribute("id","HintBox");
                Store.appendChild(Hintbox);
                const top = document.createElement("div");
                top.setAttribute("id","top");
                Hintbox.appendChild(top);
                const HintText = document.createElement("div");
                HintText.textContent = "Hint Purchase";
                top.appendChild(HintText);
                const hr = document.createElement("hr");
                hr.setAttribute("id","hr");
                top.appendChild(hr);
                const HintIcon = document.createElement("i");
                HintIcon.setAttribute( "class","fa fa-neuter");
                top.appendChild(HintIcon);
                const Hintcount = document.createElement("span");
                Hintcount.textContent = " X 3";
                top.appendChild(Hintcount);
                const price = document.createElement("div");
                price.setAttribute("id","price");
                price.textContent = "300c";
                Hintbox.appendChild(price);
                //
                const Coinbox = document.createElement("div");
                Coinbox.setAttribute("id","Coinbox");
                Store.appendChild(Coinbox);
                const cointop = document.createElement("div");
                cointop.setAttribute("id","cointop");
                Coinbox.appendChild(cointop);
                const CoinText = document.createElement("div");
                CoinText.textContent = "Coin Purchase";
                cointop.appendChild(CoinText);
                const hr2 = document.createElement("hr");
                hr2.setAttribute("id","hr");
                cointop.appendChild(hr2);
                const CoinIcon = document.createElement("i");
                CoinIcon.setAttribute( "class","fa fa-eur");
                cointop.appendChild(CoinIcon);
                const Coincount = document.createElement("span");
                Coincount.textContent = " 1000c";
                cointop.appendChild(Coincount);
                const CoinPrice = document.createElement("div");
                CoinPrice.setAttribute("id","CoinPrice");
                CoinPrice.textContent = "1000w";
                Coinbox.appendChild(CoinPrice);
                //
                const ad = document.createElement("div");
                ad.setAttribute("id","ad");
                container.appendChild(ad);
                const adtext = document.createElement("span");
                adtext.textContent = "GET COINS ";
                ad.appendChild(adtext);
                const adIcon = document.createElement("i");
                adIcon.setAttribute("class","fa fa-caret-right");
                ad.appendChild(adIcon);
            },
        };
    }

    /*
     * Register all callbacks used by Interactive Canvas
     * executed during scene creation time.
     */
    setCallbacks() {
        const that = this;
        // declare interactive canvas callbacks
        const callbacks = {
            onUpdate(data) {
                try {
                    console.log(data);
                    // command가 전부 대문자가 되어서 Action.commands에 들어감
                    that.commands[data.command.toUpperCase()](data);
                    console.log("onUpdate : " + data.command);
                } catch (e) {
                    // AoG 입력값을 매칭하지 못했을 경우
                    console.log("error : " + e);
                }
            },
        };
        // called by the Interactive Canvas web app once web app has loaded to
        // register callbacks
        this.canvas.ready(callbacks);
        console.log("setCallbacks READY");
    }
}