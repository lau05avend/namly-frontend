import type { MeasurementUnit } from "@/features/recipes/types/measurement-unit.types";

export function resolveDefaultMeasurementUnitId(
  units: MeasurementUnit[],
): string {
  const defaultUnit = units.find((unit) => unit.isDefault);
  if (defaultUnit) {
    return defaultUnit.id;
  }

  return units[0]?.id ?? "";
}

export function resolveMeasurementUnitById(
  units: MeasurementUnit[],
  unitId: string,
): MeasurementUnit | undefined {
  return units.find((unit) => unit.id === unitId);
}
