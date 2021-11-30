import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TicTacToe';
  gameActive = true;
  currentPlayer = "O";
  STATUS_DISPLAY = '';
  GAME_STATE = ["", "", "", "", "", "", "", "", ""];
  WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  CURRENT_PLAYER_TURN = () => `Turno del jugador ${this.currentPlayer}`;
  WIN_MESSAGE = () => `El jugador ${this.currentPlayer} a ganado!`;
  DRAW_MESSAGE = () => `El juego ha terminado en empate!`;



  ngOnInit() {
    this.setMessage(this.CURRENT_PLAYER_TURN());
  }

  setMessage(message: string) {
    this.STATUS_DISPLAY = message
  }
  
  restartGame() {
    this.gameActive = true
    this.currentPlayer = "X"
    this.restartGameState()
    this.setMessage(this.CURRENT_PLAYER_TURN())
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "")
  }
  
  playInCell(index: number): boolean | void {
    if (this.GAME_STATE[index] !== '' || !this.gameActive) {
      return false;
    }

    this.GAME_STATE[index] = this.currentPlayer;
    this.validateWinner();
  }
  
  validateWinner() {
    let roundWon = false
    for (let i = 0; i < this.WINNINGS.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
      const winCondition = this.WINNINGS[i] // Guarda la combinación por ejemplo: [0, 1, 2]
      let position1 = this.GAME_STATE[winCondition[0]],
        position2 = this.GAME_STATE[winCondition[1]],
        position3 = this.GAME_STATE[winCondition[2]] // Almacena el valor del estado actual del juego según las posiciones de winCondition
  
      if (position1 === '' || position2 === '' || position3 === '') {
        continue; // Si hay algún valor vacio nadie ha ganado aún
      }
      if (position1 === position2 && position2 === position3) {
        roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
        break
      }
    }
  
    if (roundWon) {
      this.setMessage(this.WIN_MESSAGE())
      this.gameActive = false
      return
    }
  
    let isDraw = !this.GAME_STATE.includes("");
    if (isDraw) {
      this.setMessage(this.DRAW_MESSAGE());
      this.gameActive = false;
      return
    }
  
    this.nextPlayer();
  }
  
  nextPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.setMessage(this.CURRENT_PLAYER_TURN());
  }
  
  restartGameState() {
    let i = this.GAME_STATE.length;
    while (i--) {
      this.GAME_STATE[i] = '';
    }
  }

}
