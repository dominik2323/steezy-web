export const scrollTo = id => {
  const el = document.getElementById(id);
  el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  // window.scrollTo({
  //   behavior: 'smooth',
  //   top: el.offsetTop
  // });
};
