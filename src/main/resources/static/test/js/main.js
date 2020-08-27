/* eslint-disable no-invalid-this */

window.onload = () => {
	this.scene = new Scene();
	this.scene.action = new Action(scene);
	this.scene.action.setCallbacks();
	this.canvas = window.interactiveCanvas;

	//AoG 위쪽 상단바 크기 구하기
	const headerheight = async () => {
		return await this.canvas.getHeaderHeightPx();
	};
	console.log(`상단바 크기 : ${headerheight()}`);
};

class Scene {
	constructor() {
		// 화면 크기를 콘솔에 출력
		const view = document.getElementById("screen");
		this.radio = window.devicePixelRatio;
		console.log("width : " + view.clientWidth + ", height : " + view.clientHeight);

		const welcomeBox = document.createElement("div");
		welcomeBox.setAttribute("id", "welcomeBox");
		view.appendChild(welcomeBox);

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
		view.appendChild(copyright);

		const o2ologo = document.createElement("span");
		o2ologo.setAttribute("id", "o2ologo");
		o2ologo.textContent = "O2OCI";
		view.appendChild(o2ologo);
	}
}
