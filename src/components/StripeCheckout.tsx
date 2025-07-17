import React, { useState } from "react";
import { useStripe } from "../hooks/useLemonSqueezy";
import { PRICE_IDS } from "../lib/stripe";
import { Loader2, CreditCard } from "lucide-react";

interface StripeCheckoutProps {
  priceId: string;
  planName: string;
  price: string;
  customerEmail?: string;
  className?: string;
  children?: React.ReactNode;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  priceId,
  planName,
  price,
  customerEmail,
  className = "",
  children,
}) => {
  const { createCheckoutSession, loading, error } = useStripe();
  const [email, setEmail] = useState(customerEmail || "");

  const handleCheckout = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    await createCheckoutSession(priceId, email);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {!customerEmail && (
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B5] focus:border-transparent"
            placeholder="your@email.com"
            required
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading || !email}
        className={`w-full bg-[#0077B5] hover:bg-[#005885] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover-scale ${
          loading ? "animate-pulse" : ""
        }`}
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard size={20} />
            {children || `Subscribe to ${planName} - $${price}/month`}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Secure payment powered by Stripe
      </p>
    </div>
  );
};

export default StripeCheckout;
