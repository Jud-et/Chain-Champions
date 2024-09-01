// js/script.js
function loadPage(page) {
  fetch(page)
      .then(response => response.text())
      .then(data => {
          document.getElementById('dynamic-content').innerHTML = data;
          updatePageTitle(page);
          window.history.pushState({ page: page }, '', page);
      })
      .catch(error => console.error('Error loading page:', error));
}

function updatePageTitle(page) {
  let title;
  switch (page) {
      case 'pages/proposal.html':
          title = 'EcoCity - Submit Your Proposal';
          break;
      case 'pages/vote.html':
          title = 'EcoCity - Vote';
          break;
      case 'pages/dashboard.html':
          title = 'EcoCity - Dashboard';
          break;
      case 'pages/login.html':
          title = 'EcoCity - Account';
          break;
      default:
          title = 'EcoCity - Empowering Communities';
  }
  document.title = title;
}

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname.split('/').pop();
  const page = path === '' || path === 'index.html' ? 'index.html' : path;
  loadPage(page);
});

window.onpopstate = function (event) {
  if (event.state && event.state.page) {
      loadPage(event.state.page);
  }
};


'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
}); 

