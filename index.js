import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")

// ⬇️ EVENT LISTENERS ⬇️

dessertsSection.addEventListener("click", manageCart)

// ⬇️ EVENT HANDLERS ⬇️

function manageCart(event) {
    console.log(event.target.id)
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