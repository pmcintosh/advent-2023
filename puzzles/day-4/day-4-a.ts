import { readData } from '../../shared.ts';
import chalk from 'chalk';

interface ScratchCard {
  cardInfo: string;
  winningNumbers: number[];
  ourNumbers: number[];
  points: number;
}

function parseScratchCard(data: string): ScratchCard {
  let cardInfo = data.split(': ')[0];
  data = data.replace(cardInfo + ': ', '');
  let numStrings = data.split('|');
  let winningNumbers = numStrings[0].match(/\d+/g).map(Number);
  let ourNumbers = numStrings[1].match(/\d+/g).map(Number);

  const scratchCard = {
    cardInfo: cardInfo,
    winningNumbers: winningNumbers.sort((a, b) => a - b),
    ourNumbers: ourNumbers.sort((a, b) => a - b),
    points: 0,
  } as ScratchCard;

  return scratchCard;
}

function scoreScratchCard(scratchCard: ScratchCard) {
  scratchCard.points = scratchCard.ourNumbers.reduce((points, ourNumber) => {
    if (scratchCard.winningNumbers.includes(ourNumber)) {
      if (points === 0) {
        points = 1;
      } else {
        points *= 2;
      }
    }
    return points;
  }, 0);

  return scratchCard;
}

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  let scratchCards = data.map(parseScratchCard);
  scratchCards = scratchCards.map(scoreScratchCard);

  // console.log(scratchCards);

  const pointTotal = scratchCards.reduce(
    (total, scratchCard) => total + scratchCard.points,
    0
  );
  return pointTotal;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
