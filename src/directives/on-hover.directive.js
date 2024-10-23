let callback;
const mouseover = () => callback(true);
const mouseleave = () => callback(false);

const onHover = {
  inserted: (el, binding) => {
    callback = binding.value;
    el.addEventListener('mouseover', mouseover);
    el.addEventListener('mouseleave', mouseleave);
  },

  unbind: el => {
    el.removeEventListener('mouseover', mouseover);
    el.removeEventListener('mouseleave', mouseleave);
  }
};

export default onHover;
