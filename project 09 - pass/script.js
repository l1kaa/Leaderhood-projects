let slider = document.getElementById("slider")
let sliderValue = document.querySelector("h4")

let level = document.getElementById("level")
let levels = document.querySelectorAll(".level")

let checkBoxes = document.querySelectorAll(".checkbox")

slider.addEventListener("input", () => {
    sliderValue.textContent = slider.value
    events()
})

checkBoxes.forEach(e => {
    e.addEventListener("click", () => {
        events()
    })
})

function getColors(count, color, text) {
    for (let i = 0; i < count; i++) {
        levels[i].style.backgroundColor = color
        level.textContent = text
    }

    if (count === 0) {
        level.textContent = ""
    }

    for (let i = count; i < 4; i++) {
        levels[i].style.backgroundColor = "#24232C"
    }
}

function events() {
    const checked = checkedCount(checkBoxes)
    const sliderValue = slider.value


    if (checked == 0) {
        getColors(0, "#24232C", "")
    }
    else if ((checked === 1 && sliderValue < 6) | (checked === 2 && sliderValue < 6)) {
        getColors(1, "#F64A4A", "TOO WEAK!")
    }
    else if ((checked === 2 || sliderValue < 6) || (checked === 4 && sliderValue < 6)) {
        getColors(2, "#FB7C58", "WEAK")
    }
    else if (checked === 3 || (checked >= 3 && sliderValue >= 5 && sliderValue < 8)) {
        getColors(3, "#F8CD65", "MEDIUM")
    }
    else if (checked === 4 && sliderValue > 7) {
        getColors(4, "#A4FFAF", "STRONG")
    }

}

function checkedCount(boxes) {
    let count = 0
    boxes.forEach(e => {
        if (e.checked) {
            count++
        }
    })

    return count
}

function passwordGenerator(u, l, n, s, sl) {
    if (checkedCount(checkBoxes) === 0) {
        return ""
    }

    let div = Math.floor(sl / checkedCount(checkBoxes))
    let randomASCII
    let list = []

    if (s) {
        for (let i = 0; i < div; i++) {
            randomASCII = Math.floor(Math.random() * (47 - 33 + 1)) + 33
            list.push(String.fromCharCode(randomASCII))
        }
    }

    if (n) {
        for (let i = 0; i < div; i++) {
            randomASCII = Math.floor(Math.random() * (57 - 48 + 1)) + 48
            list.push(String.fromCharCode(randomASCII))
        }
    }

    if (l) {
        for (let i = 0; i < div; i++) {
            randomASCII = Math.floor(Math.random() * (122 - 97 + 1)) + 97
            list.push(String.fromCharCode(randomASCII))
        }
    }

    if (u) {
        for (let i = 0; i < div; i++) {
            randomASCII = Math.floor(Math.random() * (90 - 65 + 1)) + 65
            list.push(String.fromCharCode(randomASCII))
        }
    }

    let remainingChars = sl - list.length

    while (remainingChars > 0) {
        let randomType = Math.floor(Math.random() * 4)
        let randomChar
        if (randomType === 0 && s) {
            randomChar = String.fromCharCode(Math.floor(Math.random() * (47 - 33 + 1)) + 33)
        } else if (randomType === 1 && n) {
            randomChar = String.fromCharCode(Math.floor(Math.random() * (57 - 48 + 1)) + 48)
        } else if (randomType === 2 && l) {
            randomChar = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97)
        } else if (randomType === 3 && u) {
            randomChar = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
        }
        if (randomChar) {
            list.push(randomChar)
            remainingChars--
        }
    }

    let shuffledList = []

    while (list.length > 0) {
        let randomIndex = Math.floor(Math.random() * list.length)
        shuffledList.push(list[randomIndex])
        list.splice(randomIndex, 1)
    }

    return shuffledList.join("")
}

let button = document.querySelector("button")
let h1 = document.querySelector("h1")

button.addEventListener("click", () => {
    let upperCheck = document.getElementById("upper").checked
    let lowerCheck = document.getElementById("lower").checked
    let numbersCheck = document.getElementById("num").checked
    let symbolsCheck = document.getElementById("sym").checked
    let sliderValue = document.querySelector("#slider").value

    h1.textContent = passwordGenerator(upperCheck, lowerCheck, numbersCheck, symbolsCheck, parseInt(sliderValue))
    console.log(passwordGenerator(upperCheck, lowerCheck, numbersCheck, symbolsCheck, parseInt(sliderValue)))
    h1.style.opacity = 1
})


let copy = document.getElementById("copy")

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
}

let copied = document.querySelector("h5")

copy.addEventListener("click", () => {
    let passwordText = document.querySelector("h1").textContent
    copied.style.visibility = "visible"
    setTimeout(() => {
        copied.style.visibility = "hidden"
    }, 1500);
    copyToClipboard(passwordText)
})