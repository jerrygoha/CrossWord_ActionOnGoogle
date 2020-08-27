/**
 * appendChild를 사용한 stageLock
 * 스테이지 선택할 때 level에 따라 선택할 수 있는 스테이지와 그렇지 않은 스테이지로 바뀜
 * @param level
 * @returns {*}
 */
function stepLock(step) {
    let stepNum = 0;
    const stepBox = document.querySelector("#stepButton");
    for (let row = 0; row < 3; row++) {
        const stepRow = document.createElement("div");
        stepRow.setAttribute("id", "stepRow");
        stepBox.appendChild(stepRow);
        for (let col = 0; col < 4; col++) {
            if (stepNum == 10) return;
            stepNum++;
            const underBox = document.createElement("div");
            if (step < stepNum) { //disable
                const outerBox = document.createElement("div");
                outerBox.setAttribute("id", "outerBox");
                stepRow.appendChild(outerBox);
                underBox.textContent = "Lv. " + stepNum;
                underBox.setAttribute("class", "disableUnderBox");
                const upperBox = document.createElement("div");
                upperBox.setAttribute("class", "upperBox");
                upperBox.textContent = "Lock";
                outerBox.appendChild(underBox);
                outerBox.appendChild(upperBox);
            } else {
                underBox.textContent = "Lv. " + stepNum;
                const num = stepNum;
                console.log("open : " + num);
                underBox.setAttribute("class", "ableUnderBox");
                underBox.addEventListener("click", function () {
                    window.canvas.sendTextQuery("level" + num);
                });
                stepRow.appendChild(underBox);
            }
        }
    }
}

const Timer = (function () {
    let intervalId = null;
    let timerHeightBox = 0;
    let timerTextBox = 0;
    let timerHeight = 0;
    let timerText = 0;
    let minusHeight = 0;

    function setTimer(remainTime, remainHeight) { //시간을 정함.
        timerHeight = remainHeight;
        timerText = remainTime;
        minusHeight = remainHeight / remainTime;
    }

    function initTimer() { //초기 타이머 설정
        timerHeightBox = document.querySelector("#remainTime");
        timerTextBox = document.querySelector("#gameTimerText");

        if (timerHeightBox == null && timerTextBox == null) {
            throw "Element does not exists!";
        }
    }

    function update() {
        //console.log(timer);
        timerTextBox.textContent = timerText;
        timerHeightBox.style.height = timerHeight + "px";
        timerText -= 1;
        timerHeight -= minusHeight;

        if (timerText < 0 && timerHeight < 0) {
            stopTimer();
            window.canvas.sendTextQuery("get fail result");
        }
    }

    function startTimer() {
        if (intervalId !== null) {
            throw "Timer is already running!";
        }
        intervalId = setInterval(update, 1000);
    }

    function stopTimer() {
        if (intervalId === null) {
            throw "Timer is not running!";
        }
        clearInterval(intervalId);
        intervalId = null;
    }

    function resumeTimer() {
        if (intervalId !== null) {
            throw "Timer is already running";
        }
        intervalId = setInterval(update, 1000);
    }

    return {
        'setter': setTimer,
        'init': initTimer,
        'start': startTimer,
        'stop': stopTimer,
        'resume': resumeTimer
    };
})();

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
    window.canvas.sendTextQuery("keep going");
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
        const container = document.querySelector("#screen"); // container
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

        //ingame, correct에서 사용
        let cnt = 0;
        let userEmail = "";


        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");
                console.log(data.inputemail);

                const test = document.createElement("div");
                test.textContent = data.inputemail;
                container.appendChild(test);
                userEmail = data.inputemail;



                /*while (container.hasChildNodes()) {
                    container.removeChild(container.firstChild);
                }

                const welcomeBox = document.createElement("div");
                welcomeBox.setAttribute("id", "welcomeBox");
                container.appendChild(welcomeBox);

                const title = document.createElement("h1");
                title.setAttribute("id", "title");
                title.textContent = "WORD SEARCH";
                welcomeBox.appendChild(title);

                const playButton = document.createElement("div");
                playButton.setAttribute("id", "playbutton");
                playButton.onclick = main;
                const playText = document.createElement("p");
                playText.textContent = "PLAY";
                playButton.appendChild(playText);
                welcomeBox.appendChild(playButton);

                const copyright = document.createElement("span");
                copyright.setAttribute("id", "copyright");
                copyright.textContent = "COPYRIGHT O2O.INC. ALL RIGHT RESERVED";
                container.appendChild(copyright);

                const o2ologo = document.createElement("span");
                o2ologo.setAttribute("id", "o2ologo");
                o2ologo.textContent = "O2OCI";
                container.appendChild(o2ologo);*/

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

                const userLevel = document.createElement("div");
                userLevel.setAttribute("id", "userLevel");
                userLevel.textContent = "Lv." + level;
                levelBox.appendChild(userLevel);

                const userMail = document.createElement("div");
                userMail.setAttribute("id", "userMail");
                userMail.textContent = userEmail;
                levelBox.appendChild(userMail);

                const userExpBox = document.createElement("div");
                levelBox.appendChild(userExpBox);

                const userExp = document.createElement("progress");
                userExp.setAttribute("id", "progress");
                userExp.setAttribute("value", exp);
                userExp.setAttribute("max", fullExp);
                userExpBox.appendChild(userExp);

                const userExpText = document.createElement("div");
                userExpText.setAttribute("id", "userExpText");
                userExpText.textContent = exp + "/" + fullExp;
                userExpBox.appendChild(userExpText);


                /**
                 * 중앙에 이어하기, 단계 선택 버튼
                 * @type {HTMLDivElement}
                 */
                const continue_stageButton = document.createElement("div")
                continue_stageButton.setAttribute("id", "continue_stageButton")
                container.appendChild(continue_stageButton);

                const continueButton = document.createElement("div");
                continueButton.setAttribute("id", "continueButton");
                continueButton.onclick = continuebutton;
                const continueText = document.createElement("p");
                continueText.textContent = "CONTINUE";
                continueButton.appendChild(continueText);
                continue_stageButton.appendChild(continueButton);

                const stageButton = document.createElement("div");
                stageButton.setAttribute("id", "stageButton");
                stageButton.onclick = viewallButton;
                const stageText = document.createElement("p");
                stageText.textContent = "SELECT STAGE";
                stageButton.appendChild(stageText);
                continue_stageButton.appendChild(stageButton);
                /**
                 * 우측 상단에
                 * 힌트와 코인
                 * @type {HTMLDivElement}
                 */
                const hint_coinBox = document.createElement("div");
                hint_coinBox.setAttribute("id", "hint_coinBox");
                container.appendChild(hint_coinBox);

                const hintBox = document.createElement("div");
                hintBox.setAttribute("id", "hintBox");
                const hintIcon = document.createElement("i");
                hintIcon.setAttribute("class", "fa fa-neuter");
                hintIcon.setAttribute("id", "hintIcon");
                hintIcon.onclick = shop;
                hintBox.appendChild(hintIcon);
                hint_coinBox.appendChild(hintBox);

                const hintText = document.createElement("div");
                hintText.setAttribute("id", "hintText");
                hintText.textContent = myHint;
                hintBox.appendChild(hintText);

                const coinBox = document.createElement("div");
                coinBox.setAttribute("id", "coinBox");
                const coinIcon = document.createElement("i");
                coinIcon.setAttribute("class", "fa fa-eur");
                coinIcon.setAttribute("id", "coinIcon");
                coinIcon.onclick = shop;
                coinBox.appendChild(coinIcon);
                hint_coinBox.appendChild(coinBox);

                const coinText = document.createElement("div");
                coinText.setAttribute("id", "coinText");
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
                container.removeChild(document.querySelector("#continue_stageButton"));
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
                let winMoney1 = 0;
                let winMoney2 = 0;
                let winMoney3 = 0;
                let betMoney1 = 0;
                let betMoney2 = 0;
                let betMoney3 = 0;
                let timeLimit1 = 0;
                let timeLimit2 = 0;
                let timeLimit3 = 0;
                /**
                 * 단계 선택, 중앙에 생성했던
                 * 단계 버튼 제거
                 */
                if (document.querySelector("#stepBox") != null) {
                    container.removeChild(document.querySelector("#stepBox"));
                }
                if (document.querySelector("#continue_stageButton") != null) {
                    container.removeChild(document.querySelector("#continue_stageButton"));
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
                if (document.querySelector("#difficultyBox") != null)
                    container.removeChild(document.querySelector("#difficultyBox"));
                if (document.querySelector("#resultBox") != null)
                    container.removeChild(document.querySelector("#resultBox"));
                /**
                 * 게임판, 게임판 행과 열, 시간제한, 맞춰야 할 모든 단어 수는 변경되면 안 되서 상수 선언
                 * 맞춰야 하는 단어 수는 변경되어야 하므로 let 선언 -> correct에서도 사용할 변수
                 */
                const board = data.board;
                const boardRow = data.board[0].length; //열
                const boardCol = data.board.length; //행
                const timeLimit = data.timeLimit;
                const totalWord = data.totalWord;
                cnt = 0;
                // hintCnt = 0;
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
                gameProgress_HintBox.appendChild(usedHint);
                const hint = document.createElement("p");
                hint.textContent = "HINT";
                usedHint.appendChild(hint);
                usedHint.appendChild(document.createElement("hr"));
                const hintScrollBox = document.createElement("div");
                hintScrollBox.setAttribute("id", "hintScrollBox");
                usedHint.appendChild(hintScrollBox);
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
                        const alphabetBox = document.createElement("div");
                        alphabetBox.setAttribute("id", col + "," + row);
                        alphabetBox.setAttribute("class", "alphabetBox");
                        alphabetBox.style.height = gameBoardHeight / boardRow + "px";
                        alphabetBox.style.width = gameBoardWidth / boardCol + "px";
                        rowBox.appendChild(alphabetBox);
                        const alphabet = document.createElement("p");
                        alphabet.setAttribute("class", "alphabet");
                        alphabet.setAttribute("name", board[col][row]);
                        alphabet.textContent = board[col][row].toUpperCase();
                        alphabetBox.appendChild(alphabet);
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
                gameTimer.style.height = (gameBoard.clientHeight * 5 / 6) + "px";
                gameTimerBox.appendChild(gameTimer);
                const remainTime = document.createElement("div");
                remainTime.setAttribute("id", "remainTime");
                gameTimer.appendChild(remainTime);
                const gameTimerText = document.createElement("div");
                gameTimerText.setAttribute("id", "gameTimerText");
                gameTimerBox.appendChild(gameTimerText);
                const remainHeight = document.querySelector("#gameTimer").clientHeight;
                Timer.setter(timeLimit, remainHeight);
                Timer.init();
                Timer.start();
            },
            CORRECT: function (data) {
                console.log("실행 : correct");

                // 게임 종료 여부를 받아옴, 변경되면 안되므로 상수 선언
                const finish = data.finish;

                const correctAudio = document.createElement("audio");
                correctAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/correct_sound.mp3");
                correctAudio.canPlayType("audio/mp3");
                correctAudio.volume = 1.0;
                correctAudio.load();
                correctAudio.autoplay = true;

                const correctOne = document.querySelector("#progress" + cnt);
                correctOne.style.backgroundColor = "white";
                cnt++;

                const matchedWord = data.matchpoint;
                for(let cnt = 0; cnt < matchedWord.length; cnt++) {
                    document.getElementById(matchedWord[cnt]).style.backgroundColor = "rgba( 255, 255, 255, 0.2)";
                }
                // document.getElementById(matchedWord).style.backgroundColor = "rgba( 255, 255, 255, 0.2)";

                //다 맞추면 fulfillment로 textQuery 전송
                if (finish) {
                    setTimeout(function () {
                        window.canvas.sendTextQuery("get success result");
                    }, 1000);
                    Timer.stop();
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
                wrongAudio.volume = 1.0;
                wrongAudio.load();
                wrongAudio.autoplay = true;
                const gameBoard = document.querySelector("#gameBoard");
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
                //몇 단계의 힌트인지
                // hintCnt++;
                //힌트를 열면 타이머를 잠시 멈춤
                Timer.stop();
                //사용자의 남은 힌트를 보여줌
                const remainingHint = document.querySelector("#hintText");
                if (myHint > 0) myHint--;
                remainingHint.textContent = myHint;

                const hint = data.hint;

                if (hintCnt < 3) {
                    const backgroundModal = document.createElement("div");
                    backgroundModal.setAttribute("class", "backgroundModal");
                    backgroundModal.setAttribute("id", "backgroundModal");
                    container.appendChild(backgroundModal);

                    const contentModal = document.createElement("div");
                    contentModal.setAttribute("class", "contentModal");
                    contentModal.style.height = document.getElementById("gameBoard").clientHeight + "px";
                    contentModal.style.width = document.getElementById("gameBoard").clientWidth + "px";
                    backgroundModal.appendChild(contentModal);

                    const hintModalText = document.createElement("p");
                    hintModalText.textContent = "HINT";
                    contentModal.appendChild(hintModalText);
                    contentModal.appendChild(document.createElement("br"));
                    contentModal.appendChild(document.createElement("hr"));
                    contentModal.appendChild(document.createElement("br"));

                    const hintModal = document.createElement("p");
                    if (hint != "noHint") {
                        hintModal.textContent = hint;
                        console.log(hint);
                        contentModal.appendChild(hintModal);
                    } else if (hint == "noHint") {
                        hintModal.textContent = "Please charge your hint";
                        contentModal.appendChild(hintModal);
                    }
                    backgroundModal.style.display = "block";

                    setTimeout(function () {
                        backgroundModal.style.display = "none";
                        Timer.resume();
                        if (hint != "noHint") {
                            const usedHint = document.getElementById("hintScrollBox");                            const content = document.createElement("p");
                            content.textContent = hint;
                            console.log(hint);
                            usedHint.appendChild(content);
                        }
                    }, 5000);
                } else if (hintCnt == 3) {
                    /*첫 글자 알파벳이 존재하는 부분에 하이라이트 -> 텍스트만 하이라이트
                    * text-shadow: 2px 2px 2px gray; text-shadow: 2px 2px 6px gray;*/
                    console.log("hint : " + document.getElementsByName(hint).length);
                    for (let i = 0; i < document.getElementsByName(hint).length; i++)
                        document.getElementsByName(hint)[i].style.textShadow = "1px 1px 8px #FF0000";
                    setTimeout(function () {
                        /*글자가 다시 원상태로 돌아오록 함, usedHint에 추가 "first alphabet : A"*/
                        Timer.resume();
                        for (let i = 0; i < document.getElementsByName(hint).length; i++)
                            document.getElementsByName(hint)[i].style.textShadow = "none";
                        const usedHint = document.getElementById("hintScrollBox");
                        const content = document.createElement("p");
                        content.textContent = "first alphabet is \"" + hint.toUpperCase() + "\"";
                        usedHint.appendChild(content);
                    }, 5000);
                }
            },
            RESULT: function (data) {
                console.log("실행 : result");
                if (document.querySelector("#inGameBox") != null) {
                    container.removeChild(document.querySelector("#inGameBox"));
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
                    const successAudio = document.createElement("audio");
                    successAudio.canPlayType("audio/mp3");
                    successAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/success_sound.mp3");
                    successAudio.volume = 1.0;
                    successAudio.load();
                    successAudio.autoplay = true;
                    const gainexp = document.createElement("div");
                    gainexp.textContent = "+" + (data.myExp - exp);
                    levelBox.appendChild(gainexp);
                } else if (result == "fail") {
                    const failAudio = document.createElement("audio");
                    failAudio.canPlayType("audio/mp3");
                    failAudio.setAttribute("src", "https://actions.o2o.kr/devsvr1/audio/fail_sound.mp3");
                    failAudio.volume = 1.0;
                    failAudio.load();
                    failAudio.autoplay = true;
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
                document.querySelector("#userExpText").textContent = data.myExp + "/" + fullExp;
                document.querySelector("#coinText").textContent = data.myCoin;
                document.querySelector("#progress").setAttribute("value", data.myExp);
                exp = data.myExp;
                myCoin = data.myCoin;
            },
            SETTING: function (data) {
                console.log("실행 : setting");
                if (document.querySelector("#stepBox") != null) {
                    container.removeChild(document.querySelector("#stepBox"));
                }
                if (document.querySelector("#continue_stageButton") != null) {
                    container.removeChild(document.querySelector("#continue_stageButton"));
                }
                if (document.querySelector("#difficultyBox") != null) {
                    container.removeChild(document.querySelector("#difficultyBox"));
                }
                if (document.querySelector("#rankBox") != null) {
                    container.removeChild(document.querySelector("#rankBox"));
                }
                if (document.querySelector("#Store") != null) {
                    container.removeChild(document.querySelector("#Store"));
                }
                if (document.querySelector("#inGameBox") != null) {
                    container.removeChild(document.querySelector("#inGameBox"));
                }
                const SettingBox = document.createElement("div");
                SettingBox.setAttribute("id", "SettingBox");
                container.appendChild(SettingBox);
                const UserID = document.createElement("div");
                UserID.setAttribute("id", "UserID");
                UserID.textContent = "O2Ogmail.com";
                SettingBox.appendChild(UserID);
                // const middleBox = document.createElement("div");
                // middleBox.setAttribute("id","middleBox");
                // container.appendChild(middleBox);
                const leftBox = document.createElement("div");
                leftBox.setAttribute("id", "leftBox");
                SettingBox.appendChild(leftBox);
                const SoundEffect = document.createElement("div");
                SoundEffect.setAttribute("id", "SoundEffect");
                SoundEffect.textContent = "Sound Effect";
                leftBox.appendChild(SoundEffect);
                const BackGroundEffect = document.createElement("div");
                BackGroundEffect.setAttribute("id", "BackGroundEffect");
                BackGroundEffect.textContent = "BackGround Effect";
                leftBox.appendChild(BackGroundEffect);
                const rightBox = document.createElement("div");
                rightBox.setAttribute("id", "rightBox");
                SettingBox.appendChild(rightBox);
                const label = document.createElement("label");
                label.setAttribute("class", "switch");
                rightBox.appendChild(label);
                const input = document.createElement("input");
                input.setAttribute("id","input");
                input.setAttribute("type", "checkbox");
                label.appendChild(input);
                const span = document.createElement("span");
                span.setAttribute("class", "slider round");
                label.appendChild(span);
                const label2 = document.createElement("label");
                label2.setAttribute("class", "switch2");
                rightBox.appendChild(label2);
                const input2 = document.createElement("input");
                input2.setAttribute("id","input2");
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
                SettingBox.appendChild(ResetButton);
            },
            SETTINGSELECT: function (data)
            {
                let sound = data.sound; //1. soundEffect 2.background sound
                let onoff = data.onoff; //1.  1 오면 true -> on/ 0오면 false;
                if((onoff == "[1]")&&(sound == "SoundEffect")){
                    document.querySelector("#input").checked = true;
                }
                if((onoff == "[0]")&&(sound == "SoundEffect")){
                    document.querySelector("#input").checked = false;
                }
                if((onoff == "[1]")&&(sound == "BackGround")){
                    document.querySelector("#input2").checked = true;
                }
                if((onoff == "[0]")&&(sound == "BackGround")){
                    document.querySelector("#input2").checked = false;
                }
            },
            RANKING: function (data) {
                console.log("실행 : ranking");
                if (document.querySelector("#stepBox") != null) {
                    container.removeChild(document.querySelector("#stepBox"));
                }
                if (document.querySelector("#continue_stageButton") != null) {
                    container.removeChild(document.querySelector("#continue_stageButton"));
                }
                if (document.querySelector("#SettingBox") != null) {
                    container.removeChild(document.querySelector("#SettingBox"));
                }
                if (document.querySelector("#Store") != null) {
                    container.removeChild(document.querySelector("#Store"));
                }
                if (document.querySelector("#inGameBox") != null) {
                    container.removeChild(document.querySelector("#inGameBox"));
                }

                let totalRank = data.totalRank;
                let myrank = data.myRank;
                console.log("totalRank : " + totalRank); //list.json
                console.log("myrank : "+ myrank);

                const rankBox = document.createElement("div");
                rankBox.setAttribute("id", "rankBox");
                container.appendChild(rankBox);
                const yourrank = document.createElement("div");
                yourrank.setAttribute("id", "yourrank");
                yourrank.textContent = userEmail+"님의 랭킹은"+myrank+"위입니다.";
                rankBox.appendChild(yourrank);
                const ranking = document.createElement("div");
                ranking.setAttribute("class", "ranking");
                rankBox.appendChild(ranking);
                for (let i = 0; i < totalRank.length; i++) {
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
                    rankId.textContent = totalRank[i][0];
                    User.appendChild(rankId);
                    const rankexp = document.createElement("div");
                    rankexp.setAttribute("id", "rankexp");
                    rank.appendChild(rankexp);
                    rankexp.textContent = "exp \t"+totalRank[i][1];
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
                if (document.querySelector("#stepBox") != null) {
                    container.removeChild(document.querySelector("#stepBox"));
                }
                if (document.querySelector("#continue_stageButton") != null) {
                    container.removeChild(document.querySelector("#continue_stageButton"));
                }
                if (document.querySelector("#rankBox") != null) {
                    container.removeChild(document.querySelector("#rankBox"));
                }
                if (document.querySelector("#SettingBox") != null) {
                    container.removeChild(document.querySelector("#SettingBox"));
                }
                if (document.querySelector("#inGameBox") != null) {
                    container.removeChild(document.querySelector("#inGameBox"));
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
                Store.appendChild(ad);
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