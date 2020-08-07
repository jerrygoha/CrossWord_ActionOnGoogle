/**
 * 해당 Class의 div 전부 숨기기
 */

function hideall() {
    let elements = document.getElementsByClassName("testclass");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

/**
 * appendChild를 사용한 stageLocked
 * 스테이지 선택할 때 level에 따라 선택할 수 있는 스테이지와 그렇지 않은 스테이지로 바뀜
 * @param level
 * @returns {*}
 */
function stageLocked(level) {
    let i;
    let a;
    let element = document.getElementById("stage");
    for (i = 0; i <= 9; i++) {
        let newElement = document.createElement('button');
        if (level <= i) {
            newElement.textContent = 'STAGE' + (i + 1);
            newElement.setAttribute("disabled", true);
            newElement.setAttribute("style", "margin: 10px");
            element.appendChild(newElement);
        } else {
            newElement.textContent = 'STAGE' + (i + 1);
            newElement.setAttribute("style", "margin: 10px");
            element.appendChild(newElement);
        }
    }
    return a;
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
        const screen = document.getElementById("screen");
        // screen.innerHTML = `<br><br><br><br><br><br><br>`;
        //공통화면을 위해 전역변수로 선언
        let level;
        let exp;
        let myHint;
        let myCoin;

        //correct command가 왔을 때 변화를 위해 전역변수 선언
        let totalWord;

        //openHint & closeHint command를 위한 전역변수 선언
        let hint;

        let timerOver;
        let cnt = 0;

        //코드 간결화 변수
// let welcome;
// let main;
// let stageSelect;

        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");

                const welcomeImg = document.createElement("img");
                welcomeImg.setAttribute("style", "max-width: 100%; height: auto");
                welcomeImg.src = "https://actions.o2o.kr/devsvr1/image/welcome.png";
                screen.appendChild(welcomeImg);
                // const welcome = document.createElement("button");
                // welcome.setAttribute("style", "margin:20px");
                // welcome.textContent = "PLAY";
                // screen.appendChild(welcome);

            },
            MAIN: function (data) {
                console.log("실행 : main");
                level = data.level;
                exp = data.myExp + "/" + data.fullExp;
                myHint = data.myHint;
                myCoin = data.myCoin;

                screen.removeChild(screen.childNodes[0]);

                const img = document.createElement("img");
                img.setAttribute("style", "max-width:100%; height: auto");
                img.src = "https://actions.o2o.kr/devsvr1/image/main.png";
                screen.appendChild(img);

                //코드 간결화
// main = document.createElement('span')
// main.setAttribute("style","margin : 20px")
// main.textContent = 'Lv.'+level
// document.getElementById("view").replaceChild(main,welcome);
//
// const common = [exp,myHint,myCoin]
// for(let i = 0; i < 3; i++){
//     let common1 = document.createElement('span')
//     common1.setAttribute("style","margin : 20px")
//     common1.textContent = common[i];
//     document.getElementById("view").appendChild(common1);
// }
//
// const button = ['continue','view all','setting']
// for(let i = 0; i < 3; i++){
//     let button1 = document.createElement('div');
//     button1.setAttribute("style","margin : 20px")
//     button1.textContent = button[i];
//     document.getElementById("view").appendChild(button1);
// }
            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");
                screen.removeChild(screen.childNodes[0]);
                const img = document.createElement("img");
                img.setAttribute("style", "max-width:100%; height: auto");
                img.src = "https://actions.o2o.kr/devsvr1/image/selectstage.png";
                screen.appendChild(img);

                // stageLocked(level);
                // document.getElementById("stage").innerHTML
                //     = `<BR><BR><BR><BR><BR><BR>
                //         <div>
                //             <span style="margin:20px">
                //                 <div style="margin:20px">Lv.${level}</div>
                //                 <div style="margin:20px">${exp}</div>
                //             </span>
                //             <span style="margin: 20px">
                //                 HINT ${myHint}
                //             </span>
                //             <span style="margin: 20px">
                //                 COIN ${myCoin}
                //             </span>
                //         </div>`;
                // stageLocked(level);
                // document.getElementById("stage").innerHTML
                //     += `<div style="margin: 20px">SETTING</div>`;
            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");
                // let winMoney1 = data.winMoney1;
                // let winMoney2 = data.winMoney2;
                // let winMoney3 = data.winMoney3;
                // let betMoney1 = data.betMoney1;
                // let betMoney2 = data.betMoney2;
                // let betMoney3 = data.betMoney3;
                // let timeLimit1 = data.timeLimit1;
                // let timeLimit2 = data.timeLimit2;
                // let timeLimit3 = data.timeLimit3;
                screen.removeChild(screen.childNodes[0]);
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
                // const board = data.board;
                // const boardRow = data.board[0].length;          //열
                // const boardCol = data.board.length;            //행
                const timeLimit = data.timeLimit;
                totalWord = data.totalWord;

                screen.removeChild(screen.childNodes[0]);
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
                let finish = data.finish;
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
                const result = data.result;
                level = data.level;
                exp = data.myExp + "/" + data.fullExp;
                myCoin = data.myCoin;
                myHint = data.myHint;
                const correctList = data.correctList;
                const wrongList = data.wrongList;
                screen.removeChild(screen.childNodes[0]);
                if (result == "fail") {
                    let failImg = document.createElement("img");
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
                } else {
                    let successImg = document.createElement("img");
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
                const settingImg = document.createElement("img");
                settingImg.setAttribute("style", "max-width: 100%; height: auto");
                settingImg.src = "https://actions.o2o.kr/devsvr1/image/setting.png";
                screen.appendChild(settingImg);
            },
            RANKING: function (data) {
                console.log("실행 : ranking");
                screen.removeChild(screen.childNodes[0]);
                const rankingImg = document.createElement("img");
                rankingImg.setAttribute("style", "max-width: 100%; height: auto");
                rankingImg.src = "https://actions.o2o.kr/devsvr1/image/ranking.png";
                screen.appendChild(rankingImg);
            },
            SHOP: function (data) {
                console.log("실행 : shop");
                screen.removeChild(screen.childNodes[0]);
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