import test from 'ava';

const myPeer = require('.');

test(async (t) => {
  const bar = Promise.resolve('bar');

  const peer = new Promise((resolve, reject) => {
    let p = myPeer(); //add options here
    p.on('open', () => resolve(p));
  });

  await peer;

  t.is(peer.open, true);
});
