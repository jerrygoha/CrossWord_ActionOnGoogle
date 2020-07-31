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
 * This class is used as a wrapper for Google Assistant Canvas Action class
 * along with its callbacks.
 */
class Action {
    /**
     * @param {*} scene which serves as a container of all visual elements
     */
    constructor(scene) {
        let level;
        let exp;
        let myHint;
        let myCoin;

        let winMoney1;
        let winMoney2;
        let winMoney3;
        let betMoney1;
        let betMoney2;
        let betMoney3;
        let timeLimit1;
        let timeLimit2;
        let timeLimit3;

        let timeLimit;

        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");
                hideall();
                document.getElementById("welcome").style.display = "block";
                document.getElementById("welcome").innerHTML = `<BR><BR><BR><BR><BR><BR><button> START </button>`;
            },
            MAIN: function (data) {
                console.log("실행 : main");
                hideall();
                document.getElementById("main").style.display = "block";
                level = data.level;
                exp = data.myExp + "/" + data.fullExp;
                myHint = data.myHint;
                myCoin = data.myCoin;
                document.getElementById("main").innerHTML
                    = `<BR><BR><BR><BR><BR><BR>
                        <div style="margin:20px">
                            <span style="margin:20px">
                                <div style="margin:20px">Lv.${level}</div>
                                <div style="margin:20px">${exp}</div>
                            </span>
                            <span style="margin: 20px">
                                <button>HINT</button> ${myHint}
                            </span>
                            <span style="margin:20px">
                                <button>COIN</button> ${myCoin}
                            </span>
                        </div>
                        <div style="margin:20px">
                            <span style="margin:20px">
                                <button>KEEP GOING</button>
                            </span>
                            <span style="margin:20px">
                                <button>SELECT STAGE</button>
                            </span>
                        </div>
                        <div style="margin: 20px">
                            <button>SETTING</button>
                        </div>`;
            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");
                hideall();
                document.getElementById("stage").style.display = "block";
                var stagenum = 1;
                document.getElementById("stage").style.display = "block";
                document.getElementById("stage").innerHTML
                    = `<BR><BR><BR><BR><BR><BR>
                        <div>
                            <span style="margin:20px">
                                <div style="margin:20px">Lv.${level}</div>
                                <div style="margin:20px">${exp}</div>
                            </span>
                            <span style="margin: 20px">
                                <button>HINT</button>${myHint}
                            </span>
                            <span style="margin: 20px">
                                <button>COIN</button>${myCoin}
                            </span>
                        </div>`;
                document.getElementById("stage").innerHTML
                    += `<div style="margin: 20px">
                            <span style="margin: 20px">
                                <button>RETURN</button>
                            </span>
                            <span style="margin: 20px">
                                <table><tr><th><button disabled = "boolean">STAGE ${stagenum}</button></th><th><button disabled = "boolean">stage ${stagenum}</button></th><th><button>stage 3</button></th><th><button disabled = "boolean">stage 4</button></th><th>stage 5</th></tr><tr><th>stage 6</th><th>stage 7</th><th>stage 8</th><th>stage 9</th><th>stage 10</th></tr></table>
                            </span>
                        </div>
                        <div style="margin: 20px"><button>SETTING</button></div>`;
            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");
                hideall();
                document.getElementById("difficulty").style.display = "block";
                winMoney1 = data.winMoney1;
                winMoney2 = data.winMoney2;
                winMoney3 = data.winMoney3;
                betMoney1 = data.betMoney1;
                betMoney2 = data.betMoney2;
                betMoney3 = data.betMoney3;
                timeLimit1 = data.timeLimit1;
                timeLimit2 = data.timeLimit2;
                timeLimit3 = data.timeLimit3;
                document.getElementById("difficulty").innerHTML
                    = `<BR><BR><BR><BR><BR><BR>
                       <div style="margin:20px">
                        <span style="margin: 20px">
                            <div style="margin: 20px">Lv.${level}</div>
                            <div style="margin: 20px">${exp}</div>
                        </span>
                        <span style="margin: 20px"><button>HINT </button>${myHint}</span>
                        <span style="margin: 20px"><button>COIN </button>${myCoin}</span>
                       </div>
                       <div style="margin: 20px">
                        <span style="margin: 20px"><button>return</button></span>
                        <span  style="border : 1px; margin: 20px">
                            <button>Easy<br>● winMoney : ${winMoney1}<br>● betMoney : ${betMoney1}<br>● timeLimit : ${timeLimit1}</button>
                        </span>
                        <span style="border: 1px; margin: 20px">
                            <button>Medium<br>● winMoney : ${winMoney2}<br>● betMoney : ${betMoney2}<br>● timeLimit : ${timeLimit2}</button>
                        </span>
                        <span style="border: 1px; margin: 20px">
                            <button>Hard<br>● winMoney : ${winMoney3}<br>● betMoney : ${betMoney3}<br>● timeLimit : ${timeLimit3}</button>
                         </span>
                        </div>
                        <div style="margin: 20px"><button>SETTING</button></div>`;
            },
            INGAME: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
                let board = data.board;
                timeLimit = data.timeLimit;
                let totalWord = data.totalWord;
                document.getElementById("inGame").innerHTML
                    = `<BR><BR><BR><BR><BR><BR>
                        <span style="margin: 20px">
                            <div style="margin:20px">hint</div>
                            <div style="margin: 20px">${totalWord}</div>
                        </span>
                        <span style="margin: 20px">${board}</span>
                        <span>${timeLimit}</span>
                        <span style="margin: 20px">
                            <div style="margin: 20px">${myHint}</div>
                            <div style="margin: 20px"><button>SETTING</button></div>
                        </span>`;

                setTimeout(function () {
                    window.canvas.sendTextQuery('get result');
                }, timeLimit * 1000);
            },
            CORRECT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
            },
            WRONG: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
            },
            OPENHINT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
            },
            CLOSEHINT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("inGame").style.display = "block";
            },
            RESULT: function (data) {
                console.log("실행 : result");
                hideall();
                document.getElementById("result").style.display = "block";
                let result = data.result;
                let correctList = data.correctList;
                let wrongList = data.wrongList;
                document.getElementById("result").innerHTML
                    = `<BR><BR><BR><BR><BR><BR>
                       <div style="margin: 20px">
                        <span style="margin: 20px">
                            <button>RETURN</button>
                        </span>
                        <span style="margin: 20px">
                            <div style="margin: 20px">{$result}</div>
                            <div style="margin: 20px">${level} ${exp}++</div>
                            <div style="margin: 20px">CORRECT : ${correctList}, WRONG : ${wrongList}</div>
                        </span>
                        <span style="margin\: 20px">
                            <button>KEEP OR RETRY</button>
                        </span>
                       </div>
                        <span style="margin: 20px">
                            <button>SETTING</button>
                        </span>
                       </div>`;
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