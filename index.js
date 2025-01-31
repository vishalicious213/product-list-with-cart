import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")
const cartSummary = document.getElementById("cart-summary")
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
            renderCartSummary()
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

// ⬇️ HELPER FUNCTIONS ⬇️

function incrementCartItem(id) {
    const itemInCart = cart.find(item => item.id === id)
    const itemCount = document.getElementById(`count-${id}`)

    if (!itemInCart) {
        cart.push({id: id, count: 1})
    } else {
        itemInCart.count = itemInCart.count + 1
    }

    itemCount.innerText = itemInCart.count
    renderCartSummary()
}

function decrementCartItem(id) {
    const itemInCartIndex = cart.findIndex(item => item.id === id)
    const itemCount = document.getElementById(`count-${id}`)
    const img = document.getElementById(`img-${id}`)

    if (itemInCartIndex !== -1) {
        cart[itemInCartIndex].count = cart[itemInCartIndex].count -1
        itemCount.innerText = cart[itemInCartIndex].count

        if (cart[itemInCartIndex].count === 0) {
            const button = document.getElementById(`btn-${id}`)
            button.innerHTML = `<img src="/img/icon-add-to-cart.svg">Add to Cart`
            button.classList.remove("redButton")
            img.classList.remove("red-border")
            cart.splice(itemInCartIndex, 1)
        }
    }

    renderCartSummary()
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderDesserts() {
    dessertsSection.innerHTML = ""

    const dessertsToRender = desserts.map(dessert => `
        <section class="dessert-item">
            <img id="img-${dessert.id}" src=${dessert.image.mobile}>
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
    const img = document.getElementById(`img-${item.id}`)

    itemButtons.innerHTML = `
        <div class="itemButtons">
            <p id="sub-${item.id}" class="qty-btn">-</p>
            <p id="count-${item.id}">${item.count}</p>
            <p id="add-${item.id}" class="qty-btn">+</p>
        </div>
    `

    itemButtons.classList.add("redButton")
    img.classList.add("red-border")
}

function renderCartSummary() {
    cartSummary.innerHTML = ""

    const cartCount = cart.reduce((total, item) => total + item.count, 0)
    let orderTotal = 0
    
    const cartContents = cart.map(item => {
        const dessertItem = desserts.find(dessert => dessert.id === item.id)
        orderTotal += dessertItem.price * item.count

        return `
            <section class="cart-summary-item">
                <div>
                    <h3>${dessertItem.name}</h3>
                    <div class="cart-summary-item-details">
                        <p class="cart-summary-item-count">${item.count}x</p>
                        <p class="cart-summary-item-price">@ ${dessertItem.price.toFixed(2)}</p>
                        <p class="cart-summary-item-total">$${(dessertItem.price * item.count).toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-summary-item-delete">
                    <img src="/img/icon-remove-item.svg">
                </div>
            </section>
        `
    }).join("")

    cartSummary.innerHTML += `
        <h2>Your Cart (${cartCount})</h2>
        <section>${cartContents}</section>
        <div class="order-total">
            <p class="order-total-label">Order Total</p>
            <p class="order-total-price">$${orderTotal.toFixed(2)}</p>
        </div>
        <div class="carbon-neutral">
            <img src="/img/icon-carbon-neutral.svg">
            <p>This is a <span>carbon-neutral</span> delivery</p>
        </div>
        <button id="cart-summary-confirm-btn" class="cart-summary-confirm-btn">Confirm Order</button>
    `
}

renderDesserts()
renderCartSummary()