import { getStudentGradeById } from "./problem04";

describe("Chapter 06. problem 04", () => {
  test("학생을 찾을 수 없는 경우 에러가 발생합니다.", () => {
    const studentId = 1212121212121;
    expect(() => getStudentGradeById(studentId)).toThrowError(
      "학생을 찾을 수 없습니다."
    );
  });

  test("학생을 찾은 경우 학점을 계산합니다.", () => {
    const studentId = 1;
    const result = getStudentGradeById(studentId);
    expect(result).toBe("A");
  });

  test("학생을 찾은 경우 학점을 계산합니다2", () => {
    const studentId = 2;
    const result = getStudentGradeById(studentId);
    expect(result).toBe("D");
  });
});
