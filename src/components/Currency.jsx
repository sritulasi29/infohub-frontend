import { useState } from "react";
import axios from "axios";

// Currency symbols
const symbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

export default function Currency() {
  const [fromCurr, setFromCurr] = useState("INR");
  const [toCurr, setToCurr] = useState("USD");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const convertCurrency = async () => {
    try {
      setError("");
      setData(null);

      if (!fromCurr || !toCurr || !amount) {
        setError("Please fill all fields.");
        return;
      }

      const res = await axios.get(
        `http://127.0.0.1:8000/api/convert/?from=${fromCurr}&to=${toCurr}&amount=${amount}`
      );

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      setData(res.data);
    } catch {
      setError("Unable to convert currency. Check values and try again.");
      setData(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Currency Converter</h2>

      {/* From Currency */}
      <label className="font-semibold text-gray-700">From</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={fromCurr}
        onChange={(e) => setFromCurr(e.target.value)}
      >
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>

      {/* To Currency */}
      <label className="font-semibold text-gray-700">To</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={toCurr}
        onChange={(e) => setToCurr(e.target.value)}
      >
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2 rounded mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Convert Button */}
      <button
        onClick={convertCurrency}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Convert
      </button>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Result */}
      {data && (
        <div className="mt-5 bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-green-700 mb-3">
            Conversion Result
          </h3>

          <p><strong>From:</strong> {symbols[data.from.toUpperCase()]} {data.from.toUpperCase()}</p>
          <p><strong>To:</strong> {symbols[data.to.toUpperCase()]} {data.to.toUpperCase()}</p>
          <p><strong>Amount:</strong> {amount}</p>

          <p className="mt-2 text-lg">
            <strong>Converted:</strong>{" "}
            <span className="font-bold text-green-800">
              {symbols[data.to.toUpperCase()]} {data.converted_amount.toFixed(2)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
