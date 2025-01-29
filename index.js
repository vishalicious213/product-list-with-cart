import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")
let cart = []

// ⬇️ EVENT LISTENERS ⬇️

dessertsSection.addEventListener("click", manageCart)

// ⬇️ EVENT HANDLERS ⬇️

function manageCart(event) {
    let id = Number(event.target.id)
    let itemInCart = cart.find(item => item.id === id)
    
    if (itemInCart) {
        console.log(itemInCart.id, id)
    } else {
        console.log(id, "not in cart")
        cart.push({id: Number(id), count: 1})
        renderItemButtons({id: Number(id), count: 1})
    }

    console.log(cart)
    console.log(itemInCart)
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderDesserts() {
    dessertsSection.innerHTML = ""

    const dessertsToRender = desserts.map(dessert => `
        <section class="dessert-item">
            <img src=${dessert.image.mobile}>
            <button id=${dessert.id}>Add to Cart</button>
            <p>${dessert.category}</p>
            <h3>${dessert.name}</h3>
            <p>${dessert.price}</p>
        </section>
    `).join("")

    dessertsSection.innerHTML = dessertsToRender
}

function renderItemButtons(item) {
    console.log(item)
    const itemButtons = document.getElementById(item.id)
    console.log(itemButtons)
    console.log("renderItemButtons", item.id)

    itemButtons.innerHTML = `
        <div>
            <p>+</p>
            <p>${item.count}</p>
            <p>-</p>
        </div>
    `
}


console.log(desserts)
renderDesserts()