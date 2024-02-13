import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const isEmpty = (value) => value.trim() !== "";
export const isArrayEmpty = (value) => Array.isArray(value) && value.length > 0;
export const isNumber = (value) => value !== "" && !isNaN(value);
export const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
};
