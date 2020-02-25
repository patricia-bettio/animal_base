"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");
    loadJSON();
    // TODO: Add evefilterList()
    document.querySelector("[data-filter='cat']").addEventListener("click", filterCats);
    document.querySelector("[data-filter='dog']").addEventListener("click", filterDogs);
    document.querySelector("[data-filter='*']").addEventListener("click", filterAll);
    //Sorting
    document.querySelector("[data-sort='name']").addEventListener("click", sortName);
    document.querySelector("[data-sort='type']").addEventListener("click", sortType);
    document.querySelector("[data-sort='desc']").addEventListener("click", sortDesc);
    document.querySelector("[data-sort='age']").addEventListener("click", sortAge);
}   

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
    //result = displayCats(animal);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}

//Function to display Cats only
function filterCats(){
    const onlyCats = allAnimals.filter(displayCats);
    displayList(onlyCats)
    function displayCats(animal){
    return animal.type === "cat";
        /*
        //testing
        if (animal.type === "cat"){
        console.log("its a cat")
        return result;
        } else {
        return false;
        }
        return result
        */
    } 
 } 

 //Function to display Dogs only
 function filterDogs(){
    const onlyDogs = allAnimals.filter(displayDogs);
    displayList(onlyDogs)
    function displayDogs(animal){
    return animal.type === "dog";
    }
 } 

 //Fuction to display all results
 function filterAll(){
    console.log(allAnimals)
    displayList(allAnimals)
 }
 
function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
    console.log(allAnimals)

    
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}

//SORTING
//sort by NAME
function sortName(){
if (event.target.dataset.sortDirection === "asc") {
    event.target.dataset.sortDirection = "desc";
    console.log("sort asc")
    nameAsc();
} else {
    console.log("sort desc")
    nameDesc();
    event.target.dataset.sortDirection = "asc";
}
}
//condition - ascending
function nameAsc(){
    console.log(allAnimals)
    function compareName(a, b){
    if(a.name < b.name) {
    return -1;
    } else if (a.name > b.name){
    return 1;
    }
    }   
    allAnimals.sort(compareName)
    displayList(allAnimals)
  }
//condition - descending
function nameDesc(){
    console.log(allAnimals)
    function compareName(a, b){
    if(a.name < b.name) {
    return 1;
    } else if (a.name > b.name){
    return -1;
    }
    }   
    allAnimals.sort(compareName)
    displayList(allAnimals)
  }

//sort by TYPE
function sortType(){
    if (event.target.dataset.sortDirection === "asc") {
        event.target.dataset.sortDirection = "desc";
        console.log("sort asc")
        typeAsc();
    } else {
        console.log("sort desc")
        typeDesc();
        event.target.dataset.sortDirection = "asc";
    }
    }
//condition - ascending
function typeAsc(){
    console.log(allAnimals)
    function compareName(a, b){
    if(a.type < b.type) {
    return -1;
    } else if (a.type > b.type){
    return 1;
    }
    }   
    allAnimals.sort(compareName)
    displayList(allAnimals)
  }
//condition - descending
function typeDesc(){
    console.log(allAnimals)
    function compareName(a, b){
    if(a.type < b.type) {
    return 1;
    } else if (a.type > b.type){
    return -1;
    }
    }   
    allAnimals.sort(compareName)
    displayList(allAnimals)
  }

//sort by DESCRIPTION
function sortDesc(){
    if (event.target.dataset.sortDirection === "asc") {
        event.target.dataset.sortDirection = "desc"
        descAsc();
    } else {
        descDesc();
        event.target.dataset.sortDirection = "asc"
    }
    }
//condition - ascending
function descAsc(){
    function compareAge(a, b){
    if(a.desc < b.desc) {
    return -1;
    } else if (a.desc > b.desc){
    return 1;
    }
    }   
    allAnimals.sort(compareAge)
    displayList(allAnimals)
  }
//condition - descending
function descDesc(){
    function compareAge(a, b){
    if(a.desc < b.desc) {
    return 1;
    } else if (a.desc > b.desc){
    return -1;
    }
    }   
    allAnimals.sort(compareAge)
    displayList(allAnimals)
  }

//sort by AGE
  function sortAge(){
    if (event.target.dataset.sortDirection === "asc") {
        event.target.dataset.sortDirection = "desc"
        ageAsc();
    } else {
        ageDesc();
        event.target.dataset.sortDirection = "asc"
    }
    }
//condition - ascending
function ageAsc(){
    function compareAge(a, b){
    if(a.age < b.age) {
    return -1;
    } else if (a.age > b.age){
    return 1;
    }
    }   
    allAnimals.sort(compareAge)
    displayList(allAnimals)
  }
//condition - descending
function ageDesc(){
    function compareAge(a, b){
    if(a.age < b.age) {
    return 1;
    } else if (a.age > b.age){
    return -1;
    }
    }   
    allAnimals.sort(compareAge)
    displayList(allAnimals)
  }