export const parseVariant = (variantString: string = '') => {
  const parts = variantString.split('/')

  return parts[parts.length - 1]
}
