export const capitalize = (s: string): string => {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};
