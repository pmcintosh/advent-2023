import { readData } from '../../shared.ts';
import chalk from 'chalk';

interface GameData {
  num: number;
  minRed: number;
  maxRed: number;
  minGreen: number;
  maxGreen: number;
  minBlue: number;
  maxBlue: number;
  sets: number[][];
}

function parseGame(str: string) {
  let gameNumber = str.split(':')[0];
  str = str.replace(gameNumber, '');
  str = str.replace(': ', '');
  const game: GameData = {
    num: parseInt(gameNumber.replace('Game ', '').trim()),
    minRed: 9001,
    maxRed: 0,
    minGreen: 9001,
    maxGreen: 0,
    minBlue: 9001,
    maxBlue: 0,
    sets: [],
  };

  str.split(';').forEach((s) => {
    const cubes = s.split(',');
    let numRed = 0;
    let numGreen = 0;
    let numBlue = 0;

    cubes.forEach((c) => {
      const [numStr, color] = c.trim().split(' ');
      const num = parseInt(numStr);

      switch (color) {
        case 'red':
          game.minRed = Math.min(game.minRed, num);
          game.maxRed = Math.max(game.maxRed, num);
          numRed += num;
          break;
        case 'green':
          game.minGreen = Math.min(game.minGreen, num);
          game.maxGreen = Math.max(game.maxGreen, num);
          numGreen += num;
          break;
        case 'blue':
          game.minBlue = Math.min(game.minBlue, num);
          game.maxBlue = Math.max(game.maxBlue, num);
          numBlue += num;
          break;
      }
    });

    game.sets.push([
      numRed,
      numGreen,
      numBlue,
      Math.max(game.maxRed, 1) *
        Math.max(game.maxGreen, 1) *
        Math.max(game.maxBlue, 1),
    ]);
  });
  return game;
}

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  const games = data.map(parseGame);

  const sum = games.reduce((acc, g) => {
    const maxPower = g.sets.reduce((acc, s) => Math.max(acc, s[3]), 0);
    return acc + maxPower;
  }, 0);

  return sum;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
