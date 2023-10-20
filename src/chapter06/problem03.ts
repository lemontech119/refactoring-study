export type Product = {
  productId: number;
  name: string;
  salePrice: number;
  supplyPrice: number;
  category: string;
  taxFeePercent: number;
  isFreeShipping: boolean;
};

export const localProductDb: Product[] = [
  {
    productId: 1,
    name: "BRICK 65 _ STS BASE PLATE & ALUMINUM UPPER KIT",
    salePrice: 750000,
    supplyPrice: 600000,
    category: "Equipment",
    taxFeePercent: 2,
    isFreeShipping: true,
  },
  {
    productId: 2,
    name: "위스키",
    salePrice: 120000,
    supplyPrice: 70000,
    category: "Alcohol",
    taxFeePercent: 20,
    isFreeShipping: false,
  },
];

export const calculateNetProfitByProductId = (productId: number): number => {
  const venderFeePercent = 3;
  const deliveryFee = 3000;
  const product = localProductDb.find(
    (product) => product.productId === productId
  );
  if (!product) {
    throw new Error("상품을 찾을 수 없습니다.");
  }

  if (product.isFreeShipping) {
    return (
      product.salePrice -
      product.supplyPrice -
      product.salePrice * (product.taxFeePercent / 100) -
      product.salePrice * (venderFeePercent / 100)
    );
  }

  return (
    product.salePrice -
    product.supplyPrice -
    product.salePrice * (product.taxFeePercent / 100) -
    product.salePrice * (venderFeePercent / 100) -
    deliveryFee
  );
};

export const getCustomerTotalChargeByProductId = (
  productId: number,
  quantity: number
): number => {
  const deliveryFee = 3000;
  const product = localProductDb.find(
    (product) => product.productId === productId
  );
  if (!product) {
    throw new Error("상품을 찾을 수 없습니다.");
  }
  let totalCharge: number;
  if (product.isFreeShipping) {
    totalCharge = product.salePrice * quantity;
  } else {
    totalCharge = product.salePrice * quantity + deliveryFee;
  }
  return totalCharge;
};
