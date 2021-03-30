let breads = [];
const addBread =()=>{
    let quantity = document.querySelector("#quantity").value;
    quantity = parseInt(quantity);
    let name = document.querySelector("#name").value;
    let price = document.querySelector("#price").value;
    price = parseInt(price);
    let description = document.querySelector("#description").value;

    let bread = [quantity, name, price, description];
    breads.push(bread);
    
    let index = breads.length - 1;

    let table = document.querySelector(".breads-container");

    let row = document.createElement("TR");
    row.setAttribute("class", "breads-container__tr");
    
    let tdQ = document.createElement("TD");
    tdQ.setAttribute("class", "breads-container__tr-td");
    tdQ.setAttribute("id", `${"quant" + index}`);
    tdQ.appendChild(document.createTextNode(breads[index][0]));

    let tdN = document.createElement("TD");
    tdN.setAttribute("class", "breads-container__tr-td");
    tdN.setAttribute("id", `${"nam" + index}`);
    tdN.appendChild(document.createTextNode(breads[index][1]));

    let tdP = document.createElement("TD");
    tdP.setAttribute("class", "breads-container__tr-td");
    tdP.setAttribute("id", `${"pri" + index}`);
    tdP.appendChild(document.createTextNode(breads[index][2]));
    

    let tdD = document.createElement("TD");
    tdD.setAttribute("class", "breads-container__tr-td");
    tdD.setAttribute("id", `${"desc" + index}`);
    tdD.appendChild(document.createTextNode(breads[index][3]));
    

    row.appendChild(tdQ);
    row.appendChild(tdN);
    row.appendChild(tdP);
    row.appendChild(tdD);

    table.appendChild(row);

    let select = document.querySelector("#searching");

    let option = document.createElement("OPTION");
    option.appendChild(document.createTextNode(name));
    option.setAttribute("value", index);
    option.setAttribute("id", `${"option" + index}`);

    select.appendChild(option);
};

const buyBread =() =>{  
    let breadSelection = document.querySelector("#searching");
    let bread = breadSelection.value;
    parseInt(bread);
    let option = document.querySelector(`#${"option" + bread}`);

    let quantity = breads[bread][0];
    let name = breads[bread][1];
    let price = breads[bread][2];
    let description = breads[bread][3]

    let quantityChose = document.querySelector("#quantityChose").value;

    if(quantityChose <= quantity){
        let rest = quantity - quantityChose;
        breads[bread].splice(0, quantity, rest, name, price, description);
        alert(`Comprando ${quantityChose} ${name}...`);
        let body = document.getElementById("body");
        body.style.cursor = "progress";
        let time = console.time();
        if (time = 5){
            console.timeEnd();
            body.style.cursor = "default";
            alert(`Compra de ${quantity} ${name} hecha con exito!`);
        };
        document.querySelector(`#${"quant"+bread}`).innerHTML = rest;
    } else if (quantityChose > quantity) {

        alert(`Lo siento, no tenemos ${quantityChose} ${name} en estos momentos... Solo quedan ${quantity}`);
        let decide = prompt(`Quieres comprar los ${quantity} ${name} que quedan? S-Si, N-No`);
        if (decide == "S"){
            
            let row = document.querySelector(`#${"quant"+bread}`).parentNode;
            let table = row.parentNode;
            table.removeChild(row);

            alert(`Comprando ${breads[bread][0]} ${name}...`);
            let body = document.getElementById("body");
            body.style.cursor = "progress";
            let time = console.time();
            if (time = 5){
                console.timeEnd();
                body.style.cursor = "default";
                alert(`Compra de ${quantity} ${name} hecha con exito!`);
            };
            breads[bread].splice(0, quantity);       
            breadSelection.removeChild(option);       
        } else{
            alert("Ok esta bien");
        };
    }  else{
        alert("No es posible... Quizas no elegiste un pan o introduciste una cantida mayor a la disponible");
        return "failed";
    };
    showInformation(name, quantityChose, price, description);
};
const showInformation =(name, quantityChose, price, description)=>{
    let container = document.querySelector(".show-information-container");
    container.style.display = "block";    
    let information = `Has comprado: ${quantityChose} ${name}. <br><br> Pagaste: ${quantityChose * price}$. <br><br> Un ${name} es un ${description} `;
    document.querySelector("#information").innerHTML = information;
};