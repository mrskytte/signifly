"use strict";
import "@babel/polyfill";
import createCards from "./createCards";

const endpoint = "https://frontend-028f.restdb.io/rest/clients/";
const apiKey = "5e958922436377171a0c2357";
let client = "";
let clientID = "";

window.addEventListener("load", init);

function init() {
  client = searchURL("client");
  clientID = searchURL("id");
  fetchTeam();
  setClientName(client);
  console.log(client, clientID);
}

function searchURL(data) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const result = urlParams.get(data);
  return result;
}

function setClientName() {
  document.querySelector(".title>.clientname").textContent = client;
}

async function fetchTeam() {
  const data = await fetch(`${endpoint}${clientID}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  });
  const response = await data.json();
  handleData(response.members);
}

function handleData(members) {
  members.forEach(createCards);
  removeEmptySections();
}

function removeEmptySections() {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    if (section.childNodes[3].childNodes.length === 0) {
      section.classList.add("hide");
    }
  });
}
