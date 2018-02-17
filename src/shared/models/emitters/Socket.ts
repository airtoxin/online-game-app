export interface Socket {
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, ...args: any[]) => void;
}
