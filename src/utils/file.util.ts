export function convertBytestoKB(bytes: number): number {
  return Math.round(bytes / 1024);
}

export function convertBytestoMB(bytes: number): number {
  return Math.round(bytes / 1024 / 1024);
}
