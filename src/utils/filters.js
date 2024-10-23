export const number = (value = 0, digits = 0) => {
  const fixed = Number(value).toFixed(digits);
  return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const charsLeft = (value = 0, max = 0) => {
  let remain = 0;
  if (value && value.length <= max) {
    remain = max - value.length;
  } else if (!value) {
    remain = max;
  }
  return `${remain}/${max}`;
};

export const currency = (value = 0, cur = 'AED') => `${value} ${cur}`;

export const capitalize = value => {
  if (!value) return '';
  return value.split(' ').map(part => `${part.charAt(0).toUpperCase()}${part.substring(1)}`).join('');
};

export const snakeToTitleCase = value => {
  if (!value) return '';
  return value.split('_').map(part => `${part.charAt(0).toUpperCase()}${part.substring(1)}`).join(' ');
};

export const kebabToPascalCase = value => {
  if (!value) return '';
  return value.split('-').map(part => `${part.charAt(0).toUpperCase()}${part.substring(1)}`).join('');
};

export const kebabToSnakeCase = value => {
  if (!value) return '';
  return value.split('-').join('_');
};

export const snakeToKebabCase = value => {
  if (!value) return '';
  return value.split('_').join('-');
};

export const pascalToSnakeCase = value => {
  if (!value) return '';
  return value.split(/(?=[A-Z])/).join('_').toLowerCase();
};

export const snakeToCamelCase = value => {
  if (!value) return '';
  return value.replace(/(\s|\t|_)([a-z])/g, g => g[1].toUpperCase());
};

export const duration = value => {
  let diff = value;
  let duration = '';
  const h_ms = 3600000;
  const m_ms = 60000;
  const s_ms = 1000;
  const hours = Math.round(diff / h_ms);
  diff -= hours * h_ms;
  if (hours) duration += `${hours} h `;
  const minutes = Math.round(diff / m_ms);
  if (minutes) duration += `${minutes} min `;
  diff -= minutes * m_ms;
  const seconds = Math.round(diff / s_ms);
  duration += `${seconds} sec`;
  return duration;
};

export const truncate = (text = '', length = 30, hard = false, clamp = '...') => {
  if (text.length <= length) return text;

  let tcText = text.slice(0, length - clamp.length);
  let last = tcText.length - 1;

  if (hard) {
    while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;
    last = last || length - clamp.length;
  }
  tcText = tcText.slice(0, last);
  return tcText + clamp;
};
