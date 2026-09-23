/**
 * Formats salary numbers with proper currency symbol and clean magnitude abbreviations
 * e.g., NGN 14,000,000 -> ₦14M / yr
 * e.g., USD 150,000 -> $150k / yr
 */
export function formatSalary(amount: number, currency: string = 'NGN'): string {
  const curr = currency.toUpperCase();
  const symbol = curr === 'NGN' ? '₦' : curr === 'USD' ? '$' : curr === 'GBP' ? '£' : curr === 'EUR' ? '€' : `${curr} `;

  if (curr === 'NGN') {
    if (amount >= 1000000) {
      const millions = amount / 1000000;
      return `${symbol}${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${symbol}${(amount / 1000).toFixed(0)}k`;
    }
    return `${symbol}${amount.toLocaleString()}`;
  }

  // USD / GBP / EUR
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${symbol}${(amount / 1000).toFixed(0)}k`;
  }
  return `${symbol}${amount.toLocaleString()}`;
}

export function formatSalaryRange(min: number, max: number, currency: string = 'NGN'): string {
  const curr = currency.toUpperCase();
  const symbol = curr === 'NGN' ? '₦' : curr === 'USD' ? '$' : curr === 'GBP' ? '£' : curr === 'EUR' ? '€' : `${curr} `;

  if (curr === 'NGN') {
    const minM = min >= 1000000 ? `${(min / 1000000).toFixed(min % 1000000 === 0 ? 0 : 1)}M` : `${(min / 1000).toFixed(0)}k`;
    const maxM = max >= 1000000 ? `${(max / 1000000).toFixed(max % 1000000 === 0 ? 0 : 1)}M` : `${(max / 1000).toFixed(0)}k`;
    return `${symbol}${minM} - ${symbol}${maxM} / yr`;
  }

  const minStr = min >= 1000 ? `${(min / 1000).toFixed(0)}k` : `${min}`;
  const maxStr = max >= 1000 ? `${(max / 1000).toFixed(0)}k` : `${max}`;
  return `${symbol}${minStr} - ${symbol}${maxStr} ${curr}`;
}
