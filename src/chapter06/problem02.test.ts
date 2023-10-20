import {
  addUser,
  AddUser,
  getUserById,
  updatePassword,
  UpdateUserPassword,
  deleteUser,
  DeleteUser,
} from "./problem02";

describe("Chapter 06. problem 02", () => {
  test("회원가입시 패스워드와 패스워드 확인이 다르면 에러가 발생합니다.", () => {
    const user: AddUser = {
      name: "testCase01",
      email: "test01@test.com",
      password: "1234",
      passwordConfirm: "1109",
    };

    expect(() => addUser(user)).toThrowError("비밀번호가 일치하지 않습니다.");
  });

  test("회원가입 시 패스워드가 일치하면서, 이메일 형식이 올바르지 않으면 에러가 발생합니다.", () => {
    const user: AddUser = {
      name: "testCase02",
      email: "test02.test.com",
      password: "1234",
      passwordConfirm: "1234",
    };

    expect(() => addUser(user)).toThrowError(
      "이메일 형식이 올바르지 않습니다."
    );
  });

  test("회원가입 시 패스워드가 일치하면서, 이메일 형식이 올바르지만, 패스워드가 4자리 미만이면 에러가 발생합니다.", () => {
    const user: AddUser = {
      name: "testCase03",
      email: "test03@test.com",
      password: "3",
      passwordConfirm: "3",
    };

    expect(() => addUser(user)).toThrowError(
      "비밀번호는 4자리 이상이어야 합니다."
    );
  });

  test("회원가입 시 이미 있는 이름이면 에러가 발생합니다.", () => {
    const user: AddUser = {
      name: "ryan",
      email: "ryan@tooning.io",
      password: "11111",
      passwordConfirm: "11111",
    };

    expect(() => addUser(user)).toThrowError("이미 존재하는 이름입니다.");
  });

  test("회원가입 시 모든 조건을 만족한 kevin은 가입이 정상적으로 됩니다.", () => {
    const user: AddUser = {
      name: "kevin",
      email: "kevin@tooning.io",
      password: "1234",
      passwordConfirm: "1234",
    };

    const newUser = addUser(user);
    expect(newUser.name).toEqual("kevin");
  });

  test("없는 user를 조회하면 에러가 발생합니다.", () => {
    expect(() => getUserById(1000000000000)).toThrowError(
      "없는 유저를 조회했습니다."
    );
  });

  test("회원 패스워드 변경 시 기존 패스워드와 기존 패스워드 확인이 다른 경우 에러가 발생합니다.", () => {
    const updatePasswordTest01: UpdateUserPassword = {
      id: 1,
      oldPassword: "1111",
      oldPasswordConfirm: "1110",
      newPassword: "1112",
      newPasswordConfirm: "1112",
    };

    expect(() => updatePassword(updatePasswordTest01)).toThrowError(
      "기존 패스워드와 기존 패스워드 확인 다릅니다."
    );
  });

  test("회원 패스워드 변경 시 신규 패스워드와 신규 패스워드 확인이 다른 경우 에러가 발생합니다.", () => {
    const updatePasswordTest03: UpdateUserPassword = {
      id: 1,
      oldPassword: "1111",
      oldPasswordConfirm: "1111",
      newPassword: "1112",
      newPasswordConfirm: "1113",
    };

    expect(() => updatePassword(updatePasswordTest03)).toThrowError(
      "신규 패스워드와 신규 패스워드 확인 다릅니다."
    );
  });

  test("회원 패스워드 변경 시 신규 패스워드의 길이가 4자 미만이면 에러가 발생합니다.", () => {
    const updatePasswordTest04: UpdateUserPassword = {
      id: 1,
      oldPassword: "1111",
      oldPasswordConfirm: "1111",
      newPassword: "111",
      newPasswordConfirm: "111",
    };

    expect(() => updatePassword(updatePasswordTest04)).toThrowError(
      "비밀번호는 4자리 이상이어야 합니다."
    );
  });

  test("회원 패스워드 정상적으로 변경이 성공하면 true를 반환받습니다.", () => {
    const updatePasswordTest05: UpdateUserPassword = {
      id: 1,
      oldPassword: "1111",
      oldPasswordConfirm: "1111",
      newPassword: "22222",
      newPasswordConfirm: "22222",
    };

    expect(updatePassword(updatePasswordTest05)).toEqual(true);
  });

  test("없는 회원 번호로 삭제 요청하는 경우 에러가 발생합니다.", () => {
    const deleteUserTest01: DeleteUser = {
      id: 12121312412412412312,
      password: "1111",
      passwordConfirm: "1111",
    };

    expect(() => deleteUser(deleteUserTest01)).toThrowError(
      "없는 유저 입니다."
    );
  });
});
