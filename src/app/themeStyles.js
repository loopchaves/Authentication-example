const tags = {
  color: [
    '--root-bg-color',
    '--element-bg-color',
    '--border-color',
    '--text-color',
    '--text-color-msg',
    '--text-color-button',
    '--forgot-password-color',
    '--forgot-password-color-hover',
    '--error-color',
    '--error-bg-color',
    '--notice-color',
    '--notice-bg-color',
    '--tab-unselected-color',
    '--tab-unselected-bg-color',
    '--button-submit-color',
    '--button-action-color',
    '--button-shadow'
  ],
  ftype: '--font-family',
  fsize: [
    '--font-size-text',
    '--font-size-tittle',
    '--font-size-other'
  ]
}

const themeStyles = {
  color: {
    light: ['#fff', '#ccc', '#ddd', '#333', null, '#333', '#255', null, null, null, null, null, null, '#aaa', '#aaf', '#faa', null],
    dark: ['#111', '#111', '#eee', '#eee', null, null, '#11f', null, null, null, null, null, null, '#333', '#22f', '#f62', '#ddd'],
    crazy: ['#c00', '#1f1', '#11f', '#00d', '#f5f', '#fa6', '#000', '#f11', '#ff0', '#fff', '#11f', '#fff', '#dd0', '#f5f', '#f3f', '#ff0', '#f00']
  },
  fsize: {
    small: ['0.85rem', '1rem', '0.8rem'],
    large: ['1.3rem', '1.7rem', '1.1rem']
  }
}

const changeStyle = (style) => {
  const root = document.getElementById('root');
  if (style?.color || style?.ftype || style?.fsize) {
    if (style.color) {
      themeStyles.color[style.color].forEach((value, i) => {
        if (value) {
          root.style.setProperty(tags.color[i], value);
        } else {
          root.style.removeProperty(tags.color[i]);
        }
      });
    } else {
      tags.color.forEach((value) => {
        root.style.removeProperty(value);
      });
    }

    if (style.ftype) {
      root.style.setProperty(tags.ftype, style.ftype);
    } else {
      root.style.removeProperty(tags.ftype);
    }

    if (style.fsize) {
      themeStyles.fsize[style.fsize].forEach((value, i) => {
        root.style.setProperty(tags.fsize[i], value);
      });
    } else {
      tags.fsize.forEach((value) => {
        root.style.removeProperty(value);
      })
    }
  } else {
    root.removeAttribute('style');
  }
}

export default changeStyle;