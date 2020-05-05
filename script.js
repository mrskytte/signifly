"use strict";
import "@babel/polyfill";

const endpoint = "https://frontend-028f.restdb.io/";
const apiKey = "5e958922436377171a0c2357";
let teamMembers = [];
let selectedMembers = [];

window.addEventListener("load", init);

function init() {
  fetchData();
  activateCreateTeamBtn();
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
  teamMembers = [...response];
  console.log(teamMembers);
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
  copy.querySelector(".card").setAttribute("id", card._id);
  copy.querySelector(".name").textContent = card.name;
  copy.querySelector(".position").textContent = card.position;
  copy.querySelector(".phone").textContent = card.phone;
  copy.querySelector(".phone").setAttribute("href", `tel: ${card.phone}`);
  copy.querySelector(".email").textContent = card.email;
  copy.querySelector(".email").setAttribute("href", `mailto: ${card.email}`);
  copy.querySelector(".background-info").textContent = card.background;

  copy.querySelector("button").addEventListener("click", (e) => {
    const btn = e.target;
    if (btn.dataset.state === "add") {
      btn.textContent = "REMOVE FROM TEAM";
      btn.parentNode.classList.add("active");
      btn.dataset.state = "remove";
    } else {
      btn.textContent = "ADD TO TEAM";
      btn.parentNode.classList.remove("active");
      btn.dataset.state = "add";
    }
  });

  document.querySelector(`#${card.department}>.content`).appendChild(copy);
}

function activateCreateTeamBtn() {
  const client = document.querySelector("#clientname");
  document
    .querySelector("#create")
    .addEventListener("click", () => checkInput(client));
  client.addEventListener("input", (e) => {
    if (e.target.value) {
      document.querySelector("#clientlabel").classList.remove("warning");
    } else {
      document.querySelector("#clientlabel").classList.add("warning");
    }
  });
}

function checkInput(client) {
  if (!client.value) {
    document.querySelector("#clientlabel").classList.add("warning");
    client.focus();
  } else {
    createTeam(client.value);
    showLoad();
  }
}

function showLoad() {
  document.querySelector("#create").textContent = "";
  document.querySelector("#create").classList.add("loading");
}

function createTeam(clientName) {
  let test = document.querySelectorAll(".active");
  test.forEach((card) => {
    const currentMember = teamMembers.filter((tm) => tm._id === card.id);
    selectedMembers.push(currentMember);
  });

  const team = {
    name: clientName,
    members: selectedMembers,
  };

  postTeam(team);
}

async function postTeam(data) {
  const postData = JSON.stringify(data);
  const posting = await fetch("https://frontend-028f.restdb.io/rest/clients", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
  const response = await posting.json();
  console.log(response);
}
