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
	}
}
