export const bodyInFootprint = (body: any, footprint: any) => {
  return !(
    body.x2 < footprint.x1 ||
    body.x1 > footprint.x2 ||
    body.y2 < footprint.y1 ||
    body.y1 > footprint.y2
  );
};
