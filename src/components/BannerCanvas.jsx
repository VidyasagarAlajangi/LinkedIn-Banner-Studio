import React from 'react';

const BannerCanvas = React.forwardRef(({ config }, ref) => {
  const getBackgroundStyle = () => {
    if (config.backgroundType === 'image' && config.backgroundImage) {
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,${1 - config.imageOpacity}), rgba(0,0,0,${1 - config.imageOpacity})), url(${config.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {
      background: config.background
    };
  };

  const canvasStyle = {
    ...getBackgroundStyle(),
    fontFamily: config.fontFamily,
    color: config.textColor,
    width: '1584px', // updated
    height: '396px', // updated
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    ...config.template?.style
  };

  return (
    <div
      ref={ref}
      style={canvasStyle}
      className="shadow-2xl rounded-lg overflow-hidden"
    >
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <p
          style={{
            fontSize: `${config.fontSize}px`,
            fontWeight: config.fontWeight,
            lineHeight: '1.4',
            margin: 0,
            textShadow: config.backgroundType === 'image' ? '2px 2px 4px rgba(0,0,0,0.7)' : 'none',
            textAlign: config.template?.style?.textAlign || 'center',
            maxWidth: '90%'
          }}
        >
          {config.text}
        </p>
        {config.author && (
          <span
            style={{
              marginTop: '1.5rem',
              fontSize: '1.25rem',
              fontWeight: 400,
              opacity: 0.8,
              textShadow: config.backgroundType === 'image' ? '1px 1px 3px rgba(0,0,0,0.5)' : 'none',
              fontStyle: 'italic',
              textAlign: config.template?.style?.textAlign || 'center',
              maxWidth: '90%'
            }}
            className="block"
          >
            — {config.author}
          </span>
        )}
      </div>
    </div>
  );
});

BannerCanvas.displayName = 'BannerCanvas';

export default BannerCanvas;