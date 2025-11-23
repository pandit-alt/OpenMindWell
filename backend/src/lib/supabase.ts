import { createClient } from '@supabase/supabase-js';
import config from '../config';

// Create Supabase client with service role key (for backend)
export const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Create Supabase client with anon key (for auth validation)
export const supabaseAnon = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

// Database Types
export interface Profile {
  user_id: string;
  nickname: string;
  avatar: string;
  is_moderator: boolean;
  created_at: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  created_at: string;
}

export interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  risk_level: 'none' | 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  profile?: Profile;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  mood: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  created_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
  notes: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'hotline' | 'article' | 'exercise' | 'video';
  created_at: string;
}

export interface Report {
  id: string;
  message_id: string;
  reported_by: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at: string;
}
