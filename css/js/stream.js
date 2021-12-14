//import { webSocket } from 'rxjs/webSocket';

const { webSocket } = rxjs.webSocket;
// #1 on setup le  webSocket
const subject = webSocket('wss://stream.binance.com:9443/ws');

//#2 on envoi le msg au websocket
subject.next({
  method: 'SUBSCRIBE',
  params: ['!miniTicker@arr@3000ms'],
  id: 2,
});

const appDiv = document.getElementById('appStream');

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
      `<a target='_blank' href=https://www.binance.com/en/trade/${e.name}>${e.name}</a> : ${e.diff}%`
  );

  //on l'affiche
  appDiv.innerHTML = vals.join('<br>');
}

//#3 on récupère les donénes et on les affiche
subject.subscribe(display);

