const OMIT_WORDS = ['of'];

export const cutShortName = (valueStr) => {
  if (valueStr.length > 14) {
    const strValues = valueStr.split(' ');
    let resultStr = '';
    strValues.forEach((element) => {
      if (!OMIT_WORDS.includes(element.toLowerCase())) {
        resultStr += element.slice(0, 1).toUpperCase();
      }
    });
    return resultStr;
  }
  return valueStr;
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
