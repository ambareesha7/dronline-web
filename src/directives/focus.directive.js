const focus = {
  inserted: el => {
    setTimeout(() => {
      el.focus();
    }, 500);
  }
};

export default focus;
