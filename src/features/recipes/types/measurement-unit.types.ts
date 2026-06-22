export type MeasurementUnitCategory =
  | "count"
  | "volume"
  | "weight"
  | "other";

export type MeasurementUnit = {
  id: string;
  name: string;
  abbreviation: string;
  category: MeasurementUnitCategory;
  isConvertible: boolean;
  isDefault: boolean;
};
