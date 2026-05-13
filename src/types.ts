export type HeaderData = {
  text: string;
  level: 1 | 2 | 3 | 4 | 5;
};

export type ParagraphData = {
  text: string;
};

export type ListItemMeta = {
  checked?: boolean;
  start?: number;
  counterType?: string;
};

export type ListItem = {
  content: string;
  meta: ListItemMeta;
  items: ListItem[];
};

export type ListData = {
  style: string;
  items: ListItem[] | string[];
  meta?: ListItemMeta;
};

export type ChecklistData = {
  items: { text: string; checked: boolean }[];
};

export type ImageData = {
  caption: string;
  withBorder: boolean;
  withBackground: boolean;
  stretched: boolean;
  file?: { url: string };
  url?: string;
};

export type CodeData = {
  code: string;
};

export type MathData = {
  text: string;
};

export type AttachesData = {
  file: { url?: string; size?: number; name?: string; extension?: string };
  title: string;
};

export type EmbedData = {
  service: string;
  source: string;
  embed: string;
  width?: number;
  height?: number;
  caption?: string;
};

export type QuoteData = {
  text: string;
  caption?: string;
  alignment?: "left" | "center";
};

export type DelimiterData = Record<string, never>;

export type WarningData = {
  title: string;
  message: string;
};
