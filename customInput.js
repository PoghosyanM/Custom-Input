const template = document.createElement("template");
template.innerHTML = `
  <div id="wrapper" class="wrapper">
    <div contentEditable="true" id="input" class="input"></div>
    <div class="arrows-content">
      <span id="arrowUp" class="arrow-up"> > </span>
      <span id="arrowDown" class="arrow-down"> > </span>
    </div>
  </div>
`;

const aloowedSimbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

class AvatarInfo extends HTMLElement {
  constructor() {
    super();
    function arrowDownHandler() {
      const value = input.innerText;
      const valuePieces = value.split(".");
      const isFloat = valuePieces.length > 1;
      if (isFloat) {
        const leftSide = valuePieces[0] + ".";
        const rightSide = valuePieces[1].replace(/0+$/g, "");
        const count = (str) => {
          const re = /\b0+/;
          return str.match(re)?.[0]?.length || 0;
        };
        let startZerosLength = count(rightSide);
        // debugger;
        if (rightSide[rightSide.length - 1] == 1 && startZerosLength !== 0) {
          startZerosLength += 1;
        }
        if (rightSide[rightSide.length - 1] == 9 && rightSide.length === 1) {
          input.innerText = +leftSide + 1;
        } else {
          let result =
            leftSide +
            "0".repeat(startZerosLength) +
            String(+rightSide + (rightSide[rightSide.length - 1] == 1 ? "0" : "") - 1).replace(
              /0+$/g,
              ""
            );
          input.innerText = result;
        }
      } else {
        input.innerText = input.innerText - 1;
      }
    }
    function arrowUpHandler() {
      const value = input.innerText;
      const valuePieces = value.split(".");
      const isFloat = valuePieces.length > 1;
      if (isFloat) {
        const leftSide = valuePieces[0] + ".";
        const rightSide = valuePieces[1].replace(/0+$/g, "");
        const count = (str) => {
          const re = /\b0+/;
          return str.match(re)?.[0]?.length || 0;
        };
        let startZerosLength = count(rightSide);
        if (rightSide[rightSide.length - 1] == 9 && startZerosLength !== 0) {
          startZerosLength -= 1;
        }
        if (rightSide[rightSide.length - 1] == 9 && rightSide.length === 1) {
          input.innerText = +leftSide + 1;
        } else {
          let result =
            leftSide + "0".repeat(startZerosLength) + String(+rightSide + 1).replace(/0+$/g, "");
          input.innerText = result;
        }
      } else {
        input.innerText = +input.innerText + 1;
      }
    }

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));

    const wrapper = shadowRoot.getElementById("wrapper");
    const wrapperStyles = document.createElement("link");
    wrapperStyles.setAttribute("rel", "stylesheet");
    wrapperStyles.setAttribute("href", "./style.css");
    const input = shadowRoot.getElementById("input");
    const arrowUp = shadowRoot.getElementById("arrowUp");
    const arrowDown = shadowRoot.getElementById("arrowDown");

    arrowUp.addEventListener("click", arrowUpHandler);

    arrowDown.addEventListener("click", arrowDownHandler);

    input.addEventListener("change", (event) => {
      console.log(event.target.innerText);
    });

    input.addEventListener("keypress", function (event) {
      console.log(event);
      const eventKey = event.key;
      if (!aloowedSimbols.includes(eventKey)) {
        event.preventDefault();
        return false;
      }
    });

    input.addEventListener("keydown", function (event) {
      switch (event.key) {
        case "ArrowDown":
          arrowDownHandler();
          break;
        case "ArrowUp":
          arrowUpHandler();
          break;
        default:
          break;
      }
    });

    // input.innerText = "asasdas";
    wrapper.append(wrapperStyles);
  }

  connectedCallback() {}
}

customElements.define("custom-input", AvatarInfo);
