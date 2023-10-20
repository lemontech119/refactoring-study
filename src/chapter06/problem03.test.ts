import {
  calculateNetProfitByProductId,
  getCustomerTotalChargeByProductId,
} from "./problem03";

describe("Chapter06 - problem03", () => {
  test("상품을 찾을 수 없는 경우 에러가 발생합니다.", () => {
    const productId = 1212121212121;
    expect(() => calculateNetProfitByProductId(productId)).toThrowError(
      "상품을 찾을 수 없습니다."
    );
  });

  test("무료 배송인 상품을 찾은 경우 순수익을 계산합니다.", () => {
    const productId = 1;
    const result = calculateNetProfitByProductId(productId);
    expect(result).toBe(112500);
  });

  test("무료 배송이 아닌 상품을 찾은 경우 순수익을 계산합니다.", () => {
    const productId = 2;
    const result = calculateNetProfitByProductId(productId);
    expect(result).toBe(19400);
  });

  test("상품을 찾을 수 없는 경우 에러가 발생합니다.", () => {
    const productId = 1212121212121;
    const quantity = 1;
    expect(() =>
      getCustomerTotalChargeByProductId(productId, quantity)
    ).toThrowError("상품을 찾을 수 없습니다.");
  });

  test("무료 배송인 상품을 찾은 경우 고객이 지불해야 할 금액을 계산합니다.", () => {
    const productId = 1;
    const quantity = 1;
    const result = getCustomerTotalChargeByProductId(productId, quantity);
    expect(result).toBe(750000);
  });

  test("무료 배송이 아닌 상품을 찾은 경우 고객이 지불해야 할 금액을 계산합니다.", () => {
    const productId = 2;
    const quantity = 2;
    const result = getCustomerTotalChargeByProductId(productId, quantity);
    expect(result).toBe(243000);
  });
});
