export const downloadBanner = async (canvasRef, config) => {
  if (!canvasRef.current) return;
  
  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;

    // Get the banner element
    const bannerElement = canvasRef.current;
    const computedStyle = window.getComputedStyle(bannerElement);

    // Fill background
    if (config.backgroundType === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 800, 400);
      // Simple gradient approximation - you can enhance this
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
    } else if (config.backgroundType === 'image' && config.backgroundImage) {
      // For images, we'll use a solid color as fallback
      ctx.fillStyle = '#667eea';
    } else {
      ctx.fillStyle = '#667eea';
    }
    ctx.fillRect(0, 0, 800, 400);

    // Add text
    ctx.fillStyle = config.textColor;
    ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
    ctx.textAlign = config.template?.style?.textAlign || 'center';
    
    const x = config.template?.style?.textAlign === 'left' ? 60 : 
              config.template?.style?.textAlign === 'right' ? 740 : 400;
    const y = 200;
    
    // Word wrap
    const words = config.text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < 700) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    // Draw lines
    const lineHeight = config.fontSize * 1.4;
    const startY = y - (lines.length - 1) * lineHeight / 2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, x, startY + index * lineHeight);
    });

    // Download
    const link = document.createElement('a');
    link.download = 'text-banner.png';
    link.href = canvas.toDataURL();
    link.click();
  } catch (error) {
    console.error('Download failed:', error);
  }
};