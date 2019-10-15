export const scrollTo = id => {
  let el = document.getElementById(id);
  el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
};
