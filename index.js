import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")
const dessertsIDs = desserts.map(dessert => dessert.id)
let cart = []

// ⬇️ EVENT LISTENERS ⬇️

dessertsSection.addEventListener("click", manageCart)

// ⬇️ EVENT HANDLERS ⬇️

function manageCart(event) {
    let id = Number(event.target.id.split("-")[1])
    let itemInCart = cart.find(item => item.id === id)

    // console.log(id)
    
    // handle Add to Cart button
    if (event.target.id.split("-")[0] === "btn") {
        if (itemInCart) {
            console.log(itemInCart.id, id)
        } else {
            console.log(id, "not in cart")
            cart.push({id: id, count: 1})
            console.log(cart)
            renderItemButtons({id: id, count: 1})
        }
    }

    // handle + button
    if (event.target.id.split("-")[0] === "add") {
        console.log("add")
    }
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderDesserts() {
    dessertsSection.innerHTML = ""

    const dessertsToRender = desserts.map(dessert => `
        <section class="dessert-item">
            <img src=${dessert.image.mobile}>
            <button id="btn-${dessert.id}">Add to Cart</button>
            <p>${dessert.category}</p>
            <h3>${dessert.name}</h3>
            <p>${dessert.price}</p>
        </section>
    `).join("")

    dessertsSection.innerHTML = dessertsToRender
}

function renderItemButtons(item) {
    console.log(item)
    const itemButtons = document.getElementById(`btn-${item.id}`)
    console.log(itemButtons)
    console.log("renderItemButtons", item.id)

    itemButtons.innerHTML = `
        <div class="itemButtons">
            <p id="add-${item.id}">+</p>
            <p>${item.count}</p>
            <p>-</p>
        </div>
    `
}

function incrementCartItem(id) {
    let itemInCart = cart.find(item => item.id === id)
    itemInCart.count = itemInCart.count + 1
    console.log(cart)
}


console.log(desserts)
renderDesserts()