export type Score = {
  mathScore: number;
    scienceScore: number,
    historyScore: number,
    englishScore: number
}

export type StudentInfo = {
  id: number;
  score: Score
}

const studentTestData:StudentInfo[] = [
  {
    id: 1,
    score: {
      mathScore: 100,
      scienceScore: 100,
      historyScore: 100,
      englishScore: 100
    }
  },
  {
    id: 2,
    score: {
      mathScore: 50,
      scienceScore: 50,
      historyScore: 50,
      englishScore: 50
    }
  }
];

const sumScore = (score:{ [key:string ]: number}): number => {
  const scoreList = Object.values(score);
  let total=0;
  for (let i=0,j=scoreList.length;i<j;i++) {
    total += scoreList[i];
  }
  return total;
};

const setGrade = (totalScore: number): string => {
  if (totalScore >= 380) {
    return "A";
  } else if (totalScore >= 300) {
    return "B";
  } else if (totalScore >= 250) {
    return "C";
  } else if (totalScore >= 200) {
    return "D";
  } else {
    return "F";
  }
};

export const getStudentGradeById = (id: number): string => {
  const student = getStudent(id);
  const totalScore = sumScore(student.score);
  const grade = setGrade(totalScore);
  return grade;
};

export const getStudent = (id:number):StudentInfo => {
  const student = studentTestData.find((student) => student.id === id);
  if (!student) {
    throw new Error("학생을 찾을 수 없습니다.");
  }
  return student;
}
