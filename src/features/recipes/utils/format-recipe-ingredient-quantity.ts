export function formatRecipeIngredientQuantity(
  quantity: number,
  unitAbbreviation: string,
): string {
  const formattedQuantity = Number.isInteger(quantity)
    ? String(quantity)
    : quantity.toLocaleString("es", { maximumFractionDigits: 2 });

  return `${formattedQuantity} ${unitAbbreviation}`;
}
