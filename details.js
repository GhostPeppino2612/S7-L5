const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);
const pageId = params.get("id");

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
  fetch(url + pageId, {
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
      row.innerHTML += `
            <div class="col">
            <div class="card text-center mb-5 mx-auto w-100">
  <img src="${obj.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${obj.name}</h5>
    <p class="card-text">${obj.description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Id:</strong> <span>${obj._id}</span></li>
    <li class="list-group-item"><strong>Brand:</strong> ${obj.brand}</li>
    <li class="list-group-item"><strong>Prezzo:</strong> ${obj.price}$</li>
    <li class="list-group-item"><strong>Data inserimento:</strong> ${new Date(obj.createdAt).toLocaleString()}</li>
    <li class="list-group-item"><strong>Data modifica:</strong> ${new Date(obj.updatedAt).toLocaleString()}</li>
  </ul>
</div>
            </div>
            `;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(isLoading(false));
});
