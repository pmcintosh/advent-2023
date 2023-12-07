import { readData } from '../../shared.ts';
import chalk from 'chalk';

interface ScratchCard {
  number: number;
  cardInfo: string;
  winningNumbers: number[];
  ourNumbers: number[];
  points: number;
}

function parseScratchCard(data: string): ScratchCard {
  let cardInfo = data.split(': ')[0];
  let number = parseInt(cardInfo.replace('Card ', ''));
  data = data.replace(cardInfo + ': ', '');
  let numStrings = data.split('|');
  let winningNumbers = numStrings[0].match(/\d+/g).map(Number);
  let ourNumbers = numStrings[1].match(/\d+/g).map(Number);

  const scratchCard = {
    cardInfo: cardInfo,
    number: number,
    winningNumbers: winningNumbers.sort((a, b) => a - b),
    ourNumbers: ourNumbers.sort((a, b) => a - b),
    points: 0,
  } as ScratchCard;

  return scratchCard;
}

function scoreScratchCard(scratchCard: ScratchCard) {
  scratchCard.points = scratchCard.ourNumbers.reduce((points, ourNumber) => {
    if (scratchCard.winningNumbers.includes(ourNumber)) {
      points += 1;
    }
    return points;
  }, 0);

  return scratchCard;
}

function getAllWinners(
  index: number,
  card: ScratchCard,
  cards: ScratchCard[]
): ScratchCard[] {
  let winners = [card];
  const start = index + 1;

  for (let i = start; i < start + card.points && i < cards.length; i++) {
    winners = [...winners, ...getAllWinners(i, cards[i], cards)];
  }

  return winners;
}

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  let scratchCards = data.map(parseScratchCard);
  scratchCards = scratchCards.map(scoreScratchCard);
  const winners = scratchCards
    .map((card, index) => getAllWinners(index, card, scratchCards))
    .flat();

  return winners.length;
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
