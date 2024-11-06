function cardbydata(note, notes) {
  let card = document.createElement("div");
  card.classList = "card-note";

  card.innerHTML = `
      <div class="side-stick"></div>
      <div class="card-info">
          <div class="card-title-date">
              <h2 class="h1-card">${note.title}</h2>
              <p class="p-card">${note.date}</p>
          </div>
          <div id="cerc"></div>
      </div>
      <p class="desc-card">${note.descrpition}</p>
      <div class="card-favorite">                            
          <img class="star" src="/assets/img/starblack.png" alt="star">    
          <img class="delete" src="/assets/img/trash.png" alt="delete">    
      </div>
    `;

  let cat = card.querySelector("#cerc");

  if (note.category === "important") {
    cat.style.backgroundColor = "red";
    card.style.border = "1px solid red";
  } else if (note.category === "business") {
    cat.style.backgroundColor = "aquamarine";
    card.style.border = "1px solid aquamarine";
  } else if (note.category === "social") {
    cat.style.backgroundColor = "aqua";
    card.style.border = "1px solid aqua";
  }

  let deleteCard = card.querySelector(".delete");
  deleteCard.addEventListener("click", (e) => {
    deletenote(notebyname(note.title), notes);
    cardsbydata(notes);
  });

  // console.log(deleteCard);

  let favoriteCard = card.querySelector(".star");
  favoriteCard.addEventListener("click", (e) => {
    let elem = e.target;
    // console.log(elem.src);
    if (elem.alt == "star") {
      elem.src = "/assets/img/staryellow.png";
      elem.alt = "staryellow";
    } else if (elem.alt == "staryellow") {
      elem.alt = "star";
      elem.src = "/assets/img/starblack.png";
    }
  });

  return card;
}

function deletenote(note, notes) {
  //   console.log(note);
  //   console.log(notes);

  let indexToDelete = notes.findIndex((notedata) => notedata.id == note.id);
  //   console.log(indexToDelete);
  notes.splice(indexToDelete, 1);
}

function createHomePage() {
  let container = document.querySelector(".container");

  container.innerHTML = ` 
    
    <header>
        <h1>My notes</h1>
    </header>

    <main>

        <div class="menu-container">
            <div class="menu-mobile">
                <select id="menu">
                    <option value="All Notes">All Notes</option>
                    <option value="Business">Business</option>
                    <option value="Social">Social</option>
                    <option value="Important">Important</option>

                </select>

                <button class="btnAddNotes">Add Notes</button>

            </div>

            <div class="menu-pc">

                <div class="buttons-container">
                     <button class="btnMenu btnAll">All Notes</button>
                    <button class="btnMenu btnBusiness">Business</button>
                    <button class="btnMenu btnSocial">Social</button>
                    <button class="btnMenu btnImportant">Important</button>
                </div>

                <button class="btnAddNotes">Add Notes</button>

            </div>

        </div>

        <div class="add-container">

            <div class="card-note card-add">
                <div class="side-stick"></div>
                <div class="card-info">
                    <div class="card-title-date">
                        <input class="h1-card add-title" type="text" placeholder="Title">
                        <input class="p-card add-date" type="text" placeholder="Date">
                    </div>

                    <select class="category">
                        <option value="Business">Business</option>
                        <option value="Social">Social</option>
                        <option value="Important">Important</option>
                    </select>

                </div>

                <input class="desc-card" type="text" placeholder="Description" aria-multiline="true">
                <div class="card-save">
                    <button class="btnCancel btns">Cancel</button>
                    <button class="btnSave btns">Save</button>
                </div>

            </div>

        </div>

        <div class="notes-container">

        </div>

    </main>

    `;
}

function cardsbydata(notes) {
  let notescontaienr = document.querySelector(".notes-container");
  notescontaienr.innerHTML = ``;
  for (i = 0; i < notes.length; i++) {
    let card = cardbydata(notes[i], notes);
    notescontaienr.appendChild(card);
    //   console.log("sd");
  }
}

let loadDataforMenu = (name) => {
  let datamenu = [];
  let dim = data.length - 1;
  if (name == "All Notes") {
    return data;
  }

  for (i = dim; i >= 0; i--) {
    if (data[i].category == name.toLowerCase()) {
      datamenu.push(data[i]);
    }
  }

  //   console.log(datamenu);
  return datamenu;
};

const notebyname = (name) => {
  for (i = 0; i < data.length; i++) {
    if (data[i].title == name) return data[i];
  }
};

function btnMenuFind(btns, btn) {
  // console.log(btns);
  for (i = 0; i < btns.length; i++) {
    btns[i].style.backgroundColor = "white";
    btns[i].style.color = "#007BFF";
    // console.log("ASd");
    // console.log(btns[i]);
    if (btns[i].textContent == btn.textContent) {
      btns[i].style.backgroundColor = "#007BFF";
      btns[i].style.color = "white";
    }
  }
}
