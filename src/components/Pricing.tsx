import React from "react";
import { Check, Star, Zap } from "lucide-react";
import { useLemon } from "../hooks/useLemonSqueezy";
const VARIANT_IDS = {
  PRO_MONTHLY: "YOUR_LEMON_VARIANT_ID",
};

const STORE_SUBDOMAIN = "yourstore";

const Pricing = () => {
  const { openCheckout, ready } = useLemon();

  const plans = [
    {
      name: "Free",
      price: "0",
      priceId: null,
      description: "Perfect for getting started",
      features: [
        "Basic formatting (bold, italic)",
        "5 custom templates",
        "Standard support",
        "Chrome extension access",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "9.99",
      priceId: VARIANT_IDS.PRO_MONTHLY,
      description: "For serious LinkedIn professionals",
      features: [
        "Advanced formatting tools",
        "Unlimited templates",
        "Analytics dashboard",
        "Priority support",
        "Custom branding",
        "Team collaboration",
        "Export features",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Start free and upgrade when you're ready for more advanced features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 animate-scale-in hover-lift group ${
                plan.popular
                  ? "border-2 border-[#0077B5] transform scale-105"
                  : "border border-gray-200"
              }`}
              style={{ animationDelay: `${(index + 3) * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
                  <div className="bg-[#0077B5] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} className="animate-pulse-gentle" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 group-hover:animate-pulse-gentle">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {plan.price === "0" ? "forever" : "/month"}
                  </span>
                </div>

                {plan.priceId ? (
                  <button
                    disabled={!ready}
                    onClick={() => openCheckout(plan.priceId!, STORE_SUBDOMAIN)}
                    className="w-full bg-[#0077B5] hover:bg-[#005f8f] text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover-scale"
                  >
                    {plan.popular && (
                      <Zap
                        size={20}
                        className="inline mr-2 group-hover:animate-bounce-gentle"
                      />
                    )}
                    <span className="group-hover:animate-bounce-gentle inline-block">
                      {plan.cta}
                    </span>
                  </button>
                ) : (
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover-scale">
                    <span className="group-hover:animate-bounce-gentle inline-block">
                      {plan.cta}
                    </span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center gap-3 animate-fade-in-up hover-scale"
                    style={{
                      animationDelay: `${(index + featureIndex + 5) * 100}ms`,
                    }}
                  >
                    <Check
                      size={20}
                      className="text-green-500 flex-shrink-0 animate-pulse-gentle"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in-up animate-delay-600">
          <p className="text-gray-600 mb-4">
            Try Pro free for 14 days, then $9.99/month. Cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span className="hover-scale">✓ 30-day money-back guarantee</span>
            <span className="hover-scale">✓ No setup fees</span>
            <span className="hover-scale">✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
