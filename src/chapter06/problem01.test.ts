import { checkBaseballNumber } from "./problem01";

describe("Chapter 06. problem 01", () => {
  test("요청한 값이 다 맞는 경우 '삼진 아웃!' 이라는 resultMessage를 받습니다.", () => {
    const answer = "123";
    const guess = "123";
    const result = checkBaseballNumber(answer, guess);
    expect(result.resultMessage).toBe("삼진 아웃!");
  });

  test("요청한 값이 다 틀린 경우 '낫싱' 이라는 resultMessage를 받습니다.", () => {
    const answer = "123";
    const guess = "456";
    const result = checkBaseballNumber(answer, guess);
    expect(result.resultMessage).toBe("낫싱");
  });

  test('요청한 값이 일부 맞는 경우 "1 스트라이크, 1 볼" 이라는 resultMessage를 받습니다.', () => {
    const answer = "123";
    const guess = "134";
    const result = checkBaseballNumber(answer, guess);
    expect(result.resultMessage).toBe("1 스트라이크, 1 볼");
  });
});
