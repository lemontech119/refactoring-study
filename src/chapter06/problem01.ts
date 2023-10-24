export type BaseballResult = {
  strikes: number;
  balls: number;
  resultMessage: string;
};

export const checkBaseballNumber = (
  answer: string,
  guess: string
): BaseballResult => {
  const { strikes, balls } = compare(guess, answer);

  let resultMessage = "";
  if (strikes === answer.length) {
    resultMessage = "삼진 아웃!";
  } else if (strikes === 0 && balls === 0) {
    resultMessage = "낫싱";
  } else {
    resultMessage = `${strikes} 스트라이크, ${balls} 볼`;
  }

  return {
    strikes,
    balls,
    resultMessage,
  };
};

export const compare = (guess:string, answer:string): {[key:string]:number} => {
  let result = {strikes:0, balls:0};
  for (let i = 0, j = answer.length; i < j; i++) {
    if (answer[i] === guess[i]) {
      result.strikes++;
    } else if (answer.includes(guess[i])) {
      result.balls++;
    }
  }
  return result;
}
