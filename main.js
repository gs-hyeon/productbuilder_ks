class LottoNumberGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: contents;
                }
                .number-ball {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(145deg, #ffafbd, #ffc3a0);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.8em;
                    font-weight: bold;
                    color: #fff;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.5);
                    transition: transform 0.3s ease, background 0.3s ease;
                }
                .number-ball:hover {
                    transform: translateY(-5px) scale(1.05);
                }
                /* Different colors for different number ranges for visual appeal */
                .ball-1-10 { background: linear-gradient(145deg, #a8c0ff, #3f2b96); } /* Blue */
                .ball-11-20 { background: linear-gradient(145deg, #84fab0, #8fd3f4); } /* Green/Cyan */
                .ball-21-30 { background: linear-gradient(145deg, #f093fb, #f5576c); } /* Pink/Red */
                .ball-31-40 { background: linear-gradient(145deg, #f7ff00, #db36a4); } /* Yellow/Magenta */
                .ball-41-45 { background: linear-gradient(145deg, #e0e0e0, #a0a0a0); } /* Grey */
            </style>
            <div class="number-ball"></div>
        `;
        this.numberBall = this.shadowRoot.querySelector('.number-ball');
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number') {
            this.updateNumber(newValue);
        }
    }

    updateNumber(number) {
        this.numberBall.textContent = number;
        this.numberBall.className = 'number-ball'; // Reset classes
        if (number >= 1 && number <= 10) {
            this.numberBall.classList.add('ball-1-10');
        } else if (number >= 11 && number <= 20) {
            this.numberBall.classList.add('ball-11-20');
        } else if (number >= 21 && number <= 30) {
            this.numberBall.classList.add('ball-21-30');
        } else if (number >= 31 && number <= 40) {
            this.numberBall.classList.add('ball-31-40');
        } else if (number >= 41 && number <= 45) {
            this.numberBall.classList.add('ball-41-45');
        }
    }
}

customElements.define('lotto-ball', LottoNumberGenerator);

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const lottoNumbersContainer = document.getElementById('lottoNumbers');

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayLottoNumbers() {
        const generatedNumbers = generateLottoNumbers();
        lottoNumbersContainer.innerHTML = ''; // Clear previous numbers

        generatedNumbers.forEach(num => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', num);
            lottoNumbersContainer.appendChild(lottoBall);
        });
    }

    // Initial display when page loads
    displayLottoNumbers();

    generateBtn.addEventListener('click', displayLottoNumbers);
});
