import { useState } from "react";
import axios from "axios";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function Quotes() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getQuote = async () => {
    try {
      setError("");
      setLoading(true);
      setQuote(null);

      const res = await axios.get("https://infohub-backend-3.onrender.com/api/quotes/");
      if (res.data.error) {
        setError(res.data.error);
        setLoading(false);
        return;
      }

      setQuote(res.data);
      setLoading(false);
    } catch {
      setError("Unable to fetch quote. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-purple-700 mb-5 text-center">
        Motivational Quote
      </h2>

      {/* Fetch Button */}
      <button
        onClick={getQuote}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg 
                   transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Get Quote
      </button>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Loading Animation */}
      {loading && (
        <div className="mt-6 animate-pulse bg-purple-100 h-24 rounded-lg"></div>
      )}

      {/* Quote Display */}
      {quote && (
        <div
          className="mt-6 p-5 bg-purple-50 rounded-xl shadow-md text-center 
                     animate-[fadeIn_0.5s_ease-in-out]"
        >
          <FaQuoteLeft className="text-purple-400 text-3xl mx-auto mb-2" />

          <p className="italic text-lg text-gray-800 leading-relaxed">
            {quote.quote}
          </p>

          <FaQuoteRight className="text-purple-400 text-3xl mx-auto mt-2" />

          <p className="mt-3 text-purple-700 font-semibold">
            — {quote.author}
          </p>
        </div>
      )}
    </div>
  );
}
