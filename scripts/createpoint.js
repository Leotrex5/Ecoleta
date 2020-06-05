function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() })
    .then( states => {
        for(state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUfs()

function getCities(){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option> Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities =>{
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

    document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)

//itens de coleta

const itemsToCollect = document.querySelectorAll(".itemsgrid li")
for (item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    const alreadySelected = selectedItems.findIndex((item) => {
        return item == itemId
    })

    if(alreadySelected != -1){
        const filteredItems = selectedItems.filter( item =>{
            return item != itemId
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}