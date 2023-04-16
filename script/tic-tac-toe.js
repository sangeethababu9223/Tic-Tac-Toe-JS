let icons = ["O", "X"];
let relatedPieces = {
  1: [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
  ],
  2: [
    [1, 2, 3],
    [2, 5, 8],
  ],
  3: [
    [1, 2, 3],
    [3, 6, 9],
    [3, 5, 7],
  ],
  4: [
    [1, 4, 7],
    [4, 5, 6],
  ],
  5: [
    [4, 5, 6],
    [2, 5, 8],
    [1, 5, 9],
    [3, 5, 7],
  ],
  6: [
    [3, 6, 9],
    [4, 5, 6],
  ],
  7: [
    [3, 5, 7],
    [7, 8, 9],
    [1, 4, 7],
  ],
  8: [
    [2, 5, 8],
    [7, 8, 9],
  ],
  9: [
    [1, 5, 9],
    [3, 6, 9],
    [7, 8, 9],
  ],
};
let key = 0;
let activePieces = 0;
let container = document.querySelector("[data-tic-tac-toe]");
container.addEventListener("click", gameMoves);

function gameMoves() {
  let clickedPiece = event.target;
  let activecol;
  if (!clickedPiece.classList.contains("writtern")) {
    clickedPiece.classList.add("writtern");
    clickedPiece.innerHTML = icons[key];
    key = key === 0 ? 1 : 0;
    activePieces++;
    if (activePieces >= 3) {
      activecol = gameSuccessCheck(clickedPiece);
    } else if (activePieces >= 9) {
      container.classList.add("disable");
      alert("Game over");
    }
  } else {
    alert("Already updated");
  }
  if (activecol) {
    strikeThrough(activecol);
  }
}

function gameSuccessCheck(item) {
  let val = item.innerHTML;
  let key = item.dataset.pieceId;
  let checkColumns = relatedPieces[key];
  let flag = true;
  outer: for (i = 0; i < checkColumns.length; i++) {
    let columns = checkColumns[i];
    inner: for (j = 0; j < columns.length; j++) {
      let item = document.querySelector(`[data-piece-id='${columns[j]}']`);
      let curval = item.innerHTML;
      if (val != curval) {
        flag = false;
        break inner;
      }
      flag = true;
    }
    if (flag) {
      return {
        key,
        index: i,
      };
    }
  }
}
function strikeThrough(col) {
  let res = relatedPieces[col.key][col.index];
  res.forEach((element) => {
    let el = document.querySelector(`[data-piece-id='${element}']`);
    el.classList.add("strike");
  });
  container.classList.add("disable");
  alert("Game success");
}
