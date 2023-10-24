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

export const getProductById = (id:number):Product => {
  let result:Product|undefined;
  result = localProductDb.find(
    (product) => product.productId === id
  );
  if (!result) {
    throw new Error("상품을 찾을 수 없습니다.");
  }
  return result;
}

export const calculateNetProfitByProductId = (productId: number): number => {
  const venderFeePercent = 3;
  const deliveryFee = 3000;
  const product = getProductById(productId);
  const totalFeePercent = product.taxFeePercent + venderFeePercent;
  const salePrice = product.salePrice * (100-totalFeePercent)/100;

  let netProfit:number;
  netProfit = salePrice - product.supplyPrice;
  if (!product.isFreeShipping) {
    netProfit -= deliveryFee;
  }

  return netProfit;
};

export const getCustomerTotalChargeByProductId = (
  productId: number,
  quantity: number
): number => {
  const deliveryFee = 3000;
  const product = getProductById(productId);

  let totalCharge: number;
  totalCharge = product.salePrice * quantity;

  if (!product.isFreeShipping) {
    totalCharge += deliveryFee;
  }

  return totalCharge;
};
