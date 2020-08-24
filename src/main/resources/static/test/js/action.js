/**
 * appendChild를 사용한 stageLock
 * 스테이지 선택할 때 level에 따라 선택할 수 있는 스테이지와 그렇지 않은 스테이지로 바뀜
 * @param level
 * @returns {*}
 */
function stepLock(level) {
    let stepNum = 0;
    const stepBox = document.getElementById("stepButton");
    for (let row = 0; row < 3; row++) {
        const stepRow = document.createElement("div");
        stepRow.setAttribute("id", "stepRow");
        stepBox.appendChild(stepRow);
        for (let col = 0; col < 4; col++) {
            if (stepNum == 10) return;
            stepNum++;
            const underBox = document.createElement("div");
            stepBox.appendChild(underBox);
            if (level < stepNum) { //disable
                underBox.textContent = "Lv. " + stepNum;
                underBox.setAttribute("class", "disableUnderBox");
                const upperBox = document.createElement("div");
                upperBox.setAttribute("class", "upperBox");
                upperBox.textContent = "Lock";
                underBox.appendChild(upperBox);
                stepRow.appendChild(underBox);
            } else {
                underBox.textContent = "Lv. " + stepNum;
                underBox.setAttribute("class", "ableUnderBox");
                // underBox.onclick = step(stepNum + 1);
                stepRow.appendChild(underBox);
            }
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
let timerHeight = 0;
let startFlag = false;

function startTimer(timeLimit, height) {
    timerTime = timeLimit;
    const mainTimer = document.getElementById("remainTime");
    timerHeight = height;
    const minusHeight = timerHeight / timeLimit;
    interval = setInterval(function () {
        if (!startFlag) {
            document.getElementById("gameTimerText").textContent = timerTime;
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
    startTimer(timeLimit, timerHeight);
}

function resetTimer() {
    clearInterval(interval);
    startFlag = true;
}

function main() {
    window.canvas.sendTextQuery("play");
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
function continuebutton() {
    window.canvas.sendTextQuery("continue");
}

//main에서 viewall 눌렀을 때
function viewallButton() {
    window.canvas.sendTextQuery("view all");
}

//result화면에서 retry눌렀을 때
function retry() {
    window.canvas.sendTextQuery("retry");
}

//result화면에서 next 눌렀을 때
function next() {
    window.canvas.sendTextQuery("retry");
}

function easyGame() {
    window.canvas.sendTextQuery("easy");
}

function mediumGame() {
    window.canvas.sendTextQuery("medium");
}

function hardGame() {
    window.canvas.sendTextQuery("hard");
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
        let fullExp = 0;

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
        let cnt = 0;

        //openHint, closeHint에서 사용
        let hint = "";
        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");

                while (container.hasChildNodes()) {
                    container.removeChild(container.firstChild);
                }

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

                while (container.hasChildNodes()) {
                    container.removeChild(container.firstChild);
                }

                /**
                 * 메인 화면에서 보여줄 사용자의
                 * 레벨, 경험치, 힌트, 코인
                 */
                if (data.level != null) {
                    level = data.level;
                }
                if (data.myExp != null) {
                    exp = data.myExp;
                }
                if (data.myHint != null) {
                    myHint = data.myHint;
                }
                if (data.myCoin != null) {
                    myCoin = data.myCoin;
                }
                if (data.fullExp != null) {
                    fullExp = data.fullExp;
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
                navExp.setAttribute("id", "progress");
                navExp.setAttribute("value", exp);
                navExp.setAttribute("max", fullExp);
                levelBox.appendChild(navExp);

                /**
                 * 중앙에 이어하기, 단계 선택 버튼
                 * @type {HTMLDivElement}
                 */
                const continueNviewallButton = document.createElement("div")
                continueNviewallButton.setAttribute("id", "continueNviewallButton")
                container.appendChild(continueNviewallButton);

                const continueButton = document.createElement("button");
                continueButton.setAttribute("id", "continueButton");
                continueButton.onclick = continuebutton;
                continueButton.textContent = "CONTINUE";
                continueNviewallButton.appendChild(continueButton);

                const viewAllButton = document.createElement("button");
                viewAllButton.setAttribute("id", "viewallButton");
                viewAllButton.onclick = viewallButton;
                viewAllButton.textContent = "SELECT STAGE";
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
                hintBox.setAttribute("class", "fa fa-neuter");
                hintBox.setAttribute("id", "hintBox");
                hintBox.onclick = shop;
                hintNcoin.appendChild(hintBox);

                const hintText = document.createElement("span");
                hintText.setAttribute("id", "hintText");
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
                mainButton.setAttribute("class", "fa fa-home");
                mainButton.setAttribute("id", "main");
                mainButton.onclick = main;
                bottomCommon.appendChild(mainButton);

                const welcomeback = document.createElement("i");
                welcomeback.setAttribute("class", "fa fa-reply");
                welcomeback.setAttribute("id", "welcomeback");
                bottomCommon.appendChild(welcomeback);

                const rankingButton = document.createElement("i");
                rankingButton.setAttribute("class", "fa fa-star");
                rankingButton.setAttribute("id", "ranking");
                rankingButton.onclick = ranking;
                bottomCommon.appendChild(rankingButton);

                const settingButton = document.createElement("i");
                settingButton.setAttribute("class", "fa fa-cog");
                settingButton.setAttribute("id", "setting");
                settingButton.onclick = setting;
                bottomCommon.appendChild(settingButton);

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
                const stepButton = document.createElement("div");
                stepButton.setAttribute("id", "stepButton");
                stepBox.appendChild(stepButton);
                const nextPage = document.createElement("div");
                nextPage.setAttribute("id", "nextPage");
                const nextIcon = document.createElement("i");
                nextIcon.setAttribute("class", "fa fa-angle-right fa-4x");
                nextPage.appendChild(nextIcon);
                stepBox.appendChild(nextPage);
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
                if (document.getElementById("continueNviewallButton") != null) {
                    container.removeChild(document.getElementById("continueNviewallButton"));
                }
                /**
                 * 배팅머니, 획득머니, 시간제한 등을 fulfillment에서 가져옴
                 * 변동사항이 있으면 안되므로 상수 선언
                 */
                if (data.winMoney1 != null) {
                    winMoney1 = data.winMoney1;
                }
                if (data.winMoney2 != null) {
                    winMoney2 = data.winMoney2;
                }
                if (data.winMoney3 != null) {
                    winMoney3 = data.winMoney3;
                }
                if (data.betMoney1 != null) {
                    betMoney1 = data.betMoney1;
                }
                if (data.betMoney2 != null) {
                    betMoney2 = data.betMoney2;
                }
                if (data.betMoney3 != null) {
                    betMoney3 = data.betMoney3;
                }
                if (data.timeLimit1 != null) {
                    timeLimit1 = data.timeLimit1;
                }
                if (data.timeLimit2 != null) {
                    timeLimit2 = data.timeLimit2;
                }
                if (data.timeLimit3 != null) {
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
                mediumBox.onclick = mediumGame;
                difficultyBox.appendChild(mediumBox);
                const mediumText = document.createElement("div");
                mediumText.setAttribute("class", "difficultyText");
                mediumText.textContent = "MEDIUM";
                mediumBox.appendChild(mediumText);
                const mediumDetail = document.createElement("div");
                mediumDetail.setAttribute("class", "difficultyDetail");
                mediumDetail.textContent = "★★ \r\nSUCCESS : " + winMoney2 + "c GET \r\nFAIL : " + betMoney2 + "c CUT \r\nTime Limit : " + timeLimit2 + "s \r\n---------------------\r\n EXP x2";
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
                container.removeChild(document.getElementById("difficultyBox"));
                /**
                 * 게임판, 게임판 행과 열, 시간제한, 맞춰야 할 모든 단어 수는 변경되면 안 되서 상수 선언
                 * 맞춰야 하는 단어 수는 변경되어야 하므로 let 선언 -> correct에서도 사용할 변수
                 */
                const board = data.board;
                const boardRow = data.board[0].length; //열
                const boardCol = data.board.length; //행
                const timeLimit = data.timeLimit;
                const totalWord = data.totalWord;
                // const board = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h'], ['i', 'j', 'k', 'l'], ['m', 'n', 'o', 'p']];
                // const board = [['a', 'b', 'c', 'd', 'd', 'd', 'd', 'd'], ['e', 'f', 'g', 'h', 'd', 'd', 'd', 'd'], ['i', 'j', 'k', 'l', 'd', 'd', 'd', 'd'], ['m', 'n', 'o', 'p', 'd', 'd', 'd', 'd'], ['a', 'b', 'c', 'd', 'd', 'd', 'd', 'd'], ['e', 'f', 'g', 'h', 'd', 'd', 'd', 'd'], ['i', 'j', 'k', 'l', 'd', 'd', 'd', 'd'], ['m', 'n', 'o', 'p', 'd', 'd', 'd', 'd']];
                // console.log(board[0][0]);
                // const boardRow = board[0].length;
                // console.log(boardRow);
                // const boardCol = board.length;
                // console.log(boardCol);
                // const timeLimit = 100;
                // const totalWord = 5;
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
                const gameProgress_HintBox = document.createElement("div");
                gameProgress_HintBox.setAttribute("id", "gameProgress_HintBox");
                inGameBox.appendChild(gameProgress_HintBox);
                const gameProgressBox = document.createElement("div");
                gameProgressBox.setAttribute("id", "gameProgressBox");
                gameProgressBox.setAttribute("class", "inGameBoxMargin");
                gameProgress_HintBox.appendChild(gameProgressBox);
                const usedHint = document.createElement("div");
                usedHint.setAttribute("id", "usedHint");
                usedHint.setAttribute("class", "inGameBoxMargin");
                const hint = document.createElement("p");
                hint.textContent = "HINT";
                usedHint.appendChild(hint);
                usedHint.appendChild(document.createElement("hr"));
                gameProgress_HintBox.appendChild(usedHint);
                const gameBoardBox = document.createElement("div");
                gameBoardBox.setAttribute("id", "gameBoardBox");
                gameBoardBox.setAttribute("class", "inGameBoxMargin");
                inGameBox.appendChild(gameBoardBox);
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
                const gameBoardHeight = gameBoard.clientHeight;
                const gameBoardWidth = gameBoard.clientWidth;
                //게임판 안에 넣을 n x n 배열
                for (let col = 0; col < boardCol; col++) {
                    const rowBox = document.createElement("div");
                    rowBox.setAttribute("class", "rowBox");
                    gameBoard.appendChild(rowBox);
                    for (let row = 0; row < boardRow; row++) {
                        const alphabet = document.createElement("div");
                        alphabet.setAttribute("id", col + "," + row);
                        alphabet.setAttribute("class", "gameBoardMargin");
                        alphabet.style.height = gameBoardHeight / boardRow + "px";
                        alphabet.style.width = gameBoardWidth / boardCol + "px";
                        alphabet.textContent = board[col][row];
                        rowBox.appendChild(alphabet);
                    }
                }
                //게임보드에 높이 맞추기
                usedHint.style.height = (gameBoard.clientHeight * 3 / 5) + "px";
                gameProgressBox.style.width = usedHint.clientWidth + "px";
                //  0 0 0 0 0 형식
                for (let i = 0; i < totalWord; i++) {
                    const gameProgress = document.createElement("div");
                    // gameProgress.style.width = gameProgressBox.clientWidth / totalWord + "px";
                    gameProgress.setAttribute("id", "progress" + i);
                    gameProgress.setAttribute("class", "gameProgress");
                    gameProgressBox.appendChild(gameProgress);
                }
                //main의 게임판 우측에 타이머 배치
                const gameTimerBox = document.createElement("div");
                gameTimerBox.setAttribute("id", "gameTimerBox");
                gameBoardBox.appendChild(gameTimerBox);
                const gameTimer = document.createElement("div");
                gameTimer.setAttribute("id", "gameTimer");
                gameTimer.style.height = (gameBoard.clientHeight * 4 / 5) + "px";
                gameTimerBox.appendChild(gameTimer);
                const remainTime = document.createElement("div");
                remainTime.setAttribute("id", "remainTime");
                gameTimer.appendChild(remainTime);
                const gameTimerText = document.createElement("div");
                gameTimerText.setAttribute("id", "gameTimerText");
                gameTimerBox.appendChild(gameTimerText);
                const remainHeight = document.getElementById("gameTimer").clientHeight;
                startTimer(timeLimit, remainHeight);
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
                const correctOne = document.getElementById("progress" + cnt);
                correctOne.style.backgroundColor = "white";
                cnt++;

                const matchedWord = "0,1";
                // for(let cnt = 0; cnt < matchedWord.length; cnt++) {
                //     document.getElementById(matchedWord[cnt]).style.backgroundColor = "white";
                //     document.getElementById(matchedWord[cnt]).style.color = "black";
                // }
                    document.getElementById(matchedWord).style.backgroundColor = "white";
                    document.getElementById(matchedWord).style.color = "black";

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
                const wrongAudio = document.createElement("audio");
                wrongAudio.canPlayType("audio/mp3");
                wrongAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/wrong_sound.mp3");
                wrongAudio.autoplay = true;
                wrongAudio.load();
                const gameBoard = document.getElementById("gameBoard");
                gameBoard.classList.remove("shake");
                void gameBoard.offsetWidth;
                gameBoard.classList.add("shake");
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
                contentModal.style.height = document.getElementById("gameBoard").clientHeight + "px";
                contentModal.style.width = document.getElementById("gameBoard").clientWidth + "px";
                backgroundModal.appendChild(contentModal);

                // const close = document.createElement("span");
                // close.setAttribute("class", "close");
                // close.textContent = "X";
                // contentModal.appendChild(close);
                const hintModalText = document.createElement("p");
                hintModalText.textContent = "HINT";
                contentModal.appendChild(hintModalText);
                contentModal.appendChild(document.createElement("br"));
                contentModal.appendChild(document.createElement("hr"));
                contentModal.appendChild(document.createElement("br"));

                const hintModal = document.createElement("p");
                if (hint != "noHint") {
                    hintModal.textContent = hint;
                    contentModal.appendChild(hintModal);
                } else if (hint == "noHint") {
                    hintModal.textContent = "Please charge your hint";
                    contentModal.appendChild(hintModal);
                }

                backgroundModal.style.display = "block";

                // close.onclick = function () {
                //     window.canvas.sendTextQuery("close hint");
                //     backgroundModal.style.display = "none";
                //
                // }

                window.onclick = function (event) {
                    if (event.target == backgroundModal) {
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

                if (hint != "noHint") {
                    const usedHint = document.getElementById("usedHint");
                    const content = document.createElement("p");
                    content.textContent = hint;
                    usedHint.appendChild(content);
                }

            },
            RESULT: function (data) {
                console.log("실행 : result");

                while (container.hasChildNodes()) {
                    container.removeChild(container.firstChild);
                }

                const result = data.result;
                level = data.level;
                myHint = data.myHint;
                const matchedList = data.correctList;
                const unmatchedList = data.wrongList;

                const resultBox = document.createElement("div");
                resultBox.setAttribute("id", "resultBox");
                container.appendChild(resultBox);

                const resultleftbox = document.createElement("div");
                resultleftbox.setAttribute("id", "resultleftbox");
                resultBox.appendChild(resultleftbox);

                const resultText = document.createElement("h1");
                resultText.setAttribute("id", "resultText");
                resultText.textContent = result;
                resultleftbox.appendChild(resultText);

                const levelBox = document.createElement("div");
                levelBox.setAttribute("id", "resultlevelBox");
                resultleftbox.appendChild(levelBox);

                const mylevel = document.createElement("div");
                mylevel.textContent = "Lv." + level;
                levelBox.appendChild(mylevel);

                const progressbar = document.createElement("progress");
                progressbar.setAttribute("id", "resultprogress");
                progressbar.setAttribute("value", data.myExp);
                progressbar.setAttribute("max", fullExp);
                levelBox.appendChild(progressbar);

                if (result == "success") {
                    const gainexp = document.createElement("div");
                    gainexp.textContent = "+" + (data.myExp - exp);
                    levelBox.appendChild(gainexp);
                } else if (result == "fail") {
                    const gainexp = document.createElement("div");
                    gainexp.textContent = "";
                    levelBox.appendChild(gainexp);
                }

                const coinBox = document.createElement("div");
                coinBox.setAttribute("id", "resultcoinbox");
                resultleftbox.appendChild(coinBox);

                const coin = document.createElement("i");
                coin.setAttribute("class", "fa fa-eur");
                coinBox.appendChild(coin);

                const mycoin = document.createElement("div");
                mycoin.textContent = myCoin;
                coinBox.appendChild(mycoin);

                if (result == "success") {
                    const gaincoin = document.createElement("div");
                    gaincoin.textContent = "+" + (data.myCoin - myCoin);
                    coinBox.appendChild(gaincoin);
                } else if (result == "fail") {
                    const gaincoin = document.createElement("div");
                    gaincoin.textContent = "-" + (myCoin - data.myCoin);
                    coinBox.appendChild(gaincoin);
                }

                const resultWord = document.createElement("div");
                resultWord.setAttribute("id", "resultWord");
                resultleftbox.appendChild(resultWord);

                const matcheddiv = document.createElement("div");
                matcheddiv.setAttribute("id", "matcheddiv");
                resultWord.appendChild(matcheddiv);

                for (let i = 0; i < matchedList.length; i++) {
                    const matched = document.createElement("span");
                    matched.setAttribute("id", "matched");
                    matched.textContent = matchedList[i];
                    matcheddiv.appendChild(matched);
                }

                const unmatcheddiv = document.createElement("div");
                resultWord.appendChild(unmatcheddiv);

                for (let i = 0; i < unmatchedList.length; i++) {
                    const unmatched = document.createElement("span");
                    unmatched.setAttribute("id", "unmatched");
                    unmatched.textContent = unmatchedList[i];
                    unmatcheddiv.appendChild(unmatched);
                }

                const RetryOrNextButton = document.createElement("div");
                RetryOrNextButton.setAttribute("id", "RetryOrNextButton");
                resultBox.appendChild(RetryOrNextButton);

                if (result == "success") {
                    const nextbutton = document.createElement("i");
                    nextbutton.setAttribute("class", "fa fa-chevron-right fa-3x");
                    RetryOrNextButton.appendChild(nextbutton);
                    nextbutton.onclick = next;

                    const nextText = document.createElement("div");
                    nextText.textContent = "NEXT";
                    RetryOrNextButton.appendChild(nextText);
                } else if (result == "fail") {
                    const retrybutton = document.createElement("i");
                    retrybutton.setAttribute("class", "fa fa-undo fa-3x");
                    retrybutton.onclick = retry;
                    RetryOrNextButton.appendChild(retrybutton);

                    const retryText = document.createElement("div");
                    retryText.textContent = "RETRY";
                    RetryOrNextButton.appendChild(retryText);
                }
                exp = data.myExp;
                myCoin = data.myCoin;
            },
            SETTING: function (data) {
                console.log("실행 : setting");

                if (document.getElementById("stepBox") != null) {
                    container.removeChild(document.getElementById("stepBox"));
                }
                if (document.getElementById("continueNviewallButton") != null) {
                    container.removeChild(document.getElementById("continueNviewallButton"));
                }

                const UserID = document.createElement("div");
                UserID.setAttribute("id", "UserID");
                UserID.textContent = "O2Ogmail.com";
                container.appendChild(UserID);

                const leftBox = document.createElement("div");
                leftBox.setAttribute("id", "leftBox");
                container.appendChild(leftBox);

                const SoundEffect = document.createElement("div");
                SoundEffect.setAttribute("id", "SoundEffect");
                SoundEffect.textContent = "Sound Effect";
                leftBox.appendChild(SoundEffect);

                const BackGroundEffect = document.createElement("div");
                BackGroundEffect.setAttribute("id", "BackGroundEffect");
                BackGroundEffect.textContent = "BackGround Effect";
                leftBox.appendChild(BackGroundEffect);

                const label = document.createElement("label");
                label.setAttribute("class", "switch");
                container.appendChild(label);

                const input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                label.appendChild(input);

                const span = document.createElement("span");
                span.setAttribute("class", "slider round");
                label.appendChild(span);

                const label2 = document.createElement("label");
                label2.setAttribute("class", "switch2");
                container.appendChild(label2);

                const input2 = document.createElement("input");
                input2.setAttribute("type", "checkbox");
                label2.appendChild(input2);

                const span2 = document.createElement("span");
                span2.setAttribute("class", "slider round");
                label2.appendChild(span2);

                /**
                 * 초기화
                 */
                const ResetButton = document.createElement("button");
                ResetButton.setAttribute("id", "ResetButton");
                ResetButton.textContent = "RESET";
                container.appendChild(ResetButton);
            },
            RANKING: function (data) {
                console.log("실행 : ranking");

                if (document.getElementById("stepBox") != null) {
                    container.removeChild(document.getElementById("stepBox"));
                }
                if (document.getElementById("continueNviewallButton") != null) {
                    container.removeChild(document.getElementById("continueNviewallButton"));
                }

                // let array = {a : [{"email":"o2o","level" : 2,"exp" : 250},{"email" : "ja","level" : 3, "exp" : 550 }]};
                //
                // var test = JSON.stringify(array);

                const rankBox = document.createElement("div");
                rankBox.setAttribute("id", "rankBox");
                container.appendChild(rankBox);

                const yourrank = document.createElement("div");
                yourrank.setAttribute("id", "yourrank");
                yourrank.textContent = "O2O@gmail.com 님의 랭킹은 1위";
                rankBox.appendChild(yourrank);

                const ranking = document.createElement("div");
                ranking.setAttribute("class", "ranking");
                rankBox.appendChild(ranking);

                for (let i = 0; i < 50; i++) {
                    const rank = document.createElement("div");
                    rank.setAttribute("id", "rank");
                    ranking.appendChild(rank);

                    const User = document.createElement("div");
                    User.setAttribute("id", "User");
                    rank.appendChild(User);

                    const ranknum = document.createElement("div");
                    ranknum.setAttribute("id", "ranknum");
                    ranknum.textContent = "RANK " + (i + 1);
                    User.appendChild(ranknum);

                    const rankId = document.createElement("div");
                    rankId.setAttribute("id", "rankId");
                    rankId.textContent = "o2o@gmail.com";
                    User.appendChild(rankId);

                    const rankexp = document.createElement("div");
                    rankexp.setAttribute("id", "rankexp");
                    rank.appendChild(rankexp);
                    rankexp.textContent = "exp 5140"
                }


                // let array = {a : [{"email":"o2o","level" : 2,"exp" : 250},{"email" : "ja","level" : 3, "exp" : 550 }]};
                //
                // var test = JSON.stringify(array);
                //
                // let userrank = 10;
                //
                // const rankBox = document.createElement("div");
                // container.appendChild(rankBox);
                //
                // const yourrank = document.createElement("div");
                // yourrank.setAttribute("id","yourrank");
                // yourrank.textContent = "O2O@gmail.com 님의 랭킹은 1위";
                // rankBox.appendChild(yourrank);
                //
                // const ranking = document.createElement("div");
                // ranking.setAttribute("class","ranking");
                // rankBox.appendChild(ranking);
                //
                // for(let i = 0; i < 20; i++) {
                //     const rank = document.createElement("div");
                //     rank.setAttribute("class", "rank");
                //     rank.setAttribute("id", "rank" + i);
                //     ranking.appendChild(rank);
                //
                //     const User = document.createElement("div");
                //     User.setAttribute("id", "User");
                //     rank.appendChild(User);
                //
                //     const ranknum = document.createElement("div");
                //     ranknum.setAttribute("id", "ranknum");
                //     ranknum.textContent = "RANK " + (i + 1);
                //     User.appendChild(ranknum);
                //
                //     const rankId = document.createElement("div");
                //     rankId.setAttribute("id", "rankId");
                //     // rankId.textContent = test[i];
                //     rankId.textContent = "o2o@gmail.com";
                //     User.appendChild(rankId);
                //
                //     const rankexp = document.createElement("div");
                //     rankexp.setAttribute("id", "rankexp");
                //     rankexp.textContent = "exp 5140";
                //     rank.appendChild(rankexp);
                // }

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

                if (document.getElementById("stepBox") != null) {
                    container.removeChild(document.getElementById("stepBox"));
                }
                if (document.getElementById("continueNviewallButton") != null) {
                    container.removeChild(document.getElementById("continueNviewallButton"));
                }

                const Store = document.createElement("div");
                Store.setAttribute("id", "Store");
                container.appendChild(Store);

                const Hintbox = document.createElement("div");
                Hintbox.setAttribute("id", "HintBox");
                Store.appendChild(Hintbox);

                const top = document.createElement("div");
                top.setAttribute("id", "top");
                Hintbox.appendChild(top);

                const HintText = document.createElement("div");
                HintText.textContent = "Hint Purchase";
                top.appendChild(HintText);

                const hr = document.createElement("hr");
                hr.setAttribute("id", "hr");
                top.appendChild(hr);

                const HintIcon = document.createElement("i");
                HintIcon.setAttribute("class", "fa fa-neuter fa-2x");
                top.appendChild(HintIcon);

                const Hintcount = document.createElement("span");
                Hintcount.textContent = " X 3";
                top.appendChild(Hintcount);

                const price = document.createElement("div");
                price.setAttribute("id", "price");
                price.textContent = "300c";
                Hintbox.appendChild(price);

                //
                const Coinbox = document.createElement("div");
                Coinbox.setAttribute("id", "Coinbox");
                Store.appendChild(Coinbox);

                const cointop = document.createElement("div");
                cointop.setAttribute("id", "cointop");
                Coinbox.appendChild(cointop);

                const CoinText = document.createElement("div");
                CoinText.textContent = "Coin Purchase";
                cointop.appendChild(CoinText);

                const hr2 = document.createElement("hr");
                hr2.setAttribute("id", "hr");
                cointop.appendChild(hr2);

                const CoinIcon = document.createElement("i");
                CoinIcon.setAttribute("class", "fa fa-eur fa-2x");
                cointop.appendChild(CoinIcon);

                const Coincount = document.createElement("span");
                Coincount.textContent = " 1000c";
                cointop.appendChild(Coincount);

                const CoinPrice = document.createElement("div");
                CoinPrice.setAttribute("id", "CoinPrice");
                CoinPrice.textContent = "1000w";
                Coinbox.appendChild(CoinPrice);

                //
                const ad = document.createElement("div");
                ad.setAttribute("id", "ad");
                container.appendChild(ad);

                const adtext = document.createElement("span");
                adtext.textContent = "GET COINS ";
                ad.appendChild(adtext);

                const adIcon = document.createElement("i");
                adIcon.setAttribute("class", "fa fa-caret-right");
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