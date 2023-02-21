export const transformPriceFromSylius = (price: number) => {
  return price ? price / 100 : 0
}
