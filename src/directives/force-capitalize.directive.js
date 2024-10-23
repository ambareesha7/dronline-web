const forceCapitailize = {
  update(el) {
    el.value = `${el.value.charAt(0).toUpperCase()}${el.value.slice(1).toLowerCase()}`;
  }
};

export default forceCapitailize;
