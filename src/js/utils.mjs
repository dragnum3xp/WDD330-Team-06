// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL query parameter
export function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// load header and footer partials
export async function loadHeaderFooter() {
  const header = document.querySelector("#header");
  const footer = document.querySelector("#footer");

  if (header) {
    const headerResponse = await fetch("/partials/header.html");
    header.innerHTML = await headerResponse.text();
  }

  if (footer) {
    const footerResponse = await fetch("/partials/footer.html");
    footer.innerHTML = await footerResponse.text();
  }
}
