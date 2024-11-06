createHomePage();
cardsbydata(data);

let selectCat = document.getElementById("menu");

// console.log(selectCat);
selectCat.addEventListener("change", (e) => {
  cardsbydata(loadDataforMenu(selectCat.value));
});

let btnAdd = document.querySelector(".btnAddNotes");
btnAdd.addEventListener("click", (e) => {
    console.log("asd");
  let addcontainer = document.querySelector(".add-container");
  console.log(addcontainer);
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

  if(addtitle.value == "" || adddate.value=="" || adddesc.value=="" || categorycard==""){
    
  }else{
    let card = {
        id: data[data.length - 1].id++,
        title: addtitle.value,
        date: adddate.value,
        descrpition: adddesc.value,
        category: categorycard,
      };
    
      data.unshift(card);
    
      cardsbydata(data);
    
      let addcontainer = document.querySelector(".add-container");
      addcontainer.style.display = "none";
    
  }

 
});


let btnsmenu = document.querySelector(".buttons-container");
btnsmenu.addEventListener("click",(e)=>{
    // console.log("asd");
    let elem = e.target;
    // console.log(elem);
    let btnall = document.querySelector(".btnAll");
    let btnbusiness = document.querySelector(".btnBusiness");
    let btnsocial = document.querySelector(".btnSocial");
    let btnimportant = document.querySelector(".btnImportant");

    let btns = [btnall,btnbusiness,btnsocial,btnimportant];
    // console.log(btns);
    if(elem.classList.contains("btnAll")){
        console.log("test");
        btnMenuFind(btns,btnall);
        cardsbydata(loadDataforMenu("All Notes"));
    }else if(elem.classList.contains("btnBusiness")){
        btnMenuFind(btns,btnbusiness);
        cardsbydata(loadDataforMenu("Business"));
    }else if(elem.classList.contains("btnSocial")){
        btnMenuFind(btns,btnsocial);
        cardsbydata(loadDataforMenu("Social"));
    }else if(elem.classList.contains("btnImportant")){
        btnMenuFind(btns,btnimportant);
        cardsbydata(loadDataforMenu("Important"));
    }

});