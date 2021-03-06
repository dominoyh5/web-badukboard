ws = new WebSocket("ws://cho0h5.iptime.org:5500/ws"); // Todo: 호스트이름 자동 변경으로

ws.onopen = (event) => {
  let data = { event: "enter", id: "" }; // Todo: 식별기능 추가(id)
  ws.send(JSON.stringify(data));
};
ws.onmessage = (event) => {
  const rocks = JSON.parse(event.data);
  console.log(rocks); // 삭제
  drawStonesFunction(rocks);
};

function downStone(x, y, state) {
  // state 0: undo
  // state 1: black rock
  // state 2: white rock

  x = parseInt(x);
  y = parseInt(y);

  // set event (undo or downRock)
  let data = {};
  switch (state) {
    case 0:
      data = { event: "undo" };
      break;
    default:
      data = {
        event: "downRock",
        data: { x: x, y: y, state: state },
      };
      break;
  }

  ws.send(JSON.stringify(data));
}

function removeAllStones() {
  if (confirm("Remove all stones really?") == false) return;

  let data = {
    event: "removeAll",
  };

  ws.send(JSON.stringify(data));
}
