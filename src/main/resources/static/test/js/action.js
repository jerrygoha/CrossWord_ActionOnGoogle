/**
 * 해당 Class의 div 전부 숨기기
 */

function hideall() {
    let elements = document.getElementsByClassName("testclass");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

function stageLocked(level) {
    let i;
    let a;
    let element = document.getElementById("stage");
    for (i = 0; i <= 9; i++) {
        if (level <= i) {
            element.innerHTML += `<div style="margin: 20px"><button disabled>STAGE ${i + 1}</button></div>`
        } else {
            element.innerHTML += `<div style="margin: 20px"><button>STAGE ${i + 1}</button></div>`
        }
    }
    return a;
}

function timer(time) {
    let element = document.getElementById("timer");
    let x = setInterval(function () {
        element.innerHTML = time + " seconds";
        time--;
        if (time < 0) {
            clearInterval(x);
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
        //공통화면을 위해 전역변수로 선언
        let level;
        let exp;
        let myHint;
        let myCoin;
        //correct command가 왔을 때 변화를 위해 전역변수 선언
        let totalWord;

        let hint;

        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");
                hideall();
                document.getElementById("welcome").style.display = "block";
                document.getElementById("welcome").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/welcome.png">`;
            },
            MAIN: function (data) {
                console.log("실행 : main");
                hideall();
                document.getElementById("main").style.display = "block";
                level = data.level;
                exp = data.myExp + "/" + data.fullExp;
                myHint = data.myHint;
                myCoin = data.myCoin;
                document.getElementById("main").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/main.png">`;
                document.getElementById("main").innerHTML
                    += `<BR><BR><BR><BR><BR><BR>
                        <div style="margin:20px">
                            <span style="margin:20px">
                                <div style="margin:20px">Lv.${level}</div>
                                <div style="margin:20px">${exp}</div>
                            </span>
                            <span style="margin: 20px">
                                HINT ${myHint}
                            </span>
                            <span style="margin:20px">
                                COIN ${myCoin}
                            </span>
                        </div>
                        <div style="margin:20px">
                            <span style="margin:20px">
                                KEEP GOING
                            </span>
                            <span style="margin:20px">
                                SELECT STAGE
                            </span>
                        </div>
                        <div style="margin: 20px">
                            SETTING
                        </div>`;
            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");
                hideall();
                document.getElementById("stage").style.display = "block";
                var stagenum = 1;
                document.getElementById("stage").style.display = "block";
                document.getElementById("stage").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/selectstage.png">`;
                document.getElementById("stage").innerHTML
                    += `<BR><BR><BR><BR><BR><BR>
                        <div>
                            <span style="margin:20px">
                                <div style="margin:20px">Lv.${level}</div>
                                <div style="margin:20px">${exp}</div>
                            </span>
                            <span style="margin: 20px">
                                HINT ${myHint}
                            </span>
                            <span style="margin: 20px">
                                COIN ${myCoin}
                            </span>
                        </div>`;
                stageLocked(level);
                document.getElementById("stage").innerHTML
                    += `<div style="margin: 20px">SETTING</div>`;
            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");
                hideall();
                document.getElementById("difficulty").style.display = "block";
                let winMoney1 = data.winMoney1;
                let winMoney2 = data.winMoney2;
                let winMoney3 = data.winMoney3;
                let betMoney1 = data.betMoney1;
                let betMoney2 = data.betMoney2;
                let betMoney3 = data.betMoney3;
                let timeLimit1 = data.timeLimit1;
                let timeLimit2 = data.timeLimit2;
                let timeLimit3 = data.timeLimit3;
                document.getElementById("difficulty").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/selectdifficult.png">`;
                document.getElementById("difficulty").innerHTML
                    += `<BR><BR><BR><BR><BR><BR>
                       <div style="margin:20px">
                        <span style="margin: 20px">
                            <div style="margin: 20px">Lv.${level}</div>
                            <div style="margin: 20px">${exp}</div>
                        </span>
                        <span style="margin: 20px">HINT ${myHint}</span>
                        <span style="margin: 20px">COIN ${myCoin}</span>
                       </div>
                       <div style="margin: 20px">
                        <span style="margin: 20px">BACK</span>
                        <span  style="border: 5px; margin: 20px">
                            <button>Easy<br>● winMoney : ${winMoney1}<br>● betMoney : ${betMoney1}<br>● timeLimit : ${timeLimit1}</button>
                        </span>
                        <span style="border: 5px; margin: 20px">
                            <button>edium<br>● winMoney : ${winMoney2}<br>● betMoney : ${betMoney2}<br>● timeLimit : ${timeLimit2}</button>
                        </span>
                        <span style="border: 5px; margin: 20px">
                            <button>Hard<br>● winMoney : ${winMoney3}<br>● betMoney : ${betMoney3}<br>● timeLimit : ${timeLimit3}</button>
                         </span>
                        </div>
                        <div style="margin: 20px">SETTING</div>`;
            },
            INGAME: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
                let board = data.board;
                let boardRow = data.board[0].length;          //열
                let boardCol = data.board.length;            //행
                let timeLimit = data.timeLimit;
                totalWord = data.totalWord;
                document.getElementById("inGame").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/ingame.png">`;
                document.getElementById("inGame").innerHTML
                    += `<BR><BR><BR><BR><BR><BR>
            <span style="margin: 20px">
                <div id="hint" style="margin:20px">HINT ${myHint}</div>
                <div id="totalWord" style="margin: 20px">You have to find ${totalWord} words</div>
            </span>`;
                for (let col = 0; col < boardCol; col++) {
                    for (let row = 0; row < boardRow; row++) {
                        document.getElementById("inGame").innerHTML += ` 
                           <span style="margin: 20px; border: 1px">${board[col][row]}</span>
                        `;
                    }
                    document.getElementById("inGame").innerHTML += ` 
                           <br>
                        `;
                }
                document.getElementById("inGame").innerHTML
                    += `<span style="margin: 20px">
                <div style="margin: 20px">SETTING</div>
            </span>
            <span id="timer" style="margin: 20px"></span>
            <span id="correctOrWrong" style="margin: 20px"></span>`;
                timer(timeLimit);
                setTimeout(function () {
                    window.canvas.sendTextQuery('get result');
                }, timeLimit * 1000);
            },
            CORRECT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
                let finish = data.finish;
                totalWord--;
                document.getElementById("correctOrWrong").innerHTML
                    = `<span style="margin: 10px">CORRECT</span>`;
                document.getElementById("totalWord").innerHTML
                    = "You have to find " + totalWord + " words";
                if (finish)
                    window.canvas.sendTextQuery('get result');
            },
            WRONG: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
                document.getElementById("correctOrWrong").innerHTML
                    = `<span style="margin: 10px">WRONG</span>
            `;
            },
            OPENHINT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
                myHint--;
                document.getElementById("hint").innerHTML = "HINT " + myHint;
                hint = data.hint;
                document.getElementById("inGame").innerHTML
                    += `<span id="openHint" style="margin: 10px">${hint}</span>`;
            },
            CLOSEHINT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
                document.getElementById("openHint").style.display = "none";
                document.getElementById("inGame").innerHTML
                    += `<span style="margin: 10px">${hint}</span>`;
            },
            RESULT: function (data) {
                console.log("실행 : result");
                hideall();
                document.getElementById("result").style.display = "block";
                let result = data.result;
                level = data.level;
                exp = data.myExp + "/" + data.fullExp;
                myCoin = data.myCoin;
                myHint = data.myHint;
                let correctList = data.correctList;
                let wrongList = data.wrongList;
                if(result == "fail"){
                    document.getElementById("result").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/result_fail.png">`;
                    document.getElementById("result").innerHTML
                        += `<BR><BR><BR><BR><BR><BR>
                        <div style="margin:20px">
                        <span style="margin: 20px">
                            <div style="margin: 20px">Lv.${level}</div>
                            <div style="margin: 20px">${exp}</div>
                        </span>
                        <span style="margin: 20px">HINT ${myHint}</span>
                        <span style="margin: 20px">COIN ${myCoin}</span>
                       </div>
                       <div style="margin: 20px">
                        <span style="margin: 20px">BACK</span>
                        <span style="margin: 20px">
                            <div style="margin: 20px">${result}</div>
                            <div style="margin: 20px">Lv.${level} ${exp}++</div>
                            <div style="margin: 20px">MATCHED : ${correctList}, UNMATCHED : ${wrongList}</div>
                        </span>
                        <span style="margin\: 20px">KEEP OR RETRY</span>
                       </div>
                        <span style="margin: 20px">SETTING</span>
                       </div>`;
                }else{
                    document.getElementById("result").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/result_success.png">`
                    document.getElementById("result").innerHTML
                        += `<BR><BR><BR><BR><BR><BR>
                        <div style="margin:20px">
                        <span style="margin: 20px">
                            <div style="margin: 20px">Lv.${level}</div>
                            <div style="margin: 20px">${exp}</div>
                        </span>
                        <span style="margin: 20px">HINT ${myHint}</span>
                        <span style="margin: 20px">COIN ${myCoin}</span>
                       </div>
                       <div style="margin: 20px">
                        <span style="margin: 20px">BACK</span>
                        <span style="margin: 20px">
                            <div style="margin: 20px">${result}</div>
                            <div style="margin: 20px">Lv.${level} ${exp}++</div>
                            <div style="margin: 20px">MATCHED : ${correctList}, UNMATCHED : ${wrongList}</div>
                        </span>
                        <span style="margin\: 20px">KEEP OR RETRY</span>
                       </div>
                        <span style="margin: 20px">SETTING</span>
                       </div>`;
                }

            },
            SETTING: function (data) {
                console.log("실행 : setting");
                hideall();
                document.getElementById("setting").style.display = "block";
                document.getElementById("setting").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/setting.png">`;
                document.getElementById("setting").innerHTML +="image.jpg";
            },
            RANKING: function (data) {
                console.log("실행 : ranking");
                hideall();
                document.getElementById("ranking").style.display = "block";
                document.getElementById("ranking").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/ranking.png">`;
                document.getElementById("ranking").innerHTML +="image.jpg";
            },
            SHOP: function (data) {
                console.log("실행 : shop");
                hideall();
                document.getElementById("shop").style.display = "block";
                document.getElementById("shop").innerHTML = `<img style="max-width:100%; height:auto;" src="https://actions.o2o.kr/devsvr5/image/store.png">`;
                document.getElementById("shop").innerHTML +="image.jpg";
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