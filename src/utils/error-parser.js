const isNotEmptyObject = entity => typeof entity === 'object' && entity !== null && Object.keys(entity).length;

export const parseError = response => {
  if (!isNotEmptyObject(response)) return 'Unknown error';
  const type = Object.keys(response)[0];
  let error;
  switch (type.toLowerCase()) {
    case 'simpleerror':
      error = response[type].message;
      break;
    case 'formerrors':
      error = response[type][Object.keys(response[type])[0]]
        .map(fieldError => `${fieldError.field}: ${fieldError.message}`)
        .join('\n');
      break;
    default:
      break;
  }
  return error;
};
