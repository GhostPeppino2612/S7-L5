const params = new URLSearchParams(window.location.search);
const pageId = params.get("id");
const url = pageId
  ? "https://striveschool-api.herokuapp.com/api/product/" + pageId
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = pageId ? "PUT" : "POST";
console.log(method);

window.addEventListener("DOMContentLoaded", () => {
  console.log("RESOURCE ID: " + pageId);
  console.log("RESOURCE ID: " + pageId);

  document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
      name: document.getElementById("nome").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("image").value,
      price: document.getElementById("price").value,
    };

    fetch(url, {
      method: method,
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5MjUzMDdmMzA0NjAwMWFlNWExMzIiLCJpYXQiOjE3MjcyNDk0MDgsImV4cCI6MTcyODQ1OTAwOH0.0P0JTY0la6-y4PnL98Uj95qrOX8l17gY1kvrdBVlvT4",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((createdProduct) => {
        if (pageId) {
          alert("Risorsa con id: " + createdProduct._id + " MODIFICATA con successo!");
        } else {
          alert("Risorsa con id: " + createdProduct._id + " CREATA con successo!");
          e.target.reset();
        }
      })
      .catch((err) => console.log(err));
  });

  const btnSubmit = document.querySelector("button[type='submit']");
  const subtitle = document.getElementById("subtitle");

  if (pageId) {
    subtitle.innerText = "— Modifica un Prodotto";
    const icon = document.getElementById("icon");
    icon.innerHTML = "<i class='fa-solid fa-square-pen'></i>";
    btnSubmit.classList.remove("btn-primary");
    btnSubmit.classList.add("btn-success");
    btnSubmit.innerText = "Modifica";
    const delBtn = document.querySelector(".btn-danger");
    delBtn.addEventListener("click", (e) => {
      const hasConfirmed = confirm("vuoi eliminare il prodotto?");

      if (hasConfirmed) {
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5MjUzMDdmMzA0NjAwMWFlNWExMzIiLCJpYXQiOjE3MjcyNDk0MDgsImV4cCI6MTcyODQ1OTAwOH0.0P0JTY0la6-y4PnL98Uj95qrOX8l17gY1kvrdBVlvT4",
          },
        })
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Errore nella fetch");
            }
          })
          .then((deletedObj) => {
            alert("Risorsa: " + deletedObj.name + " Eliminata con successo!");
            window.location.assign("./homepage.html");
          })
          .catch((err) => console.log(err));
      }
    });
    delBtn.classList.remove("d-none");

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
          throw new Error("Errore nella fetch");
        }
      })
      .then((prodToModify) => {
        const { name, description, brand, imageUrl, price } = prodToModify;

        document.getElementById("nome").value = name;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price;
        document.getElementById("brand").value = brand;
        document.getElementById("image").value = imageUrl;
      })
      .catch((err) => console.log(err));
  } else {
    subtitle.innerText = "— Crea un nuovo Prodotto";
  }
});
