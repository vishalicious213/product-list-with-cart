import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")
let cart = []

// ⬇️ EVENT LISTENERS ⬇️

dessertsSection.addEventListener("click", manageCart)

// ⬇️ EVENT HANDLERS ⬇️

function manageCart(event) {
    let id = Number(event.target.id.split("-")[1])
    let itemInCart = cart.find(item => item.id === id)

    // handle Add to Cart button
    if (event.target.id.split("-")[0] === "btn") {
        if (!itemInCart) {
            cart.push({id: id, count: 1})
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
            <button id="btn-${dessert.id}" class="whiteButton"><img src="/img/icon-add-to-cart.svg">Add to Cart</button>
            <p class="dessert-category">${dessert.category}</p>
            <h3>${dessert.name}</h3>
            <p class="dessert-cost">$${dessert.price.toFixed(2)}</p>
        </section>
    `).join("")

    dessertsSection.innerHTML = dessertsToRender
}

function renderItemButtons(item) {
    const itemButtons = document.getElementById(`btn-${item.id}`)

    itemButtons.innerHTML = `
        <div class="itemButtons">
            <p id="sub-${item.id}" class="qty-btn">-</p>
            <p id="count-${item.id}">${item.count}</p>
            <p id="add-${item.id}" class="qty-btn">+</p>
        </div>
    `

    itemButtons.classList.add("redButton")
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
}

function decrementCartItem(id) {
    const itemInCartIndex = cart.findIndex(item => item.id === id)
    const itemCount = document.getElementById(`count-${id}`)

    if (itemInCartIndex !== -1) {
        cart[itemInCartIndex].count = cart[itemInCartIndex].count -1
        itemCount.innerText = cart[itemInCartIndex].count

        if (cart[itemInCartIndex].count === 0) {
            const button = document.getElementById(`btn-${id}`)
            button.innerHTML = `<img src="/img/icon-add-to-cart.svg">Add to Cart`
            button.classList.remove("redButton")
            cart.splice(itemInCartIndex, 1)
        }
    }
}

renderDesserts()