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
            newElement.setAttribute("class", "margin");
            element.appendChild(newElement);
        } else {
            newElement.textContent = "STEP " + (index + 1);
            newElement.setAttribute("class", "margin");
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
    const mainTimer = document.getElementById("mainTimer");
    // let element = document.createElement("p");
    // mainTimer.appendChild(element);

    interval = setInterval(function () {

        if (!startFlag) {
            mainTimer.textContent = timerTime;
            timerTime--;
        }

        if (timerTime < 0) {
            pauseTimer();
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

        const section = document.createElement("section");
        section.setAttribute("class", "content");
        section.setAttribute("style", "height:" + window.innerHeight + "px");
        container.appendChild(section); //screen.[1]

            const nav = document.createElement("nav");
            section.appendChild(nav); //section.[0]
            const main = document.createElement("main");
            main.setAttribute("id", "main");
            section.appendChild(main); //section.[1]
            const aside = document.createElement("aside");
            section.appendChild(aside); //section.[2]

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

                const title = document.createElement("h1");
                title.setAttribute("id", "title");
                title.textContent = "WORD SEARCH";
                main.appendChild(title);

                const playButton = document.createElement("button");
                playButton.setAttribute("id", "play");
                playButton.textContent = "PLAY";
                main.appendChild(playButton);
                
                // footer.textContent = "copyright";

            },
            MAIN: function (data) {
                console.log("실행 : main");
                
                //footer 제거 -> 저작권, 회사 로고 지움
                // container.removeChild(container.childNodes[1]);

                /**
                 * 메인 화면에서 보여줄 사용자의
                 * 레벨, 경험치, 힌트, 코인
                 */
                level = data.level;
                exp = data.myExp + "/" + data.fullExp; // "31/54"
                myHint = data.myHint;
                myCoin = data.myCoin;

                const levelBox = document.createElement("div");
                levelBox.setAttribute("id", "levelBox");
                nav.appendChild(levelBox);

                const navIcon = document.createElement("div");
                navIcon.setAttribute("class", "common");
                navIcon.textContent = "사용자 icon";
                levelBox.appendChild(navIcon);
                const navLevel = document.createElement("div");
                navLevel.setAttribute("class", "common");
                navLevel.textContent = "Lv." + level;
                levelBox.appendChild(navLevel);
                const navExp = document.createElement("div");
                navExp.setAttribute("class", "common");
                navExp.textContent = exp;
                levelBox.appendChild(navExp);


                //main에 존재하는 title과 play 버튼 제거
                while (main.hasChildNodes()) {
                    main.removeChild(main.firstChild);
                }

                const continueNviewallButton = document.createElement("div")
                continueNviewallButton.setAttribute("id","continueNviewallButton")
                main.appendChild(continueNviewallButton);

                const continueButton = document.createElement("button");
                continueButton.setAttribute("class", "common mainScene");
                continueButton.textContent = "continue";
                continueNviewallButton.appendChild(continueButton); //main.[0]

                const viewAllButton = document.createElement("button");
                viewAllButton.setAttribute("class", "common mainScene");
                viewAllButton.textContent = "view all";
                continueNviewallButton.appendChild(viewAllButton); //main.[1]

                const hintNcoin = document.createElement("div");
                hintNcoin.setAttribute("id", "hint-coin");
                aside.appendChild(hintNcoin);

                const hintBox = document.createElement("span");
                hintBox.setAttribute("class", "common");
                hintBox.setAttribute("id", "hint");
                hintNcoin.appendChild(hintBox); //[0]

                const hintButton = document.createElement("button");
                hintButton.textContent = "hint";
                hintBox.appendChild(hintButton);

                const hintText = document.createElement("p");
                hintText.textContent = myHint;
                hintBox.appendChild(hintText);

                const coinBox = document.createElement("span");
                coinBox.setAttribute("class", "common");
                coinBox.setAttribute("id", "coin");
                hintNcoin.appendChild(coinBox); //[1]

                const coinButton = document.createElement("button");
                coinButton.textContent = "coin";
                coinBox.appendChild(coinButton);

                const coinText = document.createElement("p");
                coinText.textContent = myCoin;
                coinBox.appendChild(coinText);

                const bottomCommon = document.createElement("div");
                bottomCommon.setAttribute("id", "bottom");
                aside.appendChild(bottomCommon);

                const mainBox = document.createElement("div");
                mainBox.setAttribute("id", "mainicon");
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
                bottomCommon.appendChild(rankingBox); //[2]

                const rankingButton = document.createElement("button");
                rankingButton.textContent = "ranking";
                rankingBox.appendChild(rankingButton);

                const rankingText = document.createElement("p");
                rankingText.textContent = "ranking";
                rankingBox.appendChild(rankingText);

                const settingBox = document.createElement("div");
                settingBox.setAttribute("class", "common bottom");
                settingBox.setAttribute("id", "setting");
                bottomCommon.appendChild(settingBox); //[3]

                const settingButton = document.createElement("button");
                settingButton.textContent = "setting";
                settingBox.appendChild(settingButton);

                const settingText = document.createElement("p");
                settingText.textContent = "setting";
                settingBox.appendChild(settingText);


                document.getElementById("mainicon").style.visibility = "hidden";


            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");

                const backButton = document.createElement("button");
                backButton.setAttribute("class", "margin");
                backButton.textContent = "back 아이콘";
                nav.appendChild(backButton); //nav.[3]

                const backText = document.createElement("text");
                backText.setAttribute("class", "margin");
                backText.textContent = "뒤로";
                nav.appendChild(backText); //nav.[4]

                //main에 존재하는 이어하기 버튼, 단계 선택 버튼 제거
                while (main.hasChildNodes()) {
                    main.removeChild(main.firstChild);
                }

                const box = document.createElement("div");
                box.setAttribute("id", "stepBox");
                main.appendChild(box);

                stepLock(level); //단계 버튼 생성(10개)

                document.getElementById("ranking").style.visibility = "hidden";

            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");

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

                //main에 있던 모든 자식 요소 제거
                while (main.hasChildNodes()) {
                    main.removeChild(main.firstChild);
                }

                //view all을 거치지 않고 바로 continue를 선택했을 경우
                if (nav.childNodes[3] == null) {
                    const backButton = document.createElement("button");
                    backButton.setAttribute("class", "common");
                    backButton.textContent = "back 아이콘";
                    nav.appendChild(backButton); //nav.[3]

                    const backText = document.createElement("text");
                    backText.setAttribute("class", "common");
                    backText.textContent = "뒤로";
                    nav.appendChild(backText); //nav.[4]

                    document.getElementById("ranking").style.visibility = "hidden";

                }


                /**
                 * 몇 단계를 선택했는지 표시 -> fulfillment에서 가져와야 함
                 */

                const box = document.createElement("div");
                main.appendChild(box);

                const easyBox = document.createElement("button");
                easyBox.setAttribute("class", "margin");
                easyBox.textContent = "Easy ● winMoney : " + winMoney1 + " \r\n● betMoney : " + betMoney1 + " \n● timeLimit : " + timeLimit1;
                box.appendChild(easyBox);

                const mediumBox = document.createElement("button");
                mediumBox.setAttribute("class", "margin");
                mediumBox.textContent = "Medium \n● winMoney : " + winMoney2 + " \n● betMoney : " + betMoney2 + " \n● timeLimit : " + timeLimit2;
                box.appendChild(mediumBox);

                const hardBox = document.createElement("button");
                hardBox.setAttribute("class", "margin");
                hardBox.textContent = "Hard \n● winMoney : " + winMoney3 + " \n● betMoney : " + betMoney3 + " \n● timeLimit : " + timeLimit3;
                box.appendChild(hardBox);

            },
            INGAME: function (data) {
                console.log("실행 : inGame");

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

                //난이도 선택 버튼 제거 -> main에 존재하는 자식 요소 모두 제거
                while (main.hasChildNodes()) {
                    main.removeChild(main.firstChild);
                }

                //사용자 아이콘, 레벨, 경험치, 뒤로 제거 -> nav의 모든 요소 제거
                while (nav.hasChildNodes()) {
                    nav.removeChild(nav.firstChild);
                }

                // aside.childNodes[2].style.visibility = "hidden"; //코인 아이콘 가림
                // aside.childNodes[3].style.visibility = "hidden"; //코인 텍스트 가림
                // aside.childNodes[4].style.visibility = "hidden"; //랭킹 아이콘 가림
                // aside.childNodes[5].style.visibility = "hidden"; //랭킹 텍스트 가림

                //사용한 힌트가 게임판 좌측에 나타나도록 함
                const usedHint = document.createElement("div");
                usedHint.setAttribute("class", "margin");
                usedHint.setAttribute("id", "inGameHint");
                nav.appendChild(usedHint); //nav.[0]

                //게임판 왼쪽 "하단"에 현재 진행상황 보여줌
                const progress = document.createElement("span");
                progress.setAttribute("class", "margin");
                progress.setAttribute("id", "progress");
                progress.textContent = remainingWord;
                nav.appendChild(progress); //nav.[1]

                const words = document.createElement("span");
                words.setAttribute("class", "margin");
                words.textContent = "/" + totalWord;
                nav.appendChild(words);


                //main에 게임판 띄움
                const gameBoard = document.createElement("div");
                gameBoard.setAttribute("class", "margin");
                gameBoard.setAttribute("id", "gameBoard");
                main.appendChild(gameBoard);

                //게임판 안에 넣을 n x n 배열
                for (let col = 0; col < boardCol; col++) {
                    for (let row = 0; row < boardRow; row++) {
                        const alphabet = document.createElement("span");
                        alphabet.setAttribute("class", "margin");
                        alphabet.textContent = board[col][row];
                        gameBoard.appendChild(alphabet);
                    }
                    const lineSpacing = document.createElement("br");
                    gameBoard.appendChild(lineSpacing);
                }

                //main의 게임판 우측에 타이머 배치
                const mainTimer = document.createElement("div");
                mainTimer.setAttribute("class", "margin");
                mainTimer.setAttribute("id", "mainTimer");
                main.appendChild(mainTimer);
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
                const remain = document.getElementById("progress");
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
                const remainingHint = aside.childNodes[0];
                remainingHint.setAttribute("id", "myHint");
                myHint--;
                remainingHint.textContent = myHint;

                hint = data.hint;

                const backgroundModal = document.createElement("div");
                backgroundModal.setAttribute("class", "backgroundModal");
                backgroundModal.setAttribute("id", "backgroundModal");
                main.appendChild(backgroundModal);

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
                    const usedHint = document.getElementById("inGameHint");
                    usedHint.textContent = hint;
                }

            },
            RESULT: function (data) {
                console.log("실행 : result");

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

                //게임판과 타이머 제거 -> main의 자식 요소 모두 제거
                while (main.hasChildNodes()) {
                    main.removeChild(main.firstChild);
                }

                //게임 진행 상황과 사용한 힌트 제거 -> nav의 자식 요소 모두 제거
                while (nav.hasChildNodes()) {
                    nav.removeChild(nav.firstChild);
                }

                const backButton = document.createElement("button");
                backButton.setAttribute("class", "margin");
                backButton.textContent = "back 아이콘";
                nav.appendChild(backButton); //nav.[0]

                const backText = document.createElement("text");
                backText.setAttribute("class", "margin");
                backText.textContent = "뒤로";
                nav.appendChild(backText); //nav.[1]

                //성공인지 실패인지 텍스트의 형태로 보여줌
                const mainResult = document.createElement("h1");
                mainResult.setAttribute("calss", "margin");
                mainResult.textContent = result;
                main.appendChild(mainResult);

                const userIcon = document.createElement("div");
                userIcon.setAttribute("class", "margin");
                userIcon.textContent = "사용자 icon";
                main.appendChild(userIcon);

                const resultLevel = document.createElement("div");
                resultLevel.setAttribute("class", "margin");
                resultLevel.textContent = "Lv." + level;
                main.appendChild(resultLevel);

                const resultExp = document.createElement("div");
                resultExp.setAttribute("class", "margin");
                resultExp.textContent = exp;
                main.appendChild(resultExp);

                const resultCoin = document.createElement("div");
                resultCoin.setAttribute("class", "margin");
                resultCoin.textContent = myCoin;
                main.appendChild(resultCoin);

                const matched = document.createElement("span");
                matched.setAttribute("class", "margin");
                matched.textContent = matchedList;
                main.appendChild(matched);

                const unmatched = document.createElement("span");
                unmatched.setAttribute("class", "margin");
                unmatched.setAttribute("id", "unmatched");
                unmatched.textContent = unmatchedList;
                main.appendChild(unmatched);

                const retryOrContinue = document.createElement("button");
                retryOrContinue.setAttribute("class", "margin");
                if (result == "success") {
                    retryOrContinue.textContent = "continue";
                } else if (result == "fail") {
                    retryOrContinue.textContent = "retry";
                }
                main.appendChild(retryOrContinue);

                //힌트 아이콘 사라지게 함
                aside.childNodes[0].style.visibility = "hidden";
                aside.childNodes[1].style.visibility = "hidden";

                //랭킹 아이콘 보이게 함
                aside.childNodes[4].style.visibility = "visible";
                aside.childNodes[5].style.visibility = "visible";

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