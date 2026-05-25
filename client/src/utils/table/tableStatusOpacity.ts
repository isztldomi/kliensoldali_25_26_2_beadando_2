export const getStatusOpacity = (status: number) => {
  return 0.4 + (status / 10) * 0.6;
};
