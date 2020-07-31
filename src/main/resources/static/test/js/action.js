
function hideall() {
    let elements = document.getElementsByClassName("testclass");

    for(let i = 0; i < elements.length; i++){
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
        var common = "<BR><BR><BR><BR><BR><BR><div><span>level 2</span><span>hint</span><span>coin</span></div><div>exp</div>";
        var setting = "<div>설정</div>";
        this.canvas = window.interactiveCanvas;
        this.scene = scene;
        this.commands = {
            WELCOME: function (data) {
                console.log("실행 : welcome");
                hideall();
                document.getElementById("welcome").style.display = "block";
                document.getElementById("welcome").innerHTML = `<BR><BR><BR><BR><BR><BR><button> START </button>`;

                // document.getElementById("welcome").innerHTML =
                //     `<BR><BR><BR><BR><BR>데이터는 이렇게 JSON 형태로 옵니다.<BR>${JSON.stringify(data)}`;
            },
            MOVETOMAIN: function (data) {
                console.log("실행 : main");
                hideall();
                document.getElementById("main").style.display = "block";
                document.getElementById("main").innerHTML = `<BR><BR><BR><BR><BR><BR><div><span>${JSON.stringify(data)}</span></div><div><span>keep going</span><span>select stage</span></div><div>설정</div>`;
                // document.getElementById("menuplate").innerHTML = `<BR><BR><BR><BR><BR>Java Object에 담을 수 있다면 모두 보낼 수 있을 겁니다... 아마도?<BR>아래는 배열의 예제입니다. JS에서 바로 쓸 수 있어요.<BR><BR>${data.menuplate[0]}<BR>${data.menuplate[1]}<BR>${data.menuplate[2]}`;
            },
            STAGESELECT: function (data) {
                console.log("실행 : stage");
                hideall();
                document.getElementById("stage").style.display = "block";
                document.getElementById("stage").innerHTML = `<BR><BR><BR><BR><BR><BR><div><span>level 2</span><span>hint</span><span>coin</span></div><div>exp</div><div><span>return</span><span>stage 1</span><span>stage 2</span><span>locked</span><span>locked</span><span>locked</span></div><div>설정</div>`
                // document.getElementById("stage").innerHTML = `<BR><BR><BR><BR><BR><BR>${JSON.stringify(data)}`;
                // if (data.menu === "짜장면") {
                //     document.getElementById("stage").innerHTML += `<img src="https://dimg.donga.com/ugc/CDB/SHINDONGA/Article/5c/33/f3/15/5c33f3152603d2738de6.jpg">`;
                // } else if (data.menu === "짬뽕") {
                //     document.getElementById("stage").innerHTML += `<img src="https://t3.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/GvS/image/t948j6MlNec-e4hxlSD9E34ouC0.png">`;
                // } else if (data.menu === "탕수육") {
                //     document.getElementById("stage").innerHTML += `<img src="https://t1.daumcdn.net/cfile/blog/99667B395D0390AB2F">`;
                // }
            },
            DIFFICULTYSELECT: function (data) {
                console.log("실행 : difficulty");
                hideall();
                document.getElementById("difficulty").style.display = "block";
                document.getElementById("difficulty").innerHTML = `<BR><BR><BR><BR><BR><BR><div><span>level 2</span><span>hint</span><span>coin</span></div><div>exp</div><div><span>return</span><span>Easy</span><span>Medium</span><span>Hard</span></div><div>설정</div>`;
            },
            INGAME: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("ingame").style.display = "block";
            },
            CORRECT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("ingame").style.display = "block";
            },
            WRONG: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("ingame").style.display = "block";
            },
            OPENHINT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("ingame").style.display = "block";
            },
            CLOSEHINT: function (data) {
                console.log("실행 : inGame");
                hideall();
                document.getElementById("ingame").style.display = "block";
            },
            RESULT: function (data) {
                console.log("실행 : result");
                hideall();
                document.getElementById("result").style.display = "block";
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
                }
                catch ( e ) {
                    // AoG 입력값을 매칭하지 못했을 경우
                    console.log( "error : " + e );
                }
            },
        };
        // called by the Interactive Canvas web app once web app has loaded to
        // register callbacks
        this.canvas.ready(callbacks);
        console.log("setCallbacks READY");
    }
}