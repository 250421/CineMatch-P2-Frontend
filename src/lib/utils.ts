import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl() {
  const url = import.meta.env.VITE_API_URL
  return url;
}

export function convertValue(val: number) {
    if(val < 1000) return val;
    const digit = [
      'k',
      'M',
      'B',
    ]

    let i = 0;
    while(val >= 1000) {
      val /= 1000;
      i++;
    }

    if(i - 1 < digit.length) return Math.floor(val) + digit[i - 1];
    return 0;
  }