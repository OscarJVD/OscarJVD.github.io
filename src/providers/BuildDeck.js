import shuffle from 'lodash.shuffle';
import FontAwClass from './fontAwesomeClasses';
// import RickAndM from './rickAndM';
import axios from 'axios';

async function getRick() {

  let rick = null;

  await axios.get('https://rickandmortyapi.com/api/character/')

    .then(res => {
      // console.log(res);
      rick = res.data.results;

      // console.log(rick);
    })
    .catch(e => console.log(e))

  // console.log(rick);

  return rick;
}

 export default () => {
  const cardNum = 20;

  // let arrMorty = [];

  // getRick().then(res => {
  //   console.log(res);

  //   for (let i = 0; i < res.length; i++) arrMorty.push(res[i].image)

  //   // console.log(arrMorty.length);
  //   // console.log(arrMorty);

  //   let cards = [];

  //   while (cards.length < cardNum) {

  //     const i = Math.floor(Math.random() * arrMorty.length);
  //     const card = {
  //       icon: arrMorty.splice(i, 1)[0],
  //       wasGuessed: false
  //     };

  //     cards.push(card);
  //     cards.push({ ...card });
  //   }

  //   console.log(shuffle(cards));

  //   return shuffle(cards);
  // });

  const fontAwClass = FontAwClass();
  console.log(fontAwClass);

  let cards = [];

  while (cards.length < cardNum) {

    const i = Math.floor(Math.random() * fontAwClass.length);
    const card = {
      icon: fontAwClass.splice(i, 1),
      wasGuessed: false
    };

    cards.push(card);
    cards.push({ ...card });
  }
  return shuffle(cards);
};
