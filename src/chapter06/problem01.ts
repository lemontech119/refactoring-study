export type BaseballResult = {
  strikes: number;
  balls: number;
  resultMessage: string;
};

export const checkBaseballNumber = (
  answer: string,
  guess: string
): BaseballResult => {
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === guess[i]) {
      strikes++;
    } else if (answer.includes(guess[i])) {
      balls++;
    }
  }

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
