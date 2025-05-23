export const downloadBanner = async (canvasRef, config) => {
  if (!canvasRef.current) return;
  
  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 269;

    // Fill background
    if (config.backgroundType === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 1080, 269);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 269);
      proceedWithText();
    } else if (config.backgroundType === 'image' && config.backgroundImage) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = config.backgroundImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 1080, 269);
        if (config.imageOpacity < 1) {
          ctx.fillStyle = `rgba(0,0,0,${1 - config.imageOpacity})`;
          ctx.fillRect(0, 0, 1080, 269);
        }
        proceedWithText();
      };
      img.onerror = () => {
        ctx.fillStyle = '#667eea';
        ctx.fillRect(0, 0, 1080, 269);
        proceedWithText();
      };
      return;
    } else {
      ctx.fillStyle = '#667eea';
      ctx.fillRect(0, 0, 1080, 269);
      proceedWithText();
    }

    function proceedWithText() {
      // Add main text
      ctx.fillStyle = config.textColor;
      ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
      ctx.textAlign = config.template?.style?.textAlign || 'center';

      // Text positioning
      const x = config.template?.style?.textAlign === 'left' ? 60 : 
                config.template?.style?.textAlign === 'right' ? 1080 - 60 : 1080 / 2;
      const y = 269 / 2;

      // Word wrap
      const words = config.text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < 1000) {
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

      // Draw author if present
      if (config.author) {
        ctx.font = `italic ${Math.round(config.fontSize * 0.8)}px ${config.fontFamily}`;
        ctx.fillStyle = config.textColor;
        ctx.globalAlpha = 0.8;

        // Calculate x position based on alignment
        let authorX = x;
        if (config.template?.style?.textAlign === 'left') {
          ctx.textAlign = 'left';
          authorX = 60;
        } else if (config.template?.style?.textAlign === 'right') {
          ctx.textAlign = 'right';
          authorX = 1080 - 60;
        } else {
          ctx.textAlign = 'center';
          authorX = 1080 / 2;
        }

        ctx.fillText(
          `— ${config.author}`,
          authorX,
          startY + lines.length * lineHeight + 32
        );
        ctx.globalAlpha = 1;
      }

      // Download
      const link = document.createElement('a');
      link.download = 'text-banner.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  } catch (error) {
    console.error('Download failed:', error);
  }
};

