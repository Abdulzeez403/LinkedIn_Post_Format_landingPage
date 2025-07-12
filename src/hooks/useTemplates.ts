import { useState, useEffect } from 'react';
import { supabase, Template } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useTemplates = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchTemplates();
    } else {
      setTemplates([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTemplates = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .or(`user_id.eq.${user.id},is_public.eq.true`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (
    name: string,
    content: string,
    category: Template['category'],
    isPublic = false
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('templates')
        .insert([
          {
            user_id: user.id,
            name,
            content,
            category,
            is_public: isPublic,
            usage_count: 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setTemplates((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create template');
      throw err;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<Template>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('templates')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setTemplates((prev) =>
        prev.map((template) => (template.id === id ? data : template))
      );
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update template');
      throw err;
    }
  };

  const deleteTemplate = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      setTemplates((prev) => prev.filter((template) => template.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete template');
      throw err;
    }
  };

  const incrementUsageCount = async (id: string) => {
    try {
      const { error } = await supabase.rpc('increment_template_usage', {
        template_id: id,
      });

      if (error) throw error;
      
      // Update local state
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === id
            ? { ...template, usage_count: template.usage_count + 1 }
            : template
        )
      );
    } catch (err) {
      console.error('Failed to increment usage count:', err);
    }
  };

  const getTemplatesByCategory = (category: Template['category']) => {
    return templates.filter((template) => template.category === category);
  };

  const getUserTemplates = () => {
    return templates.filter((template) => template.user_id === user?.id);
  };

  const getPublicTemplates = () => {
    return templates.filter((template) => template.is_public && template.user_id !== user?.id);
  };

  return {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    incrementUsageCount,
    getTemplatesByCategory,
    getUserTemplates,
    getPublicTemplates,
    refetch: fetchTemplates,
  };
};