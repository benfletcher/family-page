export const SHOW_ZOOMED = 'SHOW_ZOOMED';
export const showZoomed = (photo, index) => ({
  type: SHOW_ZOOMED,
  photo,
  index,
});

export const HIDE_ZOOMED = 'HIDE_ZOOMED';
export const hideZoomed = () => ({
  type: HIDE_ZOOMED,
});
