import { readData } from '../../shared.ts';
import chalk from 'chalk';

// need to parse in chunks of five or less characters
// need to parse in order of appearance

function getDigit(str: string) {
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

  const index = numbers.findIndex((num) => str == num);
  if (index === -1) return parseInt(str);
  return index + 1;
}

function parseString(str: string) {
  const regex = /(one|two|three|four|five|six|seven|eight|nine|\d)/g;
  str = str.replaceAll('one', 'o1e');
  str = str.replaceAll('two', 't2o');
  str = str.replaceAll('three', 't3e');
  str = str.replaceAll('four', 'f4r');
  str = str.replaceAll('five', 'f5e');
  str = str.replaceAll('six', 's6x');
  str = str.replaceAll('seven', 's7n');
  str = str.replaceAll('eight', 'e8t');
  str = str.replaceAll('nine', 'n9e');
  const matches = str.match(regex);
  const firstNum = getDigit(matches[0]);
  const lastNum = getDigit(matches[matches.length - 1]);
  return parseInt(`${firstNum}${lastNum}`);
}

export async function day1b(dataPath?: string) {
  let lineNum = 1;
  const data = await readData(dataPath);
  const calibrations = data.reduce((acc, curr) => {
    acc.push(parseString(curr));
    if (lineNum <= 105)
      console.log(`[${lineNum++}] ${curr} => ${acc[acc.length - 1]}`);
    return acc;
  }, []);
  const sum = calibrations.reduce((acc, curr) => acc + curr, 0);
  return sum;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
