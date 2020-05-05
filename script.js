"use strict";
import "@babel/polyfill";

const endpoint = "https://frontend-028f.restdb.io/";
const apiKey = "5e958922436377171a0c2357";

window.addEventListener("load", init);

function init() {
  fetchData();
}

async function fetchData() {
  const data = await fetch(`${endpoint}rest/team-members`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  const response = await data.json();
  handleData(response);
}

function handleData(data) {
  data.forEach(createCards);
}

function createCards(card) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector(
    ".card"
  ).style.backgroundImage = `url(${endpoint}/media/${card.image[0]})`;
  copy.querySelector(".name").textContent = card.name;
  copy.querySelector(".position").textContent = card.position;
  copy.querySelector(".phone").textContent = card.phone;
  copy.querySelector(".phone").setAttribute("href", `tel: ${card.phone}`);
  copy.querySelector(".email").textContent = card.email;
  copy.querySelector(".email").setAttribute("href", `mailto: ${card.email}`);
  copy.querySelector(".background-info").textContent = card.background;

  copy
    .querySelector("button")
    .addEventListener("click", (e) =>
      e.target.parentNode.classList.add("active")
    );

  document.querySelector(`#${card.department}>.content`).appendChild(copy);
}
