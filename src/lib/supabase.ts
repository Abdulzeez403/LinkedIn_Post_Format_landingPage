import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  subscription_status: 'free' | 'pro' | 'canceled';
  subscription_id?: string;
  customer_id?: string;
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  preferences: {
    default_formatting: string;
    auto_save: boolean;
    notifications: boolean;
  };
  usage_stats: {
    posts_formatted: number;
    templates_used: number;
    last_active: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  user_id: string;
  name: string;
  content: string;
  category: 'announcement' | 'question' | 'story' | 'tip' | 'custom';
  is_public: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  user_id: string;
  post_id: string;
  engagement_metrics: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  formatting_used: string[];
  created_at: string;
}