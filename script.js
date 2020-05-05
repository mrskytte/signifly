"use strict";
import "@babel/polyfill";
import createCards from "./createCards";

const endpoint = "https://frontend-028f.restdb.io";
const apiKey = "5e958922436377171a0c2357";
let teamMembers = [];
let selectedMembers = [];

window.addEventListener("load", init);

function init() {
  fetchData();
  activateCreateTeamBtn();
}

async function fetchData() {
  const data = await fetch(`${endpoint}/rest/team-members`, {
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
  console.log("called");
  let test = document.querySelectorAll(".active");
  test.forEach((card) => {
    const currentMember = teamMembers.filter((tm) => tm._id === card.id);
    selectedMembers.push(currentMember[0]);
  });
  const team = {
    name: clientName,
    members: selectedMembers,
  };
  postTeam(team);
}

async function postTeam(data) {
  const postData = JSON.stringify(data);
  const posting = await fetch(`${endpoint}/rest/clients`, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  });
  const response = await posting.json();
  window.location = `/team.html?client=${response.name}&id=${response._id}`;
  console.log(response);
}
