import { ApiError } from './api-error';

type IntegerOptions = {
  defaultValue?: number;
  min?: number;
  max?: number;
  optional?: boolean;
};

const getSingleValue = (value: unknown, field: string) => {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new ApiError(
      400,
      'INVALID_QUERY',
      `${field} must be a single value.`,
    );
  }
  return String(value);
};

export function parseInteger(
  value: unknown,
  field: string,
  options: IntegerOptions & { optional: true },
): number | null;
export function parseInteger(
  value: unknown,
  field: string,
  options?: IntegerOptions & { optional?: false },
): number;
export function parseInteger(
  value: unknown,
  field: string,
  {
    defaultValue,
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    optional,
  }: IntegerOptions = {},
) {
  const rawValue = getSingleValue(value, field);

  if (rawValue === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    if (optional) return null;
    throw new ApiError(400, 'INVALID_QUERY', `${field} is required.`);
  }

  if (!/^-?\d+$/.test(rawValue)) {
    throw new ApiError(400, 'INVALID_QUERY', `${field} must be an integer.`);
  }

  const parsedValue = Number(rawValue);
  if (
    !Number.isSafeInteger(parsedValue) ||
    parsedValue < min ||
    parsedValue > max
  ) {
    throw new ApiError(
      400,
      'INVALID_QUERY',
      `${field} must be between ${min} and ${max}.`,
    );
  }

  return parsedValue;
}

export const parseOptionalText = (
  value: unknown,
  field: string,
  maxLength = 128,
) => {
  const rawValue = getSingleValue(value, field);
  if (rawValue === undefined) return null;

  const parsedValue = rawValue.trim();
  if (!parsedValue || parsedValue.length > maxLength) {
    throw new ApiError(
      400,
      'INVALID_QUERY',
      `${field} must contain between 1 and ${maxLength} characters.`,
    );
  }

  return parsedValue;
};

export const parseEnum = <T extends string>(
  value: unknown,
  field: string,
  allowedValues: readonly T[],
  defaultValue: T,
) => {
  const rawValue = getSingleValue(value, field) ?? defaultValue;
  if (!allowedValues.includes(rawValue as T)) {
    throw new ApiError(
      400,
      'INVALID_QUERY',
      `${field} must be one of: ${allowedValues.join(', ')}.`,
    );
  }
  return rawValue as T;
};

export const parseCategoryKeyword = (value: unknown) => {
  const rawValue = getSingleValue(value, 'keyword');
  if (!rawValue) {
    throw new ApiError(400, 'INVALID_QUERY', 'keyword is required.');
  }

  let parsedValue: unknown;
  try {
    parsedValue = JSON.parse(rawValue);
  } catch {
    throw new ApiError(400, 'INVALID_QUERY', 'keyword must be a JSON array.');
  }

  if (
    !Array.isArray(parsedValue) ||
    parsedValue.length === 0 ||
    parsedValue.length > 10 ||
    parsedValue.some(
      (item) => typeof item !== 'string' || !item.trim() || item.length > 50,
    )
  ) {
    throw new ApiError(
      400,
      'INVALID_QUERY',
      'keyword must contain between 1 and 10 category names.',
    );
  }

  return JSON.stringify(parsedValue.map((item) => item.trim()));
};

export const parseSearchText = (value: unknown) => {
  const parsedValue = parseOptionalText(value, 'keyword', 100);
  if (!parsedValue) {
    throw new ApiError(400, 'INVALID_QUERY', 'keyword is required.');
  }
  return parsedValue;
};
