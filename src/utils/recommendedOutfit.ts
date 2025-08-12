export function recommendOutfit({ tempC, condition }: { tempC: number; condition: string }): string[] {
  const lowerCond = (condition || '').toLowerCase();
  const suggestions: string[] = [];
  if (lowerCond.includes('rain') || lowerCond.includes('drizzle')) suggestions.push('Take an umbrella');
  if (lowerCond.includes('snow')) suggestions.push('Wear warm boots and a heavy coat');
  if (lowerCond.includes('clear') && tempC >= 20) suggestions.push('Sunglasses suggested');
  if (tempC <= 10) suggestions.push('Wear a warm jacket');
  if (tempC > 10 && tempC <= 18) suggestions.push('Light jacket recommended');
  if (tempC > 18 && tempC <= 25) suggestions.push('Comfortable clothes');
  if (tempC > 25) suggestions.push('Light clothing and stay hydrated');
  return [...new Set(suggestions)];
}