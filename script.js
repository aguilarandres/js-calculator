class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement  = currentOperandTextElement
    this.clear() // set all inputs to default values as soon as object is instantiated
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {

  }

  append(number) {
    // check for decimal pointer
    if(number === '.' && this.currentOperand.includes('.')) return

    // convert to string so that input value is appended
    this.currentOperand = this.currentOperand.toString() + number.toString()

  }

  selectOperation(operation) {
    // check that there is a value to operate on
    if(this.currentOperand === '') return
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {

  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
  }
} // class Calculator END

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperation(button.innerText)
    calculator.updateDisplay()
  })
})
