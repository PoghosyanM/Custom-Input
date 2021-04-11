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
    this.inputValue = 0;
    function arrowDownHandler() {
      const inputLastIndex = input.innerText.length - 1;
      let inputText = input.innerText;
      const inputLastValue = +input.innerText[inputLastIndex];

      if (inputLastValue === 0) {
        var x = +inputText.slice(inputLastIndex - 2);
        inputText =
          inputText < 0
            ? +inputText.slice(inputLastIndex - 1) + 1
            : inputText.slice(inputLastIndex - 1) - 1;
        // input.innerText = inputText;
        input.innerText = input.innerText.slice(0, inputLastIndex - 1) + inputText;
      } else if (input.innerText.length) {
        input.innerText =
          inputText.slice(0, inputLastIndex) +
          (inputText < 0 ? inputLastValue + 1 : inputLastValue - 1);
      } else if (!input.innerText.length) {
        input.innerText = -1;
      }
    }
    function arrowUpHandler() {
      const inputLastIndex = input.innerText.length - 1;
      let inputText = input.innerText;
      const inputLastValue = +input.innerText[inputLastIndex];
      if (inputLastValue === 9) {
        inputText = +inputText.slice(inputLastIndex - 1) + 1;
        input.innerText = input.innerText.slice(0, inputLastIndex - 1) + inputText;
      } else if (input.innerText.length) {
        input.innerText =
          inputText.slice(0, inputLastIndex) + (+input.innerText[inputLastIndex] + 1);
      } else if (!input.innerText.length) {
        input.innerText = 1;
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

    // input.oninput = function (event) {
    //   console.log(event.target.innerText);
    //   if (isNaN(+event.target.innerText)) {
    //     event.target.innerText = event.target.innerText.slice(0, event.target.innerText.length - 1);
    //   }
    // };
    shadowRoot.addEventListener("keypress", function (event) {
      console.log(event.key, "---");
    });
    input.onkeypress = function (event) {
      console.log(event);
      const eventKey = event.key;
      if (!aloowedSimbols.includes(eventKey)) {
        event.preventDefault();
        return false;
      }
    };
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
