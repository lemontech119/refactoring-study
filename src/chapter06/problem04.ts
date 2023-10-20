// 매개변수 객체 만들기를 적용해서 리팩토링 해주세요.
const studentTestData = [
  {
    id: 1,
    mathScore: 100,
    scienceScore: 100,
    historyScore: 100,
    englishScore: 100,
  },
  {
    id: 2,
    mathScore: 50,
    scienceScore: 50,
    historyScore: 50,
    englishScore: 50,
  },
];

const totalSummationOfScores = (
  mathScore: number,
  scienceScore: number,
  historyScore: number,
  englishScore: number
): number => {
  let summationResult = mathScore + scienceScore + historyScore + englishScore;
  return summationResult;
};

const deduceLetterFromNumericalValue = (summationResult: number): string => {
  if (summationResult >= 380) {
    return "A";
  } else if (summationResult >= 300) {
    return "B";
  } else if (summationResult >= 250) {
    return "C";
  } else if (summationResult >= 200) {
    return "D";
  } else {
    return "F";
  }
};

export const getStudentGradeById = (id: number): string => {
  const student = studentTestData.find((student) => student.id === id);
  if (!student) {
    throw new Error("학생을 찾을 수 없습니다.");
  }
  const totalScore = totalSummationOfScores(
    student.mathScore,
    student.scienceScore,
    student.historyScore,
    student.englishScore
  );
  const grade = deduceLetterFromNumericalValue(totalScore);
  return grade;
};
