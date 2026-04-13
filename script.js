const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let msg = document.querySelector(".msg");
for(let select of dropdowns){
    for(code in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        select.append(newoption);
        if(select.name === "from" && code === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            newoption.selected = "selected";
        }
    }
    select.addEventListener("change", (event) => {
        updateflag(event.target);
    });
}
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
const updateflag = (element) => {
    let newsrc = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    if(amount.value === "" || amount.value < 0){
        amount.value = 1;
    }
    let amtval = amount.val;
    let URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rates = data[fromcurr.value.toLowerCase()];
    console.log(rates);
    msg.innerText = `${amount.value} ${fromcurr.value} = ${rates[tocurr.value.toLowerCase()]*amount.value} ${tocurr.value}`;
});