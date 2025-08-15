export const BUTTON_TEXT = {
  addToCart: 'Add to cart',
  remove: 'Remove',
} as const;

export type ButtonKey = keyof typeof BUTTON_TEXT;