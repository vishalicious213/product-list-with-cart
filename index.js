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
        incrementCartItem(id)
    }

    // handle - button
    if (event.target.id.split("-")[0] === "sub") {
        decrementCartItem(id)
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
            <p id="count-${item.id}">${item.count}</p>
            <p id="sub-${item.id}">-</p>
        </div>
    `
}

function incrementCartItem(id) {
    const itemInCart = cart.find(item => item.id === id)
    const itemCount = document.getElementById(`count-${id}`)

    if (!itemInCart) {
        cart.push({id: id, count: 1})
    } else {
        itemInCart.count = itemInCart.count + 1
    }

    itemCount.innerText = itemInCart.count
    // console.log(cart)
}

function decrementCartItem(id) {
    const itemInCartIndex = cart.findIndex(item => item.id === id)
    const itemCount = document.getElementById(`count-${id}`)

    if (itemInCartIndex !== -1) {
        cart[itemInCartIndex].count = cart[itemInCartIndex].count -1
        itemCount.innerText = cart[itemInCartIndex].count

        if (cart[itemInCartIndex].count === 0) {
            const button = document.getElementById(`btn-${id}`)
            button.innerHTML = "Add to Cart"
            cart.splice(itemInCartIndex, 1)
        }
    }
    // console.log(cart)
}


console.log(desserts)
renderDesserts()