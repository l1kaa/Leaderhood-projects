let buttons = document.querySelectorAll("button")
let h1 = document.querySelector("h1")
function isOperator(element) {
    return element === "+" || element === "-" || element === "x" || element === "/"
}
buttons.forEach(e => {
    e.addEventListener("click", () => {
        let content = e.textContent

        if (content !== "=" && content !== "DEL" && content !== "RESET" && h1.textContent === "0") {
            h1.textContent = ""
        }

        if (isOperator(content)) {
            if (h1.textContent === "" || h1.textContent === "0") {
                h1.textContent = "0"
                return
            }
            let lastChar = h1.textContent[h1.textContent.length - 2]
            if (!isOperator(lastChar)) {
                h1.textContent += ` ${content} `
            } else {
                h1.textContent = h1.textContent.slice(0, -3)
                h1.textContent += ` ${content} `
            }

        } else if (content === "=") {
            if (isOperator(h1.textContent.trim().slice(-1))) {
                h1.textContent = "ERROR"
                return
            }
            if (h1.textContent !== "ERROR") {
                let input = h1.textContent.split(" ")
                let answer = parseFloat(input[0])

                for (let i = 1; i < input.length; i++) {
                    if (input[i] === "+") {
                        answer += parseFloat(input[i + 1])
                    } else if (input[i] === "-") {
                        answer -= parseFloat(input[i + 1])
                    } else if (input[i] === "/") {
                        answer /= parseFloat(input[i + 1])
                    } else if (input[i] === "x") {
                        answer *= parseFloat(input[i + 1])
                    }
                }


                if (isNaN(answer)) {
                    h1.textContent = "ERROR"
                } else {
                    h1.textContent = answer
                }
            }

        } else if (content === "DEL") {
            if (h1.textContent.length === 1 || h1.textContent === "ERROR") {
                h1.textContent = "0"
            } else if (isOperator(h1.textContent[h1.textContent.length - 2])) {
                h1.textContent = h1.textContent.trimEnd().slice(0, -2)
            } else {
                h1.textContent = h1.textContent.trimEnd().slice(0, -1)
            }
        } else if (content == "RESET") {
            h1.textContent = "0"
        }
        else {
            h1.textContent += content
        }
    })
}
)