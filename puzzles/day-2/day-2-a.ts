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
  };

  str.split(';').forEach((s) => {
    const cubes = s.split(',');
    cubes.forEach((c) => {
      const [num, color] = c.trim().split(' ');
      switch (color) {
        case 'red':
          game.minRed = Math.min(game.minRed, parseInt(num));
          game.maxRed = Math.max(game.maxRed, parseInt(num));
          break;
        case 'green':
          game.minGreen = Math.min(game.minGreen, parseInt(num));
          game.maxGreen = Math.max(game.maxGreen, parseInt(num));
          break;
        case 'blue':
          game.minBlue = Math.min(game.minBlue, parseInt(num));
          game.maxBlue = Math.max(game.maxBlue, parseInt(num));
          break;
      }
    });
  });

  return game;
}

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const games = data.map(parseGame);

  const matches = games.filter(
    (g) => g.maxRed <= 12 && g.maxGreen <= 13 && g.maxBlue <= 14
  );

  return matches.reduce((acc, g) => acc + g.num, 0);
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
