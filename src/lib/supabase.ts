import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
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