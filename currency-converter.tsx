"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight, Loader2, Zap, Globe, Activity } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ExchangeRates {
  [key: string]: number
}

interface CurrencyData {
  code: string
  name: string
  symbol: string
}

const popularCurrencies: CurrencyData[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
]

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({})
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<string>("")

  // Fetch exchange rates from API
  const fetchExchangeRates = async (baseCurrency: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }

      const data = await response.json()
      setExchangeRates(data.rates)
      setLastUpdated(new Date(data.date).toLocaleString())
    } catch (err) {
      setError("NEURAL LINK DISRUPTED: Unable to access quantum exchange matrix")
      console.error("Exchange rate fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Convert currency
  const convertCurrency = () => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("INVALID INPUT: Please enter valid quantum currency units")
      return
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(numAmount)
      return
    }

    if (exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency]
      const converted = numAmount * rate
      setConvertedAmount(converted)
      setError("")
    } else {
      setError("EXCHANGE PROTOCOL ERROR: Currency pair not found in quantum database")
    }
  }

  // Swap currencies
  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setConvertedAmount(null)
  }

  // Fetch rates when component mounts or base currency changes
  useEffect(() => {
    fetchExchangeRates(fromCurrency)
  }, [fromCurrency])

  // Auto-convert when amount or currencies change
  useEffect(() => {
    if (amount && exchangeRates[toCurrency]) {
      convertCurrency()
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates])

  const getExchangeRate = () => {
    if (fromCurrency === toCurrency) return 1
    return exchangeRates[toCurrency] || 0
  }

  const fromCurrencyData = popularCurrencies.find((c) => c.code === fromCurrency)
  const toCurrencyData = popularCurrencies.find((c) => c.code === toCurrency)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <Card className="w-full max-w-md shadow-2xl bg-slate-900/80 backdrop-blur-xl border-cyan-500/20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-lg"></div>

        <CardHeader className="text-center relative z-10">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            <div className="relative">
              <Zap className="h-8 w-8 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 h-8 w-8 bg-cyan-400/20 rounded-full blur-md"></div>
            </div>
            QUANTUM EXCHANGE
          </CardTitle>
          <CardDescription className="text-slate-300 font-mono text-sm">
            Neural Currency Conversion Matrix v2.1
          </CardDescription>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Activity className="h-4 w-4 text-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-mono">SYSTEM ONLINE</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {error && (
            <Alert className="bg-red-900/20 border-red-500/50 backdrop-blur-sm">
              <AlertDescription className="text-red-300 font-mono text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {/* Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-cyan-300 font-mono text-sm uppercase tracking-wider">
              Quantum Units
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-slate-400 font-mono text-lg h-12 focus:border-cyan-400 focus:ring-cyan-400/20 focus:ring-2 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-md pointer-events-none"></div>
            </div>
          </div>

          {/* From Currency */}
          <div className="space-y-3">
            <Label htmlFor="from-currency" className="text-cyan-300 font-mono text-sm uppercase tracking-wider">
              Source Protocol
            </Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger
                id="from-currency"
                className="bg-slate-800/50 border-cyan-500/30 text-white h-12 font-mono focus:border-cyan-400 focus:ring-cyan-400/20 focus:ring-2 transition-all duration-300"
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-cyan-500/30 backdrop-blur-xl">
                {popularCurrencies.map((currency) => (
                  <SelectItem
                    key={currency.code}
                    value={currency.code}
                    className="text-white hover:bg-cyan-500/20 focus:bg-cyan-500/20 font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-cyan-400">{currency.code}</span>
                      <span className="text-slate-300 text-sm">{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center py-2">
            <Button
              variant="outline"
              size="icon"
              onClick={swapCurrencies}
              disabled={loading}
              className="rounded-full h-12 w-12 bg-slate-800/50 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 relative group"
            >
              <ArrowLeftRight className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* To Currency */}
          <div className="space-y-3">
            <Label htmlFor="to-currency" className="text-purple-300 font-mono text-sm uppercase tracking-wider">
              Target Protocol
            </Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger
                id="to-currency"
                className="bg-slate-800/50 border-purple-500/30 text-white h-12 font-mono focus:border-purple-400 focus:ring-purple-400/20 focus:ring-2 transition-all duration-300"
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-500/30 backdrop-blur-xl">
                {popularCurrencies.map((currency) => (
                  <SelectItem
                    key={currency.code}
                    value={currency.code}
                    className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-purple-400">{currency.code}</span>
                      <span className="text-slate-300 text-sm">{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <Button
            onClick={convertCurrency}
            className="w-full h-14 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono text-lg uppercase tracking-wider transition-all duration-300 relative overflow-hidden group"
            disabled={loading || !amount}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            {loading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Accessing Quantum Matrix...
              </>
            ) : (
              <>
                <Globe className="mr-3 h-5 w-5" />
                Initialize Conversion
              </>
            )}
          </Button>

          {/* Result */}
          {convertedAmount !== null && !loading && (
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-lg p-6 text-center space-y-4 border border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse"></div>
              <div className="text-sm text-slate-400 font-mono uppercase tracking-wider relative z-10">
                {amount} {fromCurrencyData?.name} converts to
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono relative z-10">
                {toCurrencyData?.symbol}
                {convertedAmount.toFixed(2)} {toCurrency}
              </div>
              <div className="text-xs text-slate-500 font-mono relative z-10">
                Exchange Rate: 1 {fromCurrency} = {getExchangeRate().toFixed(6)} {toCurrency}
              </div>
              <div className="flex justify-center">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              </div>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <div className="text-xs text-center text-slate-500 font-mono">
              <span className="text-green-400">●</span> Matrix last synchronized: {lastUpdated}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
