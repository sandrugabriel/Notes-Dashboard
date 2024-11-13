function createLoginPage() {
  let container = document.querySelector(".container");

  container.innerHTML = ` 
  
    <div class="containers-login">


        <header class="header-container-login">

            <h2 class="text-style">My notes</h2>
            <p class="text-style">Save your note. Easily</p>
        </header>

        <div class="login-info">
            <p class="info-data">Email</p>
            <input class="txtEmail txt" type="text">

            <p class="info-data">Password</p>
            <input type="password" class="txtPass txt" minlength="8" required />
        </div>

        <div class="buttons-login">
            <button class="btnLogin btn-log">Login</button>
            <button class="btnSign btn-log">Sign Up</button>

        </div>

    </div>
  
  `;

  let btnLogin = document.querySelector(".btnLogin");
  btnLogin.addEventListener("click", (e) => {
    console.log("ASds");
    let txtEmail = document.querySelector(".txtEmail");
    let txtPass = document.querySelector(".txtPass");

    if (txtEmail.value != "" && txtPass.value != "") {
      if (verificationUser(txtEmail.value, txtPass.value)) {
        
      // console.log("intrat");
        // console.log("user: "+ userbyemail(txtEmail.value));
        createHomePage(userbyemail(txtEmail.value));
        cardsbydata(mynotesfromData(userbyemail(txtEmail.value)));
      }
    }
  });

  let btnSign = document.querySelector(".btnSign");
  btnSign.addEventListener("click", (e) => {
    createSignUpPage();
  });
}

function createSignUpPage() {
  let container = document.querySelector(".container");

  container.innerHTML = `
    
    <div class="containers-login">


        <header class="header-container-login">

            <h2 class="text-style">Sign up</h2>
            <p class="text-style">Save your note. Easily</p>
        </header>

        <div class="login-info">
            <p class="info-data">Name</p>
            <input class="txtName txt" type="text">

            <p class="info-data">Email</p>
            <input class="txtEmail txt" type="text">

            <p class="info-data">Password</p>
            <input type="password" class="txtPass txt" minlength="8" required />
        </div>

        <div class="buttons-login">
            <button class="btnSign btn-log">Sign Up</button>
            <button class="btnCancelSign btn-log">Cancel</button>

        </div>

    </div>


  
  `;

  let txtName = container.querySelector(".txtName");
  let txtEmail = container.querySelector(".txtEmail");
  let txtPass = container.querySelector(".txtPass");


  let btnSign = document.querySelector(".btnSign");
  btnSign.addEventListener("click",(e)=>{
    if(txtName.value != "" && txtEmail.value != "" && txtPass.value != "")
    createHomePage( createNewUser(txtName.value,txtName.value,txtPass.value));
    cardsbydata(mynotesfromData(userbyemail(txtEmail.value)));
  });

  let btnCancel = document.querySelector(".btnCancelSign");
  btnCancel.addEventListener("click", (e) => {
    createLoginPage();
  });
}

function verificationUser(txtemail, txtpass) {
  for (i = 0; i < users.length; i++) {
    if (users[i].email == txtemail && users[i].password == txtpass) {
      return true;
    }
  }

  return false;
}

function userbyemail(email) {
  for (i = 0; i < users.length; i++) {
    if (users[i].email == email) return users[i];
  }

  return null;
}

function notebyid(id){
  for(i=0;i<notesusers.length;i++){
    if(notesusers[i].id == id) return notesusers[i];
  }

  return null;
}

function mynotesfromData(user) {
  let mynotes = [];

  for (i = 0; i < user.notes.length; i++) {
    mynotes.push(notebyid(user.notes[i]));
  }
  console.log(mynotes);
  return mynotes;
}

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

function createHomePage(user) {
  let container = document.querySelector(".container");

  container.innerHTML = ` 
      <header class=" header-title-container">
        <h1>My notes</h1>
        <div class="log-out-container">
            <p class="name-user">${user.name}</p>
            <button class="btn-log-out btn-log">Log Out</button>
        </div>
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

                <button class="btnAddNotes btnAddNotespc">Add Notes</button>

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

    let btnlogout = document.querySelector(".btn-log-out");
    btnlogout.addEventListener("click",(e)=>{
      createLoginPage();
    });

  let selectCat = document.getElementById("menu");

  // console.log(selectCat);
  selectCat.addEventListener("change", (e) => {
    cardsbydata(loadDataforMenu(selectCat.value,user.notes));
  });

  let btnAdd = document.querySelector(".btnAddNotes");
  btnAdd.addEventListener("click", (e) => {
    // console.log("asd");
    let addcontainer = document.querySelector(".add-container");
    // console.log(addcontainer);
    addcontainer.style.display = "flex";
  });

  let btnAddpc = document.querySelector(".btnAddNotespc");
  btnAddpc.addEventListener("click", (e) => {
    let addcontainer = document.querySelector(".add-container");
    // console.log(addcontainer);
    addcontainer.style.display = "flex";
  });

  let btnCancel = document.querySelector(".btnCancel");
  btnCancel.addEventListener("click", (e) => {
    let addcontainer = document.querySelector(".add-container");
    addcontainer.style.display = "none";
  });

  let btnSave = document.querySelector(".btnSave");
  btnSave.addEventListener("click", (e) => {
    let addtitle = document.querySelector(".add-title");
    let adddate = document.querySelector(".add-date");
    let addcat = document.querySelector(".category");
    let adddesc = document.querySelector(".desc-card");

    let categorycard;
    if (addcat.value === "Important") {
      categorycard = "important";
    } else if (addcat.value === "Business") {
      categorycard = "business";
    } else if (addcat.value === "Social") {
      categorycard = "social";
    }

    if (
      addtitle.value == "" ||
      adddate.value == "" ||
      adddesc.value == "" ||
      categorycard == ""
    ) {
    } else {
      let card = {
        id: notesusers[notesusers.length - 1].id++,
        title: addtitle.value,
        date: adddate.value,
        descrpition: adddesc.value,
        category: categorycard,
      };

      notesusers.unshift(card);
      user.notes.push(card.id);
      console.log("test: "+ user);
      cardsbydata(mynotesfromIds(user.notes));

      let addcontainer = document.querySelector(".add-container");
      addcontainer.style.display = "none";
    }
  });

  let btnsmenu = document.querySelector(".buttons-container");
  btnsmenu.addEventListener("click", (e) => {
    // console.log("asd");
    let elem = e.target;
    // console.log(elem);
    let btnall = document.querySelector(".btnAll");
    let btnbusiness = document.querySelector(".btnBusiness");
    let btnsocial = document.querySelector(".btnSocial");
    let btnimportant = document.querySelector(".btnImportant");

    let btns = [btnall, btnbusiness, btnsocial, btnimportant];
    // console.log(btns);
    if (elem.classList.contains("btnAll")) {
      console.log("test");
      btnMenuFind(btns, btnall);
      cardsbydata(loadDataforMenu("All Notes",uesr.notes));
    } else if (elem.classList.contains("btnBusiness")) {
      btnMenuFind(btns, btnbusiness);
      cardsbydata(loadDataforMenu("Business",uesr.notes));
    } else if (elem.classList.contains("btnSocial")) {
      btnMenuFind(btns, btnsocial);
      cardsbydata(loadDataforMenu("Social",uesr.notes));
    } else if (elem.classList.contains("btnImportant")) {
      btnMenuFind(btns, btnimportant);
      cardsbydata(loadDataforMenu("Important",uesr.notes));
    }
  });
}

function mynotesfromIds(ids){
  let mynotes = [];
  for(i=0;i<ids.length;i++){
    for(j=0;j<notesusers.length;j++){
      if(notesusers[j].id == ids[i]) mynotes.push(notesusers[j]);
    }
  }

  return mynotes;
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

let loadDataforMenu = (name, noteids) => {
  let datamenu = [];
  let data = mynotesfromIds(noteids);
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
  for (i = 0; i < notesusers.length; i++) {
    if (notesusers[i].title == name) return notesusers[i];
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

function createNewUser(nameuser, emailuser, passuser) {
  let user = {
    id: users[users.length-1].id++,
    name: nameuser,
    email: emailuser,
    password: passuser,
    notes: []
  };

  for(i=0;i<users.length;i++){
    if(user.email == users[i].email){
      return null;
    }
  }

  users.push(user);
  return user;
}
