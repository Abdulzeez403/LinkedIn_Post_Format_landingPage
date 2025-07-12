import React from 'react';
import { useStripe } from '../hooks/useStripe';
import { Settings, ExternalLink, Loader2 } from 'lucide-react';

interface SubscriptionManagerProps {
  customerId: string;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'incomplete';
  currentPlan: string;
  nextBillingDate?: string;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  customerId,
  subscriptionStatus,
  currentPlan,
  nextBillingDate,
}) => {
  const { createPortalSession, loading } = useStripe();

  const handleManageSubscription = () => {
    createPortalSession(customerId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'past_due':
        return 'text-yellow-600 bg-yellow-100';
      case 'canceled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Subscription Details</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current Plan:</span>
          <span className="font-semibold text-gray-900">{currentPlan}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscriptionStatus)}`}>
            {subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)}
          </span>
        </div>
        
        {nextBillingDate && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Next Billing:</span>
            <span className="font-semibold text-gray-900">
              {new Date(nextBillingDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleManageSubscription}
        disabled={loading}
        className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 hover-scale"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <Settings size={20} />
            Manage Subscription
            <ExternalLink size={16} />
          </>
        )}
      </button>
    </div>
  );
};

export default SubscriptionManager;