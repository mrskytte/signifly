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

  copy
    .querySelector("img")
    .setAttribute("src", `${endpoint}/media/${card.image[0]}`);
  copy.querySelector(".name").textContent = card.name;
  copy.querySelector(".position").textContent = card.position;
  copy.querySelector(".phone").textContent = card.phone;
  copy.querySelector(".email").textContent = card.email;
  copy.querySelector(".background").textContent = card.background;
  copy.querySelector(".link").setAttribute("href", `${card.link}`);
  copy.querySelector(".link-name").textContent = card.name.substring(
    0,
    card.name.indexOf(" ")
  );

  console.log(card);

  document.querySelector("#developers>.content").appendChild(copy);
}
