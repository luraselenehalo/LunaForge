export const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

export const navigate = (path) => {
  window.location.href = path;
};
