let player1Name = "Jugador 1";
let player2Name = "Jugador 2";
let score1 = 0;
let score2 = 0;
let servingPlayer = 0;

function updateScore(player, points) {
  if (servingPlayer === 0) {
    servingPlayer = player;
    updateServeIndicators();
  } else {
    if (player === 1) {
      score1 += points;
      document.getElementById("score1").textContent = score1;
    } else {
      score2 += points;
      document.getElementById("score2").textContent = score2;
    }

    if (checkGameEnd()) {
      return;
    }

    if (score1 === 20 && score2 === 20) {
      handleDeuce();
    } else {
      if ((score1 + score2) % 5 === 0 && points === 1) {
        servingPlayer = (servingPlayer === 1) ? 2 : 1;
        updateServeIndicators();
      }
    }
  }
}

function handleDeuce() {
  if (score1 >= 22 || score2 >= 22) {
    handleGameEnd((score1 > score2) ? 1 : 2);
    return;
  }
}

function checkGameEnd() {
  if ((score1 >= 21 || score2 >= 21) && Math.abs(score1 - score2) >= 2) {
    handleGameEnd((score1 > score2) ? 1 : 2);
    return true;
  }
  return false;
}

function handleGameEnd(winningPlayer) {
  alert(`¡${(winningPlayer === 1) ? player1Name : player2Name} ha ganado el juego!`);
  resetGame();
}

function updateServeIndicators() {
  document.getElementById("serveIndicator1").textContent = "";
  document.getElementById("serveIndicator2").textContent = "";

  if (servingPlayer !== 0) {
    document.getElementById(`serveIndicator${servingPlayer}`).textContent = "SAQUE";
  }

  document.getElementById("player1").classList.remove("serving");
  document.getElementById("player2").classList.remove("serving");
  if (servingPlayer !== 0) {
    document.getElementById(`player${servingPlayer}`).classList.add("serving");
  }
}

function resetGame() {
  score1 = 0;
  score2 = 0;
  servingPlayer = 0;
  updateServeIndicators();

  document.getElementById("score1").textContent = "0";
  document.getElementById("score2").textContent = "0";
}

function editPlayerName(player) {
  const playerName = (player === 1) ? player1Name : player2Name;
  const newName = prompt(`Ingrese el nombre del Jugador ${player}:`, playerName);

  if (newName !== null) {
    if (player === 1) {
      player1Name = newName;
      document.getElementById("player1Name").textContent = newName;
    } else {
      player2Name = newName;
      document.getElementById("player2Name").textContent = newName;
    }
  }
}

updateServeIndicators();
