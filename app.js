function createRulesDialog() {
	if (document.querySelector(".pp-rules")) return;

	const dialog = document.createElement("dialog");
	dialog.classList.add("pp-rules");
	dialog.open = true;
	dialog.style.zIndex = "1000";

	const rulesContainer = document.createElement("div");
	rulesContainer.classList.add("rules");

	const rulesDiv = document.createElement("div");
	rulesDiv.classList.add("rules-div");

	const titleRules = document.createElement("div");
	titleRules.classList.add("title-rules");
	const titleSpan = document.createElement("span");
	titleSpan.classList.add("l-style");
	titleSpan.textContent = "RULES";
	titleRules.appendChild(titleSpan);

	const txtRules = document.createElement("div");
	txtRules.classList.add("txt-rules");

	const objectiveSpan = document.createElement("span");
	objectiveSpan.classList.add("s-style", "purple-span");
	objectiveSpan.textContent = "OBJECTIVE";
	txtRules.appendChild(objectiveSpan);

	const objectiveP = document.createElement("p");
	objectiveP.textContent =
		"Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).";
	txtRules.appendChild(objectiveP);

	const howToPlaySpan = document.createElement("span");
	howToPlaySpan.classList.add("s-style", "purple-span");
	howToPlaySpan.textContent = "HOW TO PLAY";
	txtRules.appendChild(howToPlaySpan);

	const rulesList = document.createElement("ol");
	const rulesTexts = [
		"Red goes first in the first game.",
		"Players must alternate turns, and only one disc can be dropped in each turn.",
		"The game ends when there is a 4-in-a-row or a stalemate.",
		"The starter of the previous game goes second on the next game.",
	];

	rulesTexts.forEach((text) => {
		const li = document.createElement("li");
		li.textContent = text;
		rulesList.appendChild(li);
	});

	txtRules.appendChild(rulesList);

	const closeButton = document.createElement("img");
	closeButton.classList.add("btn-check-rules");
	closeButton.src = "/assets/icon-check.svg";
	closeButton.alt = "Check Rules";
	closeButton.style.cursor = "pointer";
	closeButton.addEventListener("click", () => {
		dialog.close();
		document.body.removeChild(dialog);
	});

	rulesDiv.appendChild(titleRules);
	rulesDiv.appendChild(txtRules);
	rulesDiv.appendChild(closeButton);
	rulesContainer.appendChild(rulesDiv);
	dialog.appendChild(rulesContainer);
	document.body.appendChild(dialog);
}

document.addEventListener("click", () => {
	const btnGameRules = document.getElementById("btn-menu-rules");
	if (btnGameRules) {
		btnGameRules.addEventListener("click", createRulesDialog);
	}
});

function openMenu() {
	const body = document.body;
	const PpMenu = document.createElement("dialog");
	PpMenu.classList.add("pp-menu");
	PpMenu.open = true;
	PpMenu.style.zIndex = "1000";

	const menuContainer = document.createElement("div");
	menuContainer.classList.add("menu");

	const imgMenu = document.createElement("img");
	imgMenu.classList.add("logo-menu");
	imgMenu.src = "./assets/logo.svg";
	imgMenu.alt = "logo menu";
	imgMenu.style.cursor = "pointer";

	const menuBtn = document.createElement("div");
	menuBtn.classList.add("btn-menu");

	const btnMenu = document.createElement("button");
	btnMenu.setAttribute("id", "btn-menu-start");
	//
	//
	// le btn ne marche qu'une fois, il ne peut pas être refermé une deuxieme fois bug à regler, les deux popup de menu n'ont pas le même nom !
	//
	//
	btnMenu.classList.add("btn-yellow", "m-style");
	// btnMenu.id("btn-menu-start")
	btnMenu.textContent = "PLAY VS PLAYER";
	btnMenu.addEventListener("click", () => {
		PpMenu.remove();
	});

	const imgBtnMenu = document.createElement("img");
	imgBtnMenu.src = "./assets/player-vs-player.svg";
	imgBtnMenu.alt = "player-vs-player";
	imgBtnMenu.style.cursor = "pointer";

	const btnMenu2 = document.createElement("button");
	btnMenu2.setAttribute("id", "btn-menu-rules");
	btnMenu2.classList.add("btn-white-menu", "m-style");
	btnMenu2.textContent = "GAME RULES";
	document.addEventListener("click", () => {
		if (btnMenu2) {
			btnMenu2.addEventListener("click", createRulesDialog);
		}
	});

	menuContainer.appendChild(imgMenu);
	menuContainer.appendChild(imgBtnMenu);
	menuContainer.appendChild(menuBtn);
	menuBtn.appendChild(btnMenu);
	btnMenu.appendChild(imgBtnMenu);
	menuBtn.appendChild(btnMenu2);
	PpMenu.appendChild(menuContainer);
	body.appendChild(PpMenu);
}

const btnMenuNav = document.querySelector("#btn-menu-nav");
btnMenuNav.addEventListener("click", () => {
	openMenu();
});

const btnStart = document.getElementById("btn-menu-start");
btnStart.addEventListener("click", () => {
	const ppMenu = document.querySelector(".pp-menu");
	ppMenu.remove();
});
