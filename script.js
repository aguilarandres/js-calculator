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
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
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
    // execute computation and append the operation symbol when a value has previously been computed
    if(this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {

    let computation
    // convert String to a Number
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    // do not compute if there are no values
    if(isNaN(prev) || isNaN(current)) return

    switch(this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
      } // switch END

      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
  } // compute function END

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    // append operation symbol to the end of numeric value
    if(this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.previousOperand} ${this.operation}`
    }
  }
} // class Calculator END

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')

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

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
