import desserts from "/data.js"

const dessertsSection = document.getElementById("desserts")

// ⬇️ EVENT LISTENERS ⬇️

// ⬇️ EVENT HANDLERS ⬇️

// ⬇️ RENDER FUNCTIONS ⬇️

function renderDesserts() {
    dessertsSection.innerHTML = ""

    const dessertsToRender = desserts.map(dessert => `
        <h3>${dessert.name}<h3>
    `).join("")

    dessertsSection.innerHTML = dessertsToRender
}


console.log(desserts)
renderDesserts()