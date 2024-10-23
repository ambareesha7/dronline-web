const idle = 3000;
let timer;
let state = false;
let callback;

const setTimer = binding => {
  timer = setTimeout(() => {
    state = false;
    callback(false);
    clearTimeout(timer);
  }, idle);
};

const mousemove = (e, binding) => {
  if (!state) {
    state = true;
    callback(true);
  }
  clearTimeout(timer);
  setTimer(binding);
};

const mousemoveWithIdle = {
  inserted: (el, binding) => {
    callback = binding.value;
    el.addEventListener('mousemove', mousemove);
  },

  unbind: el => {
    el.removeEventListener('mousemove', mousemove);
  }
};

export default mousemoveWithIdle;
