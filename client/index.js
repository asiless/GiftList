const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const index = Math.floor(Math.random()*2*(niceList.length - 1));
  let name = 'yo';
  if (index < niceList.length)
    name = niceList[index];

  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof
  });

  console.log({name, proof, gift });
}

main();