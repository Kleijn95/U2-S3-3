fetch("https://striveschool-api.herokuapp.com/books")
  .then((responseArr) => {
    console.log(responseArr);

    if (responseArr.ok) {
      return responseArr.json();
    }
  })
  .then((bookArr) => {
    console.log(bookArr);
    const row = document.getElementById("book-list");
    for (let index = 0; index < bookArr.length; index++) {
      const element = bookArr[index];
      console.log(element);
      const col = document.createElement("div");
      col.classList.add("col-3");

      const divCard = document.createElement("div");
      divCard.classList.add("card");

      const cardImg = document.createElement("img");
      cardImg.classList.add("card-img-top");
      cardImg.src = element.img;
      cardImg.alt = "...";

      const divBody = document.createElement("div");
      divBody.classList.add("card-body");

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.innerText = element.title;

      const p = document.createElement("p");
      p.classList.add("card-text");
      p.innerText = element.price + "$";

      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("btn", "btn-dark");
      button.innerText = "Scarta";

      button.addEventListener("click", function () {
        col.classList.add("d-none");
      });

      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.classList.add("btn", "btn-success", "ms-2");
      submitButton.innerText = "Aggiungi al Carrello";

      submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        // event.target.elements - non funzionava
        const cardBody = event.target.closest(".card-body"); // Trova il contenitore della card
        const title = cardBody.querySelector(".card-title").innerText; // Trova il titolo
        const price = cardBody.querySelector(".card-text").innerText; // Trova il prezzo

        const bookCart = document.querySelector("ul");
        const listItem = document.createElement("li");
        listItem.innerText = `${title} - ${price}`;
        bookCart.appendChild(listItem);
      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.classList.add("btn", "btn-danger", "mt-2");
      deleteButton.innerText = "Rimuovi";

      deleteButton.addEventListener("click", function () {
        const cardBody = deleteButton.closest(".card-body");
        const title = cardBody.querySelector(".card-title").innerText;
        const price = cardBody.querySelector(".card-text").innerText;
        const itemToDelete = `${title} - ${price}`;

        const bookCart = document.querySelector("ul");
        const listItems = bookCart.querySelectorAll("li");

        // Cerca l'elemento corrispondente nella lista e rimuovilo
        listItems.forEach((li) => {
          if (li.innerText === itemToDelete) {
            li.remove(); // Rimuovi l'elemento dalla lista
          }
        });
      });

      col.appendChild(divCard);
      divCard.appendChild(cardImg);
      divCard.appendChild(divBody);
      divBody.appendChild(h5);
      divBody.appendChild(p);
      divBody.appendChild(button);
      divBody.appendChild(submitButton);
      divBody.appendChild(deleteButton);
      row.appendChild(col);
    }
  });
