export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  isDelete?: boolean;
};

export type AddUser = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type UpdateUserPassword = {
  id: number;
  oldPassword: string;
  oldPasswordConfirm: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type DeleteUser = {
  id: number;
  password: string;
  passwordConfirm: string;
};

export const localUserDb: User[] = [
  {
    id: 1,
    name: "ryan",
    email: "ryan@tooning.io",
    password: "1111",
    isDelete: false,
  },
  {
    id: 2,
    name: "paul",
    email: "paul@tooning.io",
    password: "2222",
    isDelete: false,
  },
  {
    id: 3,
    name: "riley",
    email: "riley@tooning.io",
    password: "3333",
    isDelete: false,
  },
];

export const addUser = (user: AddUser): User => {
  if (user.password !== user.passwordConfirm) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }
  if (user.email.includes("@") === false) {
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }
  if (user.password.length < 4) {
    throw new Error("비밀번호는 4자리 이상이어야 합니다.");
  }
  if (user.name) {
    const isExist = localUserDb.some((item) => item.name === user.name);
    if (isExist) {
      throw new Error("이미 존재하는 이름입니다.");
    }
  }
  const newId = localUserDb.length + 1;

  const newUser = {
    id: newId,
    name: user.name,
    email: user.email,
    password: user.password,
    isDelete: false,
  };

  localUserDb.push(newUser);

  console.log(
    user.email,
    "-----------------------\n회원 가입을 축하드립니다.\n회원가입 축하 메일 대신 console을 사용\n-----------------------"
  );

  return newUser;
};

export const getUserById = (id: number): Partial<User> => {
  const i = localUserDb.findIndex((b) => b.id === id);
  if (i === -1) {
    throw new Error("없는 유저를 조회했습니다.");
  }
  const user = localUserDb[i];

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const allUserCount = (): number => {
  const allUserCnt = localUserDb.length;
  return allUserCnt;
};

export const updatePassword = (updatePassword: UpdateUserPassword): boolean => {
  let r = false;
  if (updatePassword.oldPassword !== updatePassword.oldPasswordConfirm) {
    throw new Error("기존 패스워드와 기존 패스워드 확인 다릅니다.");
  }
  if (updatePassword.newPassword !== updatePassword.newPasswordConfirm) {
    throw new Error("신규 패스워드와 신규 패스워드 확인 다릅니다.");
  }
  if (updatePassword.newPassword.length < 4) {
    throw new Error("비밀번호는 4자리 이상이어야 합니다.");
  }
  const a = localUserDb.findIndex((b) => b.id === updatePassword.id);
  if (a === -1) {
    throw new Error("없는 유저 입니다.");
  }

  localUserDb[a].password = updatePassword.newPassword;
  r = true;

  return r;
};

export const deleteUser = (d: DeleteUser): boolean => {
  if (d.password !== d.passwordConfirm) {
    throw new Error("패스워드와 패스워드 확인이 일치하지 않습니다.");
  }

  const c = localUserDb.findIndex((i) => i.id === d.id);
  if (c === -1) {
    throw new Error("없는 유저 입니다.");
  }

  localUserDb[c].isDelete = true;

  console.log(localUserDb[c].email, "지금까지 즐거웠습니다. ㅠㅠ");

  return true;
};
