let value = document.querySelector("h2")
let input = document.getElementById("input")

let check = document.getElementById("check")

let h4 = document.querySelector("h4")

check.addEventListener("input", () => {
    if (check.checked) {
        value.innerHTML = `$${15 * 12}.00 <span>/ year</span>`
    } else {
        value.innerHTML = `$${15}.00 <span>/ month</span>`
    }
})


input.addEventListener("input", () => {
    if (check.checked) {
        value.innerHTML = `$${input.value * 12}.00 <span>/ year</span>`
    } else {
        if (input.value <= 9) {
            value.innerHTML = `$0${input.value}.00 <span>/ month</span>`
        } else {
            value.innerHTML = `$${input.value}.00 <span>/ month</span>`
        }
    }

    h4.textContent = `${Math.ceil((100 / 15) * input.value)}K PAGEVIEWS`
})

let viewBill = document.querySelector(".views-bill")
let rangeContainer = document.querySelector(".range-container")

let cut = document.querySelector("h6")

function moveChild() {
    if (window.innerWidth <= 400) {
        cut.textContent = "25%"
    } else {
        cut.textContent = "25% discount"
    }
    if (window.innerWidth <= 600) {
        if (!viewBill.contains(input)) {
            viewBill.appendChild(input);
        }
    } else {
        if (!rangeContainer.contains(input)) {
            rangeContainer.appendChild(input);
        }
    }
}

moveChild()

window.addEventListener("resize", moveChild)
