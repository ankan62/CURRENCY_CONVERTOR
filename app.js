
 const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"

const dropdown = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("button");

const fromurl = document.querySelector('.form select')
const tourl = document.querySelector('.to select')
const messege = document.querySelector('.msg')

for(let select of dropdown){
for(code in countryList){
  let newoption = document.createElement("option");
  
  newoption.innerText=code;
  newoption.value = code;
  if(select.name==="from" && code==="USD"){
    newoption.selected = "selected";
  }
  else if(select.name==="to" && code==="INR"){
    newoption.selected = "selected";
  }
  select.append(newoption);
}
select.addEventListener("change" , (evt)=>{
  updateflag(evt.target)
})
}


const updateflag = (element)=>{
  let curcode=element.value;
  let countrycode = countryList[curcode];
  let srclink = `https://flagsapi.com/${countrycode}/flat/64.png`
  element.parentElement.querySelector("img").src=srclink;
}

btn.addEventListener("click",async (evvt)=>{
evvt.preventDefault();
let amount = document.querySelector(".amount input")
let amountvl =amount.value;
console.log(amountvl)
if(amountvl === "" || amountvl<1){
  amount.value="1";
  amountvl=1;
}
const URL = `${BASE_URL}${fromurl.value.toLowerCase()}.json`
let response = await fetch(URL);
let data = await response.json();
console.log(data)
 let rate = data[fromurl.value.toLowerCase()][tourl.value.toLowerCase()]
 console.log(rate)
let finalamount = (amount.value*rate).toFixed(2);
messege.innerText = `${amount.value} ${fromurl.value} = ${finalamount} ${tourl.value}`
});