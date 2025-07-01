import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we're in local storage mode
const isLocalMode = !supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === 'local_storage_mode' || 
  supabaseAnonKey === 'local_storage_mode' ||
  supabaseUrl === 'your_supabase_project_url' || 
  supabaseAnonKey === 'your_supabase_anon_key';

let supabase: any;

if (isLocalMode) {
  console.log('Running in local storage mode - Supabase not configured');
  
  // Create a mock Supabase client for local development
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: (callback: any) => {
        // Simulate successful login for demo
        setTimeout(() => {
          callback('SIGNED_IN', { 
            user: { 
              id: 'demo-user', 
              email: 'admin@dmhca.edu',
              user_metadata: { name: 'Demo Admin' }
            } 
          });
        }, 100);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signInWithPassword: ({ email, password }: { email: string; password: string }) => {
        // Simple demo authentication
        if (email === 'admin@dmhca.edu' && password === 'admin123') {
          return Promise.resolve({
            data: { 
              user: { 
                id: 'demo-user', 
                email: 'admin@dmhca.edu',
                user_metadata: { name: 'Demo Admin' }
              } 
            },
            error: null
          });
        }
        return Promise.resolve({
          data: { user: null },
          error: { message: 'Invalid credentials' }
        });
      },
      signOut: () => Promise.resolve({ error: null }),
      user: () => ({ id: 'demo-user', email: 'admin@dmhca.edu' })
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        order: (column: string, options?: any) => ({
          limit: (count: number) => Promise.resolve({ data: [], error: null })
        }),
        eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      insert: (data: any) => ({
        select: () => ({
          single: () => Promise.resolve({ 
            data: { ...data, id: Date.now().toString(), created_at: new Date().toISOString() }, 
            error: null 
          })
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ error: null })
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ error: null })
      })
    })
  };
} else {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Database types (kept for compatibility)
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          course_interest: string;
          source: string;
          status: string;
          assigned_counselor: string;
          priority: string;
          location: string | null;
          notes: string | null;
          whatsapp_number: string | null;
          preferred_language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          course_interest: string;
          source: string;
          status: string;
          assigned_counselor: string;
          priority: string;
          location?: string | null;
          notes?: string | null;
          whatsapp_number?: string | null;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          course_interest?: string;
          source?: string;
          status?: string;
          assigned_counselor?: string;
          priority?: string;
          location?: string | null;
          notes?: string | null;
          whatsapp_number?: string | null;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          name: string;
          category: string;
          price: number;
          duration: string;
          eligibility: string;
          description: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          price: number;
          duration: string;
          eligibility: string;
          description: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          price?: number;
          duration?: string;
          eligibility?: string;
          description?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      counselors: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          department: string;
          is_active: boolean;
          preferred_language: string;
          whatsapp_number: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          department: string;
          is_active?: boolean;
          preferred_language?: string;
          whatsapp_number?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          department?: string;
          is_active?: boolean;
          preferred_language?: string;
          whatsapp_number?: string | null;
          created_at?: string;
        };
      };
      follow_ups: {
        Row: {
          id: string;
          lead_id: string;
          date: string;
          note: string;
          counselor: string;
          next_reminder_date: string | null;
          completed: boolean;
          whatsapp_sent: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          date: string;
          note: string;
          counselor: string;
          next_reminder_date?: string | null;
          completed?: boolean;
          whatsapp_sent?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          date?: string;
          note?: string;
          counselor?: string;
          next_reminder_date?: string | null;
          completed?: boolean;
          whatsapp_sent?: boolean;
          created_at?: string;
        };
      };
      whatsapp_messages: {
        Row: {
          id: string;
          lead_id: string;
          phone_number: string;
          message: string;
          message_type: string;
          status: string;
          sent_at: string;
          delivered_at: string | null;
          read_at: string | null;
        };
        Insert: {
          id?: string;
          lead_id: string;
          phone_number: string;
          message: string;
          message_type: string;
          status?: string;
          sent_at?: string;
          delivered_at?: string | null;
          read_at?: string | null;
        };
        Update: {
          id?: string;
          lead_id?: string;
          phone_number?: string;
          message?: string;
          message_type?: string;
          status?: string;
          sent_at?: string;
          delivered_at?: string | null;
          read_at?: string | null;
        };
      };
    };
  };
}