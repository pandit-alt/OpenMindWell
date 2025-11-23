import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get current session
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Helper to get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper to sign in anonymously
export async function signInAnonymously() {
  const { data, error } = await supabase.auth.signInAnonymously();
  return { data, error };
}

// Helper to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Helper to create user profile
export async function createProfile(userId: string, nickname: string, avatar: string) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      nickname,
      avatar,
    })
    .select()
    .single();

  return { data, error };
}

// Helper to get user profile
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}
