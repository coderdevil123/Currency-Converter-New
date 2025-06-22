class CurrencyConverter {
  constructor() {
    this.exchangeRates = {}
    this.loading = false
    this.currencySymbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      AUD: "A$",
      CAD: "C$",
      CHF: "CHF",
      CNY: "¥",
      INR: "₹",
      KRW: "₩",
      MXN: "$",
      SGD: "S$",
      NZD: "NZ$",
      NOK: "kr",
      SEK: "kr",
    }

    this.currencyNames = {
      USD: "US Dollar",
      EUR: "Euro",
      GBP: "British Pound",
      JPY: "Japanese Yen",
      AUD: "Australian Dollar",
      CAD: "Canadian Dollar",
      CHF: "Swiss Franc",
      CNY: "Chinese Yuan",
      INR: "Indian Rupee",
      KRW: "South Korean Won",
      MXN: "Mexican Peso",
      SGD: "Singapore Dollar",
      NZD: "New Zealand Dollar",
      NOK: "Norwegian Krone",
      SEK: "Swedish Krona",
    }

    this.initializeElements()
    this.attachEventListeners()
    this.fetchExchangeRates("USD")
  }

  initializeElements() {
    this.elements = {
      amount: document.getElementById("amount"),
      fromCurrency: document.getElementById("from-currency"),
      toCurrency: document.getElementById("to-currency"),
      swapBtn: document.getElementById("swap-btn"),
      convertBtn: document.getElementById("convert-btn"),
      errorAlert: document.getElementById("error-alert"),
      errorMessage: document.getElementById("error-message"),
      loading: document.getElementById("loading"),
      result: document.getElementById("result"),
      resultFrom: document.getElementById("result-from"),
      resultValue: document.getElementById("result-value"),
      resultRate: document.getElementById("result-rate"),
      lastUpdated: document.getElementById("last-updated"),
      updateTime: document.getElementById("update-time"),
    }
  }

  attachEventListeners() {
    this.elements.amount.addEventListener("input", () => this.handleAmountChange())
    this.elements.fromCurrency.addEventListener("change", () => this.handleFromCurrencyChange())
    this.elements.toCurrency.addEventListener("change", () => this.handleToCurrencyChange())
    this.elements.swapBtn.addEventListener("click", () => this.swapCurrencies())
    this.elements.convertBtn.addEventListener("click", () => this.convertCurrency())

    // Auto-convert on input
    this.elements.amount.addEventListener("input", () => {
      if (this.elements.amount.value && this.exchangeRates[this.elements.toCurrency.value]) {
        this.convertCurrency()
      }
    })
  }

  async fetchExchangeRates(baseCurrency) {
    this.setLoading(true)
    this.hideError()

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }

      const data = await response.json()
      this.exchangeRates = data.rates
      this.updateLastUpdated(data.date)

      // Auto-convert if amount is present
      if (this.elements.amount.value) {
        this.convertCurrency()
      }
    } catch (error) {
      this.showError("NEURAL LINK DISRUPTED: Unable to access quantum exchange matrix")
      console.error("Exchange rate fetch error:", error)
    } finally {
      this.setLoading(false)
    }
  }

  convertCurrency() {
    const amount = Number.parseFloat(this.elements.amount.value)
    const fromCurrency = this.elements.fromCurrency.value
    const toCurrency = this.elements.toCurrency.value

    if (isNaN(amount) || amount <= 0) {
      this.showError("INVALID INPUT: Please enter valid quantum currency units")
      return
    }

    if (fromCurrency === toCurrency) {
      this.showResult(amount, fromCurrency, toCurrency, 1)
      return
    }

    if (this.exchangeRates[toCurrency]) {
      const rate = this.exchangeRates[toCurrency]
      const convertedAmount = amount * rate
      this.showResult(convertedAmount, fromCurrency, toCurrency, rate)
      this.hideError()
    } else {
      this.showError("EXCHANGE PROTOCOL ERROR: Currency pair not found in quantum database")
    }
  }

  swapCurrencies() {
    const fromValue = this.elements.fromCurrency.value
    const toValue = this.elements.toCurrency.value

    this.elements.fromCurrency.value = toValue
    this.elements.toCurrency.value = fromValue

    this.hideResult()
    this.fetchExchangeRates(toValue)
  }

  showResult(convertedAmount, fromCurrency, toCurrency, rate) {
    const amount = this.elements.amount.value
    const fromName = this.currencyNames[fromCurrency]
    const toSymbol = this.currencySymbols[toCurrency]

    this.elements.resultFrom.textContent = `${amount} ${fromName}`
    this.elements.resultValue.textContent = `${toSymbol}${convertedAmount.toFixed(2)} ${toCurrency}`
    this.elements.resultRate.textContent = `Exchange Rate: 1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}`

    this.elements.result.classList.remove("hidden")
  }

  hideResult() {
    this.elements.result.classList.add("hidden")
  }

  showError(message) {
    this.elements.errorMessage.textContent = message
    this.elements.errorAlert.classList.remove("hidden")
  }

  hideError() {
    this.elements.errorAlert.classList.add("hidden")
  }

  setLoading(isLoading) {
    this.loading = isLoading

    if (isLoading) {
      this.elements.loading.classList.remove("hidden")
      this.elements.convertBtn.disabled = true
      this.elements.convertBtn.querySelector(".button-text").textContent = "Accessing Quantum Matrix..."
      this.elements.convertBtn.querySelector(".button-icon").className = "fas fa-spinner loading-icon"
    } else {
      this.elements.loading.classList.add("hidden")
      this.elements.convertBtn.disabled = false
      this.elements.convertBtn.querySelector(".button-text").textContent = "Initialize Conversion"
      this.elements.convertBtn.querySelector(".button-icon").className = "fas fa-globe button-icon"
    }
  }

  updateLastUpdated(dateString) {
    const date = new Date(dateString)
    this.elements.updateTime.textContent = date.toLocaleString()
    this.elements.lastUpdated.classList.remove("hidden")
  }

  handleAmountChange() {
    if (this.elements.amount.value && this.exchangeRates[this.elements.toCurrency.value]) {
      this.convertCurrency()
    }
  }

  handleFromCurrencyChange() {
    this.hideResult()
    this.fetchExchangeRates(this.elements.fromCurrency.value)
  }

  handleToCurrencyChange() {
    if (this.elements.amount.value && this.exchangeRates[this.elements.toCurrency.value]) {
      this.convertCurrency()
    }
  }
}

// Initialize the currency converter when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CurrencyConverter()
})
