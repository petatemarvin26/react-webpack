export type Peek = {
  (key: string): any;
};

export type Push = {
  (key: string, value: any): void;
};

export type PushAsync = {
  (key: string, value: any): Promise<void>;
};

export type Pop = {
  (key: string): void;
};
