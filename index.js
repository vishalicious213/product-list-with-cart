import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")
let cart = []

// ⬇️ EVENT LISTENERS ⬇️

dessertsSection.addEventListener("click", manageCart)

// ⬇️ EVENT HANDLERS ⬇️

function manageCart(event) {
    let id = event.target.id
    let itemInCart = cart.find(item => item.id === id)
    
    if (itemInCart) {
        console.log(itemInCart.id, id)
    } else {
        console.log(id, "not in cart")
        cart.push({id: id, count: 1})
    }

    console.log(cart)
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


console.log(desserts)
renderDesserts()