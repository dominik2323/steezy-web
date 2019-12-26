import scrollToElement from 'scroll-to-element';

export const scrollTo = id => {
  let el = document.getElementById(id);
  scrollToElement(el, { offset: 0, duration: 1500 });
};
