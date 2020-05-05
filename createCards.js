"use strict";
const endpoint = "https://frontend-028f.restdb.io";

export default function createCards(card) {
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

  if (copy.querySelector("button")) {
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
  }

  document.querySelector(`#${card.department}>.content`).appendChild(copy);
}
