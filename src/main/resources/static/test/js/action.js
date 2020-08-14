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
            element.appendChild(newElement);
        } else {
            newElement.textContent = "STEP " + (index + 1);
            element.appendChild(newElement);
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
    // let element = document.createElement("p");
    // mainTimer.appendChild(element);

    interval = setInterval(function () {

        if (!startFlag) {
            mainTimer.textContent = timerTime;
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

/**
 * This class is used as a wrapper for Google Assistant Canvas Action class
 * along with its callbacks.
 */
class Action {

    /**
     * @param {*} scene which serves as a container of all visual elements
     */
    constructor(scene) {

        //index.html 안의 <div id="screen"></div>
        const container = document.getElementById("screen"); // container
        container.setAttribute("class", "container");
        container.setAttribute("style", "height:" + window.screen.availHeight + "px");

        //main, stageselect, difficultyselect에서 사용
        let level = 0;
        let exp = 0;
        let myHint = 0;
        let myCoin = 0;

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
                playButton.setAttribute("id", "play");
                playButton.textContent = "PLAY";
                welcomeBox.appendChild(playButton);

                /**
                 * 문제 발생, 위치 제대로 배치되지 않음
                 * @type {HTMLDivElement}
                 */
                const copyright = document.createElement("span");
                copyright.setAttribute("id", "copyright");
                copyright.textContent = "copyright";
                container.appendChild(copyright);

                const o2ologo = document.createElement("span");
                o2ologo.setAttribute("id", "o2ologo");
                o2ologo.textContent = "img";
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
                level = data.level;
                exp = data.myExp + "/" + data.fullExp; // "31/54"
                myHint = data.myHint;
                myCoin = data.myCoin;

                /**
                 * 좌측 사용자 레벨, 경험치
                 * @type {HTMLDivElement}
                 */
                const levelBox = document.createElement("div");
                levelBox.setAttribute("id", "levelBox");
                container.appendChild(levelBox);

                const navIcon = document.createElement("div");
                navIcon.setAttribute("class", "common");
                navIcon.textContent = "user icon";
                levelBox.appendChild(navIcon);
                const navLevel = document.createElement("div");
                navLevel.setAttribute("class", "common");
                navLevel.textContent = "Lv." + level;
                levelBox.appendChild(navLevel);
                const navExp = document.createElement("div");
                navExp.setAttribute("class", "common");
                navExp.textContent = exp;
                levelBox.appendChild(navExp);

                /**
                 * 좌측 하단에
                 * 뒤로가기 버튼
                 * @type {HTMLButtonElement}
                 */

                const backBox = document.createElement("div");
                backBox.setAttribute("id", "backBox");
                container.appendChild(backBox);

                const backButton = document.createElement("button");
                backButton.textContent = "back icon";
                backBox.appendChild(backButton);

                const backText = document.createElement("text");
                backText.textContent = "뒤로";
                backBox.appendChild(backText);

                /**
                 * 중앙에 이어하기, 단계 선택 버튼
                 * @type {HTMLDivElement}
                 */
                const continueNviewallButton = document.createElement("div")
                continueNviewallButton.setAttribute("id","continueNviewallButton")
                container.appendChild(continueNviewallButton);

                const continueButton = document.createElement("button");
                continueButton.setAttribute("class", "continue-viewallMargin");
                continueButton.textContent = "continue";
                continueNviewallButton.appendChild(continueButton); //main.[0]

                const viewAllButton = document.createElement("button");
                viewAllButton.setAttribute("class", "continue-viewallMargin");
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

                const hintBox = document.createElement("span");
                hintBox.setAttribute("class", "common");
                hintBox.setAttribute("id", "hintBox");
                hintNcoin.appendChild(hintBox);

                const hintButton = document.createElement("button");
                hintButton.textContent = "hint";
                hintBox.appendChild(hintButton);

                const hintText = document.createElement("p");
                hintText.setAttribute("id", "hintText");
                hintText.textContent = myHint;
                hintBox.appendChild(hintText);

                const coinBox = document.createElement("span");
                coinBox.setAttribute("class", "common");
                coinBox.setAttribute("id", "coin");
                hintNcoin.appendChild(coinBox);

                const coinButton = document.createElement("button");
                coinButton.textContent = "coin";
                coinBox.appendChild(coinButton);

                const coinText = document.createElement("p");
                coinText.textContent = myCoin;
                coinBox.appendChild(coinText);

                /**
                 * 우측 하단에
                 * 메인, 랭킹, 설정
                 * @type {HTMLDivElement}
                 */
                const bottomCommon = document.createElement("div");
                bottomCommon.setAttribute("id", "bottom");
                container.appendChild(bottomCommon);

                const mainBox = document.createElement("div");
                mainBox.setAttribute("id", "mainBox");
                bottomCommon.appendChild(mainBox);

                const mainButton = document.createElement("button");
                mainButton.textContent = "main";
                mainBox.appendChild(mainButton);

                const mainText = document.createElement("p");
                mainText.textContent = "main";
                mainBox.appendChild(mainText);

                const rankingBox = document.createElement("div");
                rankingBox.setAttribute("class", "common bottom");
                rankingBox.setAttribute("id", "ranking");
                bottomCommon.appendChild(rankingBox);
                
                const rankingButton = document.createElement("button");
                rankingButton.textContent = "ranking";
                rankingBox.appendChild(rankingButton);

                const rankingText = document.createElement("p");
                rankingText.textContent = "ranking";
                rankingBox.appendChild(rankingText);

                const settingBox = document.createElement("div");
                settingBox.setAttribute("class", "common bottom");
                settingBox.setAttribute("id", "setting");
                bottomCommon.appendChild(settingBox);

                const settingButton = document.createElement("button");
                settingButton.textContent = "setting";
                settingBox.appendChild(settingButton);

                const settingText = document.createElement("p");
                settingText.textContent = "setting";
                settingBox.appendChild(settingText);

                //메인 화면에서 메인 버튼, 뒤로가기가 보이지 않도록 함
                document.getElementById("mainBox").style.visibility = "hidden";
                document.getElementById("backBox").style.visibility = "hidden";


            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");

                /**
                 * 좌측 하단에
                 * 뒤로가기 버튼 보이게 하기
                 */
                document.getElementById("backBox").style.visibility = "visible";

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

                //단계 선택에서는 랭킹 버튼이 보이지 않도록 함
                document.getElementById("ranking").style.visibility = "hidden";

            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");

                /**
                 * 좌측 하단에
                 * 뒤로가기 버튼 보이게 하기
                 */
                document.getElementById("backBox").style.visibility = "visible";

                /**
                 * 1. view all -> step 1 -> difficulty
                 * 단계 선택, 중앙에 생성했던
                 * 단계 버튼 제거
                 */
                if (document.getElementById("stepBox") != null) {
                    container.removeChild(document.getElementById("stepBox"));
                }

                /**
                 * 2. continue -> difficulty
                 * 메인 화면, 중앙에 생성했던
                 * continue, view all 버튼 제거
                 *
                 * 우측 하단에 있는 랭킹 버튼 안 보이게 함
                 *
                 */
                else if (document.getElementById("stepBox") == null) {
                    container.removeChild(document.getElementById("continueNviewallButton"));

                    document.getElementById("ranking").style.visibility = "hidden";
                }

                /**
                 * 배팅머니, 획득머니, 시간제한 등을 fulfillment에서 가져옴
                 * 변동사항이 있으면 안되므로 상수 선언
                 */
                const winMoney1 = data.winMoney1;
                const winMoney2 = data.winMoney2;
                const winMoney3 = data.winMoney3;
                const betMoney1 = data.betMoney1;
                const betMoney2 = data.betMoney2;
                const betMoney3 = data.betMoney3;
                const timeLimit1 = data.timeLimit1;
                const timeLimit2 = data.timeLimit2;
                const timeLimit3 = data.timeLimit3;

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

                const easyBox = document.createElement("button");
                easyBox.setAttribute("class", "difficultyBoxMargin");
                easyBox.textContent = "Easy \r\n● winMoney : " + winMoney1 + " \r\n● betMoney : " + betMoney1 + " \n● timeLimit : " + timeLimit1;
                difficultyBox.appendChild(easyBox);

                const mediumBox = document.createElement("button");
                mediumBox.setAttribute("class", "difficultyBoxMargin");
                mediumBox.textContent = "Medium \r\n● winMoney : " + winMoney2 + " \r\n● betMoney : " + betMoney2 + " \n● timeLimit : " + timeLimit2;
                difficultyBox.appendChild(mediumBox);

                const hardBox = document.createElement("button");
                hardBox.setAttribute("class", "difficultyBoxMargin");
                hardBox.textContent = "Hard \n● winMoney : " + winMoney3 + " \n● betMoney : " + betMoney3 + " \n● timeLimit : " + timeLimit3;
                difficultyBox.appendChild(hardBox);

            },
            INGAME: function (data) {
                console.log("실행 : inGame");

                /**
                 * 1. 난이도 선택 -> 인게임
                 * 난이도 선택 화면, 중앙에 있는
                 * easy, medium, hard 버튼 제거
                 *
                 * 좌측 상단에 있는
                 * 사용자 레벨, 경험치 안 보이게 함
                 *
                 * 좌측 하단에 있는
                 * 뒤로가기 버튼 안 보이게 함
                 */

                container.removeChild(document.getElementById("difficultyBox"));
                document.getElementById("levelBox").style.visibility = "hidden";
                document.getElementById("backBox").style.visibility = "hidden";

                /**
                 * 2. 결과 화면 -> 재도전 or 이어하기
                 *
                 * 좌측 상단에
                 * 힌트, 코인 보이게 하기
                 *
                 * 좌측 하단에
                 * 랭킹 안 보이게 하기
                 */
                document.getElementById("hint-coin").style.visibility = "visible";
                document.getElementById("ranking").style.visibility = "hidden";

                /**
                 * 게임판, 게임판 행과 열, 시간제한, 맞춰야 할 모든 단어 수는 변경되면 안 되서 상수 선언
                 * 맞춰야 하는 단어 수는 변경되어야 하므로 let 선언 -> correct에서도 사용할 변수
                 */
                const board = data.board;
                const boardRow = data.board[0].length; //열
                const boardCol = data.board.length; //행
                const timeLimit = data.timeLimit;
                const totalWord = data.totalWord;
                remainingWord = data.totalWord; //처음에는 남은 단어 수 = 맞춰야 할 모든 단어 수

                /**
                 * 좌측 중앙에
                 * 사용자가 사용한 힌트가 보임
                 *
                 * 좌측 하단에 게임 진행상황을 보임
                 * @type {HTMLDivElement}
                 */
                const usedHint = document.createElement("div");
                usedHint.setAttribute("id", "usedHint");
                usedHint.textContent = "used hint\r\n";
                usedHint.textContent += "-------------------\r\n";
                container.appendChild(usedHint);

                const gameProgressBox = document.createElement("div");
                gameProgressBox.setAttribute("id", "gameProgressBox");
                container.appendChild(gameProgressBox);

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
                container.appendChild(gameBoard);

                //게임판 안에 넣을 n x n 배열
                for (let col = 0; col < boardCol; col++) {
                    for (let row = 0; row < boardRow; row++) {
                        const alphabet = document.createElement("span");
                        alphabet.setAttribute("class", "gameBoardMargin");
                        alphabet.textContent = board[col][row];
                        gameBoard.appendChild(alphabet);
                    }
                    const lineSpacing = document.createElement("br");
                    gameBoard.appendChild(lineSpacing);
                }

                //main의 게임판 우측에 타이머 배치
                const gameTimer = document.createElement("span");
                gameTimer.setAttribute("id", "gameTimer");
                container.appendChild(gameTimer);
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
            },
            RANKING: function (data) {
                console.log("실행 : ranking");

                /**
                 * 랭킹 화면은
                 * 뒤로 가기
                 * 나의 랭킹
                 * 1위부터 ...
                 */

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