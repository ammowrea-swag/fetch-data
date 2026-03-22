const url ="https://data.cityofnewyork.us/resource/rsgh-akpg.json?$limit=15&$offset=0&$order=DateofBite DESC,Breed";
console.log(url);
const response =await fetch(url);
const dogs = await response.json();
console.log(dogs);

const title = "Dog Bites in NYC";

let count = 0;