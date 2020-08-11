/**
 * appendChild를 사용한 stageLock
 * 스테이지 선택할 때 level에 따라 선택할 수 있는 스테이지와 그렇지 않은 스테이지로 바뀜
 * @param level
 * @returns {*}
 */
function stageLock(level) {
    let index;
    let element = document.getElementById("main");
    for (index = 0; index <= 9; index++) {
        let newElement = document.createElement('button');
        if (level <= index) {
            newElement.textContent = 'STAGE' + (index + 1);
            newElement.setAttribute("disabled", true);
            newElement.setAttribute("style", "margin: 10px");
            element.appendChild(newElement);
        } else {
            newElement.textContent = 'STAGE' + (index + 1);
            newElement.setAttribute("style", "margin: 10px");
            element.appendChild(newElement);
        }
    }
}

/**
 * appendChild를 이용한 timer
 * 인게임에서 사용할 타이머
 * 함수의 현 문제 : 초가 바뀔 때마다 새로운 공간이 생성됨 -> replaceChild 사용해서 해결
 * 다른 문제 발생 : 10, 8, 6, 4, 2, 0이면 스크롤 바가 생성됨 -> 이미지가 있을 때만 그런 것으로 이미지가 없으면 생성되지 않음
 * @param time
 */
function timer(time) {
    const innertimer = document.getElementById("timer");
    let element = document.createElement("p");
    innertimer.appendChild(element);
    const interval = setInterval(function () {
        element.textContent = time;
        innertimer.replaceChild(element, element);
        time--;
        if (time < 0) {
            clearInterval(interval);
        }
    }, 1000);
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
        const screen = document.getElementById("screen"); // container
        screen.setAttribute("class", "container");
        const header = document.createElement("header");
        screen.appendChild(header); //screen.[0]
        const section = document.createElement("section");
        section.setAttribute("class","content")
        screen.appendChild(section); //screen.[1]
            const nav = document.createElement("nav");
            section.appendChild(nav); //section.[0]
            const main = document.createElement("main");
            main.setAttribute("id", "main")
            section.appendChild(main); //section.[1]
            const aside = document.createElement("aside")
            section.appendChild(aside); //section.[2]
        const footer = document.createElement("footer"); //welcome에서 사용한 후 제거할 것
        screen.appendChild(footer); // screen.[2]


        //main, stageselect, difficultyselect에서 사용
        let level;
        let exp;
        let myHint;
        let myCoin;

        //ingame, correct에서 사용
        let totalWord;

        //openHint, closeHint에서 사용
        let hint;

        let timerOver;
        let cnt = 0; //이미지 표시를 위함 (삭제 예정)

        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");

                const playButton = document.createElement("button");
                playButton.setAttribute("class", "margin");
                playButton.textContent = "PLAY";
                main.appendChild(playButton); //main.[0]

            },
            MAIN: function (data) {
                console.log("실행 : main");

                /**
                 * 메인 화면에서 보여줄 사용자의
                 * 레벨, 경험치, 힌트, 코인
                 */
                level = data.level;
                exp = data.myExp + "/" + data.fullExp; // "34/50"
                myHint = data.myHint;
                myCoin = data.myCoin;

                const navImage = document.createElement("div")
                navImage.setAttribute("class","margin")
                navImage.textContent = '레벨 icon'
                nav.appendChild(navImage)//nav.[0]
                const navLevel = document.createElement("div");
                navLevel.setAttribute("class","margin");
                navLevel.textContent = "Lv." + level;
                nav.appendChild(navLevel); //nav.[1]
                const navExp =  document.createElement("div");
                navExp.setAttribute("class", "margin");
                navExp.textContent = exp;
                nav.appendChild(navExp); //nav.[2]

                const asideCommon = [myHint, myCoin, "ranking", "setting"]; //aside.[0], aside.[2], aside.[4], aside.[6]
                const textbutton = ['힌트','코인','랭킹','세팅'] //aside.[1], aside.[3], aside.[5], aside.[7]
                for(let i = 0; i < 4; i++){
                    //버튼 형식의 icon
                    let commonElement = document.createElement("button")
                    commonElement.setAttribute("class","margin")
                    commonElement.textContent = asideCommon[i];
                    aside.appendChild(commonElement);
                    //text
                    let text = document.createElement("p")
                    text.textContent = textbutton[i];
                    aside.appendChild(text);
                }

                const continueButton = document.createElement('button')
                continueButton.setAttribute("class","margin");
                continueButton.textContent = 'continue';
                main.replaceChild(continueButton,main.childNodes[0]); //main.[0]

                const viewallbutton = document.createElement('button')
                viewallbutton.setAttribute("class","margin");
                viewallbutton.textContent = 'view all';
                main.appendChild(viewallbutton); //main.[1]

            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");

                const back = document.createElement('button')
                back.setAttribute("class","margin")
                back.textContent = 'back 아이콘'
                nav.appendChild(back); //nav.[3]

                main.removeChild(main.childNodes[1])
                main.removeChild(main.childNodes[0])
                stageLock(level);

                aside.childNodes[4].style.visibility= "hidden";
                aside.childNodes[5].style.visibility = "hidden";
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

                //screen에 생성된 selectstage를 제거함
                screen.removeChild(screen.childNodes[0]);
                
                //변동사항이 있으면 안되므로 상수 선언
                const img = document.createElement("img");
                img.setAttribute("style", "max-width:100%; height: auto");
                img.src = "https://actions.o2o.kr/devsvr1/image/selectdifficult.png";
                screen.appendChild(img);

                // document.getElementById("difficulty").innerHTML
                //     = `<BR><BR><BR><BR><BR><BR>
                //        <div style="margin:20px">
                //         <span style="margin: 20px">
                //             <div style="margin: 20px">Lv.${level}</div>
                //             <div style="margin: 20px">${exp}</div>
                //         </span>
                //         <span style="margin: 20px">HINT ${myHint}</span>
                //         <span style="margin: 20px">COIN ${myCoin}</span>
                //        </div>
                //        <div style="margin: 20px">
                //         <span style="margin: 20px">BACK</span>
                //         <span  style="border: 5px; margin: 20px">
                //             <button>Easy<br>● winMoney : ${winMoney1}<br>● betMoney : ${betMoney1}<br>● timeLimit : ${timeLimit1}</button>
                //         </span>
                //         <span style="border: 5px; margin: 20px">
                //             <button>edium<br>● winMoney : ${winMoney2}<br>● betMoney : ${betMoney2}<br>● timeLimit : ${timeLimit2}</button>
                //         </span>
                //         <span style="border: 5px; margin: 20px">
                //             <button>Hard<br>● winMoney : ${winMoney3}<br>● betMoney : ${betMoney3}<br>● timeLimit : ${timeLimit3}</button>
                //          </span>
                //         </div>
                //         <div style="margin: 20px">SETTING</div>`;
            },
            INGAME: function (data) {
                console.log("실행 : inGame");

                /**
                 * 게임판, 게임판 행과 열, 시간제한은 변경되면 안 되서 상수 선언
                 * 맞춰야 하는 단어 수는 변경되어야 하므로 let 선언 -> correct에서도 사용할 변수
                 */
                const board = data.board;
                const boardRow = data.board[0].length;          //열
                const boardCol = data.board.length;            //행
                const timeLimit = data.timeLimit;
                totalWord = data.totalWord;

                // 앞에 생성된 difficultyselect 제거
                screen.removeChild(screen.childNodes[0]);
                
                //ingame 이미지 생성 및 추가
                const inGameImg = document.createElement("img");
                inGameImg.setAttribute("style", "max-width: 100%; height: auto");
                inGameImg.src = "https://actions.o2o.kr/devsvr1/image/ingame0.png";
                screen.appendChild(inGameImg);

                // document.getElementById("inGame").innerHTML
                //     += `<BR><BR><BR><BR><BR><BR>
                //         <span style="margin: 20px">
                //             <div id="hint" style="margin:20px">HINT ${myHint}</div>
                //             <div id="totalWord" style="margin: 20px">You have to find ${totalWord} words</div>
                //         </span>`;
                // for (let col = 0; col < boardCol; col++) {
                //     for (let row = 0; row < boardRow; row++) {
                //         document.getElementById("inGame").innerHTML += `
                //            <span style="margin: 20px; border: 1px">${board[col][row]}</span>
                //         `;
                //     }
                //     document.getElementById("inGame").innerHTML += `
                //            <br>
                //         `;
                // }
                //     document.getElementById("inGame").innerHTML
                //         += `<span style="margin: 20px">
                //     <div style="margin: 20px">SETTING</div>
                // </span>
                // <span id="openHint" style="margin: 10px"></span>
                // <span id="timer" style="margin: 20px"></span>
                // <span id="correctOrWrong" style="margin: 20px"></span>`;

                // const innerTimer = document.createElement("div");
                // innerTimer.setAttribute("id", "timer");
                // screen.appendChild(innerTimer);
                // timer(timeLimit);
                // timerOver = setTimeout(function () {
                //     window.canvas.sendTextQuery("get fail result");
                // }, timeLimit * 1000);
                // document.getElementById("timer").style.display = "none";
            },
            CORRECT: function (data) {
                console.log("실행 : correct");
                
                // 게임 종료 여부를 받아옴, 변경되면 안되므로 상수 선언
                const finish = data.finish;
                // if (finish) {
                //     scene.action.commands.RESULT(data);
                // }
                
                
                screen.removeChild(screen.childNodes[0]);
                const iGimg = document.createElement("img");
                iGimg.setAttribute("style", "max-width:100%; height: auto");
                cnt++;
                if (cnt == 1) {
                    iGimg.src = "https://actions.o2o.kr/devsvr1/image/ingame1.png";
                    screen.appendChild(iGimg);
                } else if (cnt == 2) {
                    iGimg.src = "https://actions.o2o.kr/devsvr1/image/ingame2.png";
                    screen.appendChild(iGimg);
                } else if (cnt == 3) {
                    iGimg.src = "https://actions.o2o.kr/devsvr1/image/ingame3.png";
                    screen.appendChild(iGimg);
                    cnt = 0;
                }

                // totalWord--;
                // document.getElementById("correctOrWrong").innerHTML
                //     = `<span style="margin: 10px">CORRECT</span>`;
                // document.getElementById("totalWord").innerHTML
                //     = "You have to find " + totalWord + " words";
                if (finish) {
                    setTimeout(function () {
                        window.canvas.sendTextQuery("get success result");
                    }, 1000);
                    console.log("get success result");
                    clearTimeout(timerOver);
                }
            },
            WRONG: function (data) {
                console.log("실행 : wrong");

                /**
                 * 틀렸다는 팝업창, 한 1초 후에 창이 닫히고 다시 인게임 화면을 보임
                 */
            },
            OPENHINT: function (data) {
                console.log("실행 : openhint");

                screen.removeChild(screen.childNodes[0]);

                const openHintImg = document.createElement("img");
                openHintImg.setAttribute("style", "max-width: 100%; height: auto");
                openHintImg.src = "https://actions.o2o.kr/devsvr1/image/openhint.png"
                screen.appendChild(openHintImg);

                // myHint--;
                // document.getElementById("hint").innerHTML = "HINT " + myHint;
                // hint = data.hint;
            },
            CLOSEHINT: function (data) {
                console.log("실행: closehint");

                screen.removeChild(screen.childNodes[0]);

                const closeHintImg = document.createElement("img");
                closeHintImg.setAttribute("style", "max-width: 100%; height: auto");
                closeHintImg.src = "https://actions.o2o.kr/devsvr1/image/closehint.png";
                screen.appendChild(closeHintImg);
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
                const correctList = data.correctList;
                const wrongList = data.wrongList;

                screen.removeChild(screen.childNodes[0]);

                //게임 결과 실패일 때
                if (result == "fail") {
                    const failImg = document.createElement("img");
                    failImg.setAttribute("style", "max-width:100%; height: auto");
                    failImg.src = "https://actions.o2o.kr/devsvr1/image/result_fail.png";
                    screen.appendChild(failImg);

                    // document.getElementById("result").innerHTML
                    //     = `<BR><BR><BR><BR><BR><BR>
                    //     <div style="margin:20px">
                    //     <span style="margin: 20px">
                    //         <div style="margin: 20px">Lv.${level}</div>
                    //         <div style="margin: 20px">${exp}</div>
                    //     </span>
                    //     <span style="margin: 20px">HINT ${myHint}</span>
                    //     <span style="margin: 20px">COIN ${myCoin}</span>
                    //    </div>
                    //    <div style="margin: 20px">
                    //     <span style="margin: 20px">BACK</span>
                    //     <span style="margin: 20px">
                    //         <div style="margin: 20px">${result}</div>
                    //         <div style="margin: 20px">Lv.${level} ${exp}++</div>
                    //         <div style="margin: 20px">MATCHED : ${correctList}, UNMATCHED : ${wrongList}</div>
                    //     </span>
                    //     <span style="margin\: 20px">KEEP OR RETRY</span>
                    //    </div>
                    //     <span style="margin: 20px">SETTING</span>
                    //    </div>`;
                } else { //게임 결과가 성공일 때
                    const successImg = document.createElement("img");
                    successImg.setAttribute("style", "max-width:100%; height: auto");
                    successImg.src = "https://actions.o2o.kr/devsvr1/image/result_success.png";
                    screen.appendChild(successImg);

                    // document.getElementById("result").innerHTML
                    //     = `<BR><BR><BR><BR><BR><BR>
                    //     <div style="margin:20px">
                    //     <span style="margin: 20px">
                    //         <div style="margin: 20px">Lv.${level}</div>
                    //         <div style="margin: 20px">${exp}</div>
                    //     </span>
                    //     <span style="margin: 20px">HINT ${myHint}</span>
                    //     <span style="margin: 20px">COIN ${myCoin}</span>
                    //    </div>
                    //    <div style="margin: 20px">
                    //     <span style="margin: 20px">BACK</span>
                    //     <span style="margin: 20px">
                    //         <div style="margin: 20px">${result}</div>
                    //         <div style="margin: 20px">Lv.${level} ${exp}++</div>
                    //         <div style="margin: 20px">MATCHED : ${correctList}, UNMATCHED : ${wrongList}</div>
                    //     </span>
                    //     <span style="margin\: 20px">KEEP OR RETRY</span>
                    //    </div>
                    //     <span style="margin: 20px">SETTING</span>
                    //    </div>`;
                }
            },
            SETTING: function (data) {
                console.log("실행 : setting");

                screen.removeChild(screen.childNodes[0]);

                /**
                 * 설정 화면은
                 * 뒤로 가기
                 * 사용자 계정
                 * 효과음 on/off
                 * 배경음 on/off
                 * 초기화 여부
                 */
                const settingImg = document.createElement("img");
                settingImg.setAttribute("style", "max-width: 100%; height: auto");
                settingImg.src = "https://actions.o2o.kr/devsvr1/image/setting.png";
                screen.appendChild(settingImg);
            },
            RANKING: function (data) {
                console.log("실행 : ranking");

                screen.removeChild(screen.childNodes[0]);

                /**
                 * 랭킹 화면은
                 * 뒤로 가기
                 * 나의 랭킹
                 * 1위부터 ...
                 */

                const rankingImg = document.createElement("img");
                rankingImg.setAttribute("style", "max-width: 100%; height: auto");
                rankingImg.src = "https://actions.o2o.kr/devsvr1/image/ranking.png";
                screen.appendChild(rankingImg);
            },
            SHOP: function (data) {
                console.log("실행 : shop");

                screen.removeChild(screen.childNodes[0]);

                /**
                 * 상점은
                 * 뒤로 가기
                 * (광고 보기 -> 코인 지급)
                 * 코인 충전
                 * 힌트 충전
                 */

                const shopImg = document.createElement("img");
                shopImg.setAttribute("style", "max-width: 100%; height: auto");
                shopImg.src = "https://actions.o2o.kr/devsvr1/image/shop.png";
                screen.appendChild(shopImg);
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