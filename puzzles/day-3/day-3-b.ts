import { readData } from '../../shared.ts';
import chalk from 'chalk';

function buildSchematic(data: string[]) {
  const schematicWidth = data[0].length;
  const schematic: string[][] = data.map((row) => row.split(''));
  return schematic;
}

function prettyPrintSchematic(schematic: string[][]) {
  schematic.forEach((row) => {
    row.forEach((cell) => {
      if (cell.match(/\d/)) {
        process.stdout.write(chalk.bgGreen(cell));
      } else if (cell.match(/\./)) {
        process.stdout.write(chalk.bgBlue(cell));
      } else {
        process.stdout.write(chalk.bgYellow(cell));
      }
    });

    process.stdout.write('\n');
  });
}

function getWholeNumber(schematic: string[][], row: number, col: number) {
  // find a whole number in the specified row, starting from the specified column
  // stop if we hit a non-digit character
  // console.log('searching schematic', row, col);

  if (row < 0 || row >= schematic.length) {
    return NaN;
  } else if (col < 0 || col >= schematic[row].length) {
    return NaN;
  }

  let numberStart = -1;
  let numberEnd = -1;
  let currentCol = col;

  // find the start of the number
  while (currentCol >= 0 && schematic[row][currentCol].match(/\d/)) {
    currentCol--;
  }
  numberStart = currentCol + 1;

  // find the end of the number
  currentCol = col;
  while (
    currentCol < schematic[row].length &&
    schematic[row][currentCol].match(/\d/)
  ) {
    currentCol++;
  }
  numberEnd = currentCol - 1;

  // no number 😔
  if (numberStart === -1 || numberEnd === -1) {
    return NaN;
  }

  const numberString = schematic[row]
    .slice(numberStart, numberEnd + 1)
    .join('');
  return parseInt(numberString);
}

function parseSchematic(schematic: string[][]) {
  let numbers = [];

  for (let row = 0; row < schematic.length; row++) {
    for (let col = 0; col < schematic[row].length; col++) {
      const cell = schematic[row][col];
      if (cell.match(/[^a-zA-Z0-9\.]/)) {
        // we found a marker! 🎉
        // find all possible matches
        const matches = [];

        matches.push(getWholeNumber(schematic, row - 1, col - 1)); // upper left
        matches.push(getWholeNumber(schematic, row - 1, col)); // up
        matches.push(getWholeNumber(schematic, row - 1, col + 1)); // upper right
        matches.push(getWholeNumber(schematic, row, col + 1)); // right
        matches.push(getWholeNumber(schematic, row + 1, col + 1)); // lower right
        matches.push(getWholeNumber(schematic, row + 1, col)); // down
        matches.push(getWholeNumber(schematic, row + 1, col - 1)); // lower left
        matches.push(getWholeNumber(schematic, row, col - 1)); // left

        // filter out NaNs and duplicates
        const filteredMatches = matches.filter((m) => !isNaN(m));
        const uniqueMatches = Array.from(new Set(filteredMatches));

        if (uniqueMatches.length === 2) {
          // only add if there are two unique matches, as this indicates a gear!
          numbers = [...numbers, uniqueMatches[0] * uniqueMatches[1]];
        }
      }
    }
  }

  return numbers;
}

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  const schematic = buildSchematic(data);
  prettyPrintSchematic(schematic);
  const numbers = parseSchematic(schematic);
  console.log(numbers);
  const result = numbers.reduce((acc, n) => acc + n, 0);
  return result;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
