import { useState, useEffect } from 'react';
import { supabase, User, UserProfile } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserDetails();
    } else {
      setProfile(null);
      setUserDetails(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        // Create default profile if it doesn't exist
        await createUserProfile();
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    }
  };

  const fetchUserDetails = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        // Create user record if it doesn't exist
        await createUserRecord();
      } else {
        setUserDetails(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const createUserRecord = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
            avatar_url: user.user_metadata?.avatar_url || '',
            subscription_status: 'free',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setUserDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user record');
    }
  };

  const createUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: user.id,
            preferences: {
              default_formatting: 'bold',
              auto_save: true,
              notifications: true,
            },
            usage_stats: {
              posts_formatted: 0,
              templates_used: 0,
              last_active: new Date().toISOString(),
            },
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  const updateSubscriptionStatus = async (
    status: 'free' | 'pro' | 'canceled',
    subscriptionId?: string,
    customerId?: string
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          subscription_status: status,
          subscription_id: subscriptionId,
          customer_id: customerId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setUserDetails(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update subscription');
      throw err;
    }
  };

  const incrementUsageStats = async (metric: 'posts_formatted' | 'templates_used') => {
    if (!user || !profile) return;

    try {
      const updatedStats = {
        ...profile.usage_stats,
        [metric]: profile.usage_stats[metric] + 1,
        last_active: new Date().toISOString(),
      };

      await updateProfile({
        usage_stats: updatedStats,
      });
    } catch (err) {
      console.error('Failed to increment usage stats:', err);
    }
  };

  return {
    profile,
    userDetails,
    loading,
    error,
    updateProfile,
    updateSubscriptionStatus,
    incrementUsageStats,
    refetch: () => {
      fetchUserProfile();
      fetchUserDetails();
    },
  };
};