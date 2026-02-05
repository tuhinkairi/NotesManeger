export function contentValidator(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const trimmed: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      trimmed[key] = obj[key].trim();
    } else if (typeof obj[key] === 'object') {
      trimmed[key] = contentValidator(obj[key]);
    } else {
      trimmed[key] = obj[key];
    }
  }

  return trimmed;
}
