import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { useTemplates } from '../hooks/useTemplates';
import { LogOut, Settings, BarChart3, FileText, Crown } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { userDetails, profile, loading } = useUserProfile();
  const { templates } = useTemplates();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B5]"></div>
      </div>
    );
  }

  const userTemplates = templates.filter(t => t.user_id === user?.id);
  const isPro = userDetails?.subscription_status === 'pro';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0077B5] to-[#005885] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.user_metadata?.full_name || 'User'}!
                </h1>
                <p className="text-gray-600">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  {isPro && <Crown size={16} className="text-yellow-500" />}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isPro ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isPro ? 'Pro Member' : 'Free Plan'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up animate-delay-200 hover-lift">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="text-[#0077B5]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {profile?.usage_stats?.posts_formatted || 0}
                </h3>
                <p className="text-gray-600">Posts Formatted</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up animate-delay-300 hover-lift">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {userTemplates.length}
                </h3>
                <p className="text-gray-600">Custom Templates</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up animate-delay-400 hover-lift">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {profile?.usage_stats?.templates_used || 0}
                </h3>
                <p className="text-gray-600">Templates Used</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Templates */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up animate-delay-500">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Templates</h2>
            <button className="bg-[#0077B5] hover:bg-[#005885] text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Create New
            </button>
          </div>

          {userTemplates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTemplates.slice(0, 6).map((template) => (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow hover-lift"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="capitalize">{template.category}</span>
                    <span>{template.usage_count} uses</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
              <p className="text-gray-600 mb-4">Create your first template to get started</p>
              <button className="bg-[#0077B5] hover:bg-[#005885] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Create Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;