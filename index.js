import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")
const cartSummary = document.getElementById("cart-summary")
const shoppingCart = document.getElementById("cart-container")
let cart = []

// ⬇️ EVENT LISTENERS ⬇️

dessertsSection.addEventListener("click", manageCart)
cartSummary.addEventListener("click", handleCartSummary)
shoppingCart.addEventListener("click", handleShoppingCart)

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

function handleCartSummary(event) {
    // handle delete in cart summary
    if (event.target.id.split("-")[0] === "del") {
        deleteCartItem(event.target.id.split("-")[1])
    }

    // handle click on confirm order button
    if (event.target.id === "cart-summary-confirm-btn") {
        const body = document.querySelector("body")
        body.classList.add("noscroll")
        window.scroll(0, 0)
        shoppingCart.classList.remove("hidden")
        renderShoppingCart()
    }
}

function handleShoppingCart(event) {
    // console.log(event)
    // handle click on start new order button (in modal)
    if (event.target.id === "new-order-btn") {
        clearCartContents()
        const body = document.querySelector("body")
        body.classList.remove("noscroll")
        shoppingCart.classList.add("hidden")
    }

    if (event.target.id === "stripe-btn") {
        console.log("stripe-btn")
    }

    if (event.target.id === "paypal-btn") {
        console.log("paypal-btn")
    }
}

// ⬇️ HELPER FUNCTIONS ⬇️

function clearCartContents() {
    cart = []
    renderCartSummary()

    document.querySelectorAll(".dessert-item > button").forEach(button => {
        const id = button.id.split("-")[1]
        const img = document.getElementById(`img-${id}`)

        button.innerHTML = `<img src="/img/icon-add-to-cart.svg">Add to Cart`
        button.classList.add("whiteButton")
        button.classList.remove("redButton")
        img.classList.remove('red-border')
    })
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
            button.classList.add("whiteButton")
            button.classList.remove("redButton")
            img.classList.remove("red-border")
            cart.splice(itemInCartIndex, 1)
        }
    }

    renderCartSummary()
}

function deleteCartItem(id) {
    const itemInCartIndex = cart.findIndex(item => item.id === Number(id))
    const button = document.getElementById(`btn-${id}`)
    const img = document.getElementById(`img-${id}`)
    
    cart.splice(itemInCartIndex, 1)
    button.innerHTML = `<img src="/img/icon-add-to-cart.svg">Add to Cart`
    button.classList.add("whiteButton")
    button.classList.remove("redButton")
    img.classList.remove("red-border")
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
            <button id="sub-${item.id}" class="qty-btn">-</button>
            <p id="count-${item.id}">${item.count}</p>
            <button id="add-${item.id}" class="qty-btn">+</button>
        </div>
    `

    itemButtons.classList.remove("whiteButton")
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
                    <img id="del-${item.id}" src="/img/icon-remove-item.svg">
                </div>
            </section>
        `
    }).join("")

    if (cart.length > 0) {
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
    } else {
        cartSummary.innerHTML = `
            <h2>Your Cart (${cartCount})</h2>
            <img class="empty-cart-img" src="/img/illustration-empty-cart.svg">
            <p class="empty-cart-txt">Your added items will appear here</p>
        `
    }
}

function renderShoppingCart() {
    shoppingCart.innerHTML = ""

    let orderTotal = 0
    
    const cartContents = cart.map(item => {
        const dessertItem = desserts.find(dessert => dessert.id === item.id)
        orderTotal += dessertItem.price * item.count

        return `
            <section class="shopping-cart-summary-item">
                <img src=${dessertItem.image.thumbnail}>
                <div>
                    <h3>${dessertItem.name}</h3>
                    <div class="shopping-cart-summary-item-details">
                        <p class="shopping-cart-summary-item-count">${item.count}x</p>
                        <p class="shopping-cart-summary-item-price">@ ${dessertItem.price.toFixed(2)}</p>
                    </div>
                </div>
                <p class="shopping-cart-summary-item-total">$${(dessertItem.price * item.count).toFixed(2)}</p>
            </section>
        `
    }).join("")
    
    shoppingCart.innerHTML = `
        <section id="shopping-cart" class="shopping-cart">
            <img class="order-confirmed" src="/img/icon-order-confirmed.svg">
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>
            <section class="cart-contents">${cartContents}</section>
            <div class="shopping-cart-total">
                <p class="shopping-cart-total-label">Order Total</p>
                <p id="shopping-cart-total-cost" class="shopping-cart-total-cost">$${orderTotal.toFixed(2)}</p>
            </div>

            <section class="pay-buttons">
                <button class="pay-btn">
                    <img id="stripe-btn" class="pay-btn-img" src="/img/pay.png">
                </button>
                <button class="pay-btn">
                    <img id="paypal-btn" class="pay-btn-img" src="/img/paypal.png">
                </button>
                <button id="new-order-btn" class="new-order-btn">Start New Order</button>
            </section>
        </section>
    `
}

renderDesserts()
renderCartSummary()