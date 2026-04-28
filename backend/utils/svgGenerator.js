function generateSVG(shapes, width = 1920, height = 1080) {
  // Compute bounding box to properly size the SVG if desired,
  // but for simplicity we'll just export a fixed/large viewport or calculate based on shapes.
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  if (!shapes || shapes.length === 0) {
    minX = 0; minY = 0; maxX = 800; maxY = 600;
  } else {
    shapes.forEach(s => {
      if (s.x < minX) minX = s.x;
      if (s.y < minY) minY = s.y;
      if (s.x + s.width > maxX) maxX = s.x + s.width;
      if (s.y + s.height > maxY) maxY = s.y + s.height;
    });
    // Add padding
    minX -= 50; minY -= 50; maxX += 50; maxY += 50;
  }

  const viewBox = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  let defs = '';
  const shapesMarkup = (shapes || []).map(shape => {
    const transform = `transform="rotate(${shape.rotation || 0} ${shape.x + shape.width/2} ${shape.y + shape.height/2})"`;
    const common = `fill="${shape.fill || 'transparent'}" stroke="${shape.stroke || 'black'}" stroke-width="${shape.strokeWidth || 0}" ${transform}`;

    switch (shape.type) {
      case 'rectangle':
        return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" rx="4" ry="4" ${common} />`;
      case 'circle':
        return `<ellipse cx="${shape.x + shape.width/2}" cy="${shape.y + shape.height/2}" rx="${shape.width/2}" ry="${shape.height/2}" ${common} />`;
      case 'text':
        return `<text x="${shape.x}" y="${shape.y + (shape.fontSize || 16)}" font-family="${shape.fontFamily || 'Inter, sans-serif'}" font-size="${shape.fontSize || 16}px" fill="${shape.fill || 'black'}">${(shape.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>`;
      case 'line':
        return `<line x1="${shape.x}" y1="${shape.y + shape.height/2}" x2="${shape.x + shape.width}" y2="${shape.y + shape.height/2}" ${common} />`;
      case 'arrow':
        defs += `<marker id="arrow-${shape.id}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="${shape.stroke}" /></marker>`;
        return `<line x1="${shape.x}" y1="${shape.y + shape.height/2}" x2="${shape.x + shape.width}" y2="${shape.y + shape.height/2}" ${common} marker-end="url(#arrow-${shape.id})" />`;
      case 'triangle':
        return `<polygon points="${shape.x + shape.width/2},${shape.y} ${shape.x + shape.width},${shape.y + shape.height} ${shape.x},${shape.y + shape.height}" ${common} />`;
      case 'star':
        // simplified star
        return `<polygon points="${shape.x + shape.width/2},${shape.y} ${shape.x + shape.width * 0.61},${shape.y + shape.height * 0.35} ${shape.x + shape.width * 0.98},${shape.y + shape.height * 0.35} ${shape.x + shape.width * 0.68},${shape.y + shape.height * 0.57} ${shape.x + shape.width * 0.79},${shape.y + shape.height * 0.91} ${shape.x + shape.width/2},${shape.y + shape.height * 0.70} ${shape.x + shape.width * 0.21},${shape.y + shape.height * 0.91} ${shape.x + shape.width * 0.32},${shape.y + shape.height * 0.57} ${shape.x + shape.width * 0.02},${shape.y + shape.height * 0.35} ${shape.x + shape.width * 0.39},${shape.y + shape.height * 0.35}" ${common} />`;
      default:
        return '';
    }
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${maxX - minX}" height="${maxY - minY}">
    <defs>${defs}</defs>
    ${shapesMarkup}
  </svg>`;
}

module.exports = { generateSVG };
