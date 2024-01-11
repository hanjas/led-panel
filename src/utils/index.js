exports.rgbToDec = (r, g, b) => {
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return (r << 16) + (g << 8) + b
}