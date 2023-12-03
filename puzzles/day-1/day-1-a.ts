import { readData } from '../../shared.ts';
import chalk from 'chalk';

function parseString(str: string) {
  const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const digitRegex = /\d/g;
  let match;
  let matches = [];

  // digit matches
  while ((match = digitRegex.exec(str)) !== null) {
    matches.push({ index: match.index, value: parseInt(match[0]) });
  }

  matches.sort((a, b) => a.index - b.index);
  const firstNum = matches[0].value;
  const secondNum =
    matches.length === 1 ? matches[0].value : matches[matches.length - 1].value;
  return parseInt(`${firstNum}${secondNum}`);
}

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  const calibrations = data.reduce((acc, curr) => {
    acc.push(parseString(curr));
    return acc;
  }, []);
  const sum = calibrations.reduce((acc, curr) => acc + curr, 0);
  return sum;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
