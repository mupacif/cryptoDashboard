//import { webSocket } from 'rxjs/webSocket';

// #1 Variables
const appDiv = document.getElementById('appStream');
// #2 on setup le  webSocket
const { webSocket } = rxjs.webSocket;
const subject = webSocket('wss://stream.binance.com:9443/ws');

//#2 on envoi le msg au websocket
subject.next({
  method: 'SUBSCRIBE',
  params: ['!miniTicker@arr@3000ms'],
  id: 2,
});

/***
 * fonction qui filtre et affiche les données dans le DOM
 */

function display(arr) {
  if (!arr || !arr.map) return;
  //  close - opening/opening
  const map2 = arr.map((e) => ({
    diff: (+e['c'] - +e['o']) / +e['o'],
    name: e.s,
  }));

  // on sort par evolution
  map2.sort((a, b) => b['diff'] - a['diff']);

  //on récupère le tableau
  const vals = map2.map(
    (e) =>
      `<tr><td><a target='_blank' href=https://www.binance.com/en/trade/${e.name}>${e.name}</a></td><td>${e.diff.toFixed(2)}%</td><td>-</td><td></td><td></td></tr>`
  );

  //on l'affiche
  appDiv.innerHTML = vals.join("");
}

//#3 on récupères les données et on les affiches
subject.subscribe(display);

