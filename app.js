document.addEventListener("DOMContentLoaded", function () {
	const columns = document.querySelectorAll(".colonne");
	let currentCol = 0;
	let currentPlayer = 1;
	let timeLeft = 15;
	let countdown;
	const timerDisplay = document.querySelector(".chrono-red .l-style"); // Affichage du chrono

	function startTimer() {
		clearInterval(countdown);
		timeLeft = 15;
		timerDisplay.textContent = `${timeLeft}s`;

		countdown = setInterval(() => {
			if (timeLeft <= 0) {
				timeLeft = 15;
				timerDisplay.textContent = `${timeLeft}s`;
				switchPlayer();
			} else {
				timeLeft--;
				timerDisplay.textContent = `${timeLeft}s`;
			}
		}, 1000);
	}

	function switchPlayer() {
		if (currentPlayer === 1) {
			currentPlayer = 2;
		} else {
			currentPlayer = 1;
		}
		startTimer();
	}

	function updateCursor() {
		const colRect = columns[currentCol].getBoundingClientRect();
		const offset = (colRect.width - cursor.offsetWidth) / 2;
		cursor.style.left = `${colRect.left + offset}px`;

		console.log("Colonne:", currentCol);
	}

	updateCursor();

	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowLeft" && currentCol > 0) {
			currentCol--;
			updateCursor();
		}
		if (e.key === "ArrowRight" && currentCol < columns.length - 1) {
			currentCol++;
			updateCursor();
		}
		if (e.key === " ") {
			e.preventDefault();
			const currentColumn = columns[currentCol];
			const buttons = currentColumn.querySelectorAll(".grid");

			for (let i = buttons.length - 1; i >= 0; i--) {
				const img = buttons[i].querySelector("img");
				if (!img.getAttribute("src")) {
					if (currentPlayer === 1) {
						img.src = "/assets/counter-red-large.svg";
					} else {
						img.src = "/assets/counter-yellow-large.svg";
					}

					switchPlayer();
					break;
				}
			}
		}
	});

	startTimer();
});

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

	btnMenu.classList.add("btn-yellow", "m-style");
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

		return;
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

const btnStart = document.getElementById("btn-menu-start");
btnStart.addEventListener("click", () => {
	const ppMenu = document.querySelector(".pp-menu");
	ppMenu.remove();
});

function openPauseMenu() {
	const body = document.body;
	const PpPause = document.createElement("dialog");
	PpPause.classList.add("pp-pause");
	PpPause.style.zIndex = "1000";

	const pauseContainer = document.createElement("div");
	pauseContainer.classList.add("pause");

	const pauseTitle = document.createElement("div");
	pauseTitle.classList.add("title-pause");
	const spanTitle = document.createElement("span");
	spanTitle.classList.add("l-style");
	spanTitle.textContent = "PAUSE";

	const btnPauseMenu = document.createElement("div");
	btnPauseMenu.classList.add("btn-pause");

	const btn1Pause = document.createElement("button");
	btn1Pause.classList.add("btn-white", "m-style");
	btn1Pause.textContent = "CONTINUE GAME";

	const btn2Pause = document.createElement("button");
	btn2Pause.classList.add("btn-white", "m-style");
	btn2Pause.textContent = "RESTART";

	const btn3Pause = document.createElement("button");
	btn3Pause.classList.add("btn-red", "m-style");
	btn3Pause.textContent = "QUIT GAME";
	btn3Pause.setAttribute("id", "btn-pause-quit");

	PpPause.appendChild(pauseContainer);
	pauseContainer.appendChild(pauseTitle);
	pauseTitle.appendChild(spanTitle);
	pauseContainer.appendChild(btnPauseMenu);
	btnPauseMenu.appendChild(btn1Pause);
	btnPauseMenu.appendChild(btn2Pause);
	btnPauseMenu.appendChild(btn3Pause);

	document.body.appendChild(PpPause);

	PpPause.showModal();

	btn3Pause.addEventListener("click", () => {
		const body = document.body;
		const ppMenu2 = document.querySelector(".pp-menu");
		PpPause.remove();
		body.appendChild(openMenu());
	});

	btn1Pause.addEventListener("click", () => {
		PpPause.close();
	});

	btn2Pause.addEventListener("click", () => {
		location.reload();
	});

	const btnRestart = document.querySelector(".btn-nav-restart");

	btnRestart.addEventListener("click", () => {
		location.reload();
	});

	return;
}

const btnMenuNav = document.querySelector("#btn-menu-nav");
btnMenuNav.addEventListener("click", () => {
	openPauseMenu();
});

// const btnQuitGame = document.querySelector("#btn-pause-quit");
// btnQuitGame.addEventListener("click", () => {
// 	body.appendChild(openMenu);
// });

// ticket 23
let scoreJoueur1 = 0;
let scoreJoueur2 = 0;
let joueurActuel = "Joueur 1";

let colonneSelect = null;
let tempsRestant = 15;

const grille = [
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
];

// ticket 24

const grilleAvecGagnant1 = [
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["X", "X", "X", "X", "", "", ""],
];

const grilleAvecGagnant2 = [
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["X", "", "", "", "", "", ""],
	["X", "", "", "", "", "", ""],
	["X", "", "", "", "", "", ""],
	["X", "", "", "", "", "", ""],
];

const grilleAvecGagnant3 = [
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "X", "", "", ""],
	["", "", "X", "", "", "", ""],
	["", "X", "", "", "", "", ""],
	["X", "", "", "", "", "", ""],
];

const grilleAvecGagnant4 = [
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "X", "", "", ""],
	["", "", "X", "O", "", "", ""],
	["", "O", "O", "O", "", "", ""],
	["X", "O", "O", "O", "O", "", ""],
];

const grilleSansGagnant = [
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["", "", "", "X", "", "", ""],
	["", "", "X", "O", "", "", ""],
	["", "O", "O", "O", "", "", ""],
	["X", "O", "O", "X", "O", "", ""],
];

function checkWinner(grille) {
	const rows = 6;
	const columns = 7;
	const board = [];

	const buttons = document.querySelectorAll(".grid-game .grid");
}

let resultat = "";

resultat = checkWinner(grilleAvecGagnant1); // retourne "X"
resultat = checkWinner(grilleAvecGagnant2); // retourne "X"
resultat = checkWinner(grilleAvecGagnant3); // retourne "X"
resultat = checkWinner(grilleAvecGagnant4); // retourne "O"
resultat = checkWinner(grilleSansGagnant); // retourne ""

const btnCol1 = document.getElementById("btngridcol1");
const btnTarget = document.getElementById("btngrid1");

btnCol1.addEventListener("click", () => {
	const img = document.createElement("img");
	img.src = "/assets/counter-yellow-large.svg";
	img.alt = "pion jaune";
	btnTarget.appendChild(img);
});
