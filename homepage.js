const url = "https://striveschool-api.herokuapp.com/api/product/";

const spinner = document.getElementsByClassName("spinner-border")[0];
const isLoading = (bool) => {
  if (bool) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.remove("d-block");
    spinner.classList.add("d-none");
  }
};

window.addEventListener("DOMContentLoaded", (e) => {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5MjUzMDdmMzA0NjAwMWFlNWExMzIiLCJpYXQiOjE3MjcyNDk0MDgsImV4cCI6MTcyODQ1OTAwOH0.0P0JTY0la6-y4PnL98Uj95qrOX8l17gY1kvrdBVlvT4",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella Fetch");
      }
    })
    .then((obj) => {
      console.log(obj);
      const row = document.getElementsByClassName("row")[0];
      obj.forEach((element) => {
        row.innerHTML += `
            <div class="col">
            <div class="card mb-5 mx-auto" style="width: 19rem;">
  <img src="${element.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.name}</h5>
    <p class="card-text">${element.description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Id:</strong> <span>${element._id}</span></li>
    <li class="list-group-item"><strong>Brand:</strong> ${element.brand}</li>
    <li class="list-group-item"><strong>Prezzo:</strong> ${element.price}$</li>
  </ul>
  <div class="card-body d-flex gap-1">
    <button type="button" class="btn detail btn-primary">Scopri di più</a>
    <button type="button" class="btn modify btn-warning">Modifica</a>
  </div>
</div>
            </div>
            `;
      });

      const detailBtn = Array.from(document.getElementsByClassName("detail"));
      console.log(detailBtn);

      detailBtn.forEach((e) => {
        e.addEventListener("click", (event) => {
          console.log(event.target.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].nextElementSibling.innerText);
        const id = event.target.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].nextElementSibling.innerText
        window.location.assign("./details.html?id=" + id)
        });
      });

      const modifyBtn = Array.from(document.getElementsByClassName("modify"));
      modifyBtn.forEach((e) => {
        e.addEventListener("click", (event) => {
          console.log(event.target.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].nextElementSibling.innerText);
        const id = event.target.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].nextElementSibling.innerText
        window.location.assign("./backoffice.html?id=" + id)
        });
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(isLoading(false));
});
