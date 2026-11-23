/**
 * Extracts the clean client/brand name without leading Georgian prefix.
 */
export function formatBrandName(clientName: string): string {
  return clientName.replace(/^(ბრენდისთვის|კლიენტი)\s*:\s*/i, '').trim();
}

/**
 * Normalizes a creator's client attribution string to the consistent
 * Georgian display prefix `კლიენტი: ...`.
 */
export function formatClientLabel(clientName: string): string {
  return `კლიენტი: ${formatBrandName(clientName)}`;
}
