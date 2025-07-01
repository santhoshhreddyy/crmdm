import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lead, Course, User, FollowUp } from '../types';
import { sampleLeads, sampleCourses, sampleCounselors, sampleFollowUps } from '../data/sampleData';
import toast from 'react-hot-toast';

// Check if we're in local storage mode
const isLocalMode = !import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.VITE_SUPABASE_URL === 'local_storage_mode' ||
  import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url';

export function useDatabase() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);

  // Local storage keys
  const STORAGE_KEYS = {
    leads: 'dmhca_crm_leads',
    courses: 'dmhca_crm_courses',
    users: 'dmhca_crm_users',
    followUps: 'dmhca_crm_followups'
  };

  // Load data from local storage or sample data
  const loadLocalData = () => {
    try {
      const storedLeads = localStorage.getItem(STORAGE_KEYS.leads);
      const storedCourses = localStorage.getItem(STORAGE_KEYS.courses);
      const storedUsers = localStorage.getItem(STORAGE_KEYS.users);
      const storedFollowUps = localStorage.getItem(STORAGE_KEYS.followUps);

      setLeads(storedLeads ? JSON.parse(storedLeads) : sampleLeads);
      setCourses(storedCourses ? JSON.parse(storedCourses) : sampleCourses);
      setUsers(storedUsers ? JSON.parse(storedUsers) : sampleCounselors.map(c => ({
        ...c,
        role: 'counselor' as const,
        preferredLanguage: c.preferredLanguage || 'en',
        isActive: c.isActive,
        branch: 'Hyderabad'
      })));
      setFollowUps(storedFollowUps ? JSON.parse(storedFollowUps) : sampleFollowUps);
    } catch (error) {
      console.error('Error loading local data:', error);
      // Fallback to sample data
      setLeads(sampleLeads);
      setCourses(sampleCourses);
      setUsers(sampleCounselors.map(c => ({
        ...c,
        role: 'counselor' as const,
        preferredLanguage: c.preferredLanguage || 'en',
        isActive: c.isActive,
        branch: 'Hyderabad'
      })));
      setFollowUps(sampleFollowUps);
    }
  };

  // Save data to local storage
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Load all data
  const loadData = async () => {
    if (isLocalMode) {
      loadLocalData();
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [leadsResult, coursesResult, usersResult, followUpsResult] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('courses').select('*').order('name'),
        supabase.from('users').select('*').order('name'),
        supabase.from('follow_ups').select('*').order('date', { ascending: false })
      ]);

      if (leadsResult.error) throw leadsResult.error;
      if (coursesResult.error) throw coursesResult.error;
      if (usersResult.error) throw usersResult.error;
      if (followUpsResult.error) throw followUpsResult.error;

      const transformedLeads = leadsResult.data?.map((lead: any) => ({
        id: lead.id,
        fullName: lead.full_name || lead.fullName || lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        country: lead.country || '',
        qualification: lead.qualification || '',
        source: lead.source || '',
        status: lead.status || '',
        assignedTo: lead.assigned_to || lead.assignedTo || '',
        courseInterest: lead.course_interest || lead.courseInterest || '',
        priority: lead.priority || '',
        location: lead.location || '',
        notes: lead.notes || '',
        whatsappNumber: lead.whatsapp_number || '',
        preferredLanguage: lead.preferred_language || 'en',
        createdAt: lead.created_at,
        updatedAt: lead.updated_at,
        notesDate: lead.notes_date || ''
      })) || [];

      const transformedCourses = coursesResult.data?.map((course: any) => ({
        id: course.id,
        name: course.name,
        category: course.category as Course['category'],
        price: course.price,
        duration: course.duration,
        eligibility: course.eligibility,
        description: course.description,
        isActive: course.is_active
      })) || [];

      const transformedUsers = usersResult.data?.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        reportsTo: user.reports_to,
        department: user.department,
        isActive: user.is_active,
        preferredLanguage: user.preferred_language || 'en',
        whatsappNumber: user.whatsapp_number,
        createdAt: user.created_at,
        branch: user.branch || 'Hyderabad'
      })) || [];

      const transformedFollowUps = followUpsResult.data?.map((followUp: any) => ({
        id: followUp.id,
        leadId: followUp.lead_id,
        date: followUp.date,
        note: followUp.note,
        counselor: followUp.counselor,
        nextReminderDate: followUp.next_reminder_date,
        completed: followUp.completed,
        whatsappSent: followUp.whatsapp_sent,
        createdAt: followUp.created_at
      })) || [];

      setLeads(transformedLeads);
      setCourses(transformedCourses);
      setUsers(transformedUsers);
      setFollowUps(transformedFollowUps);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data, using local storage');
      loadLocalData();
    } finally {
      setLoading(false);
    }
  };

  // User CRUD
  const addUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      const newUser: User = { 
        ...userData, 
        id: Date.now().toString(), 
        createdAt: new Date().toISOString() 
      };

      if (isLocalMode) {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        saveToLocalStorage(STORAGE_KEYS.users, updatedUsers);
        toast.success('User added successfully!');
        return newUser;
      }

      const { data, error } = await supabase
        .from('users')
        .insert([{ ...userData }])
        .select()
        .single();

      if (error) throw error;

      const createdUser: User = { ...userData, id: data.id, createdAt: data.created_at };
      setUsers((prev: User[]) => [...prev, createdUser]);
      toast.success('User added successfully!');
      return createdUser;
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to add user');
      throw error;
    }
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      if (isLocalMode) {
        const updatedUsers = users.map(user => user.id === id ? { ...user, ...updates } : user);
        setUsers(updatedUsers);
        saveToLocalStorage(STORAGE_KEYS.users, updatedUsers);
        toast.success('User updated successfully!');
        return;
      }

      const { error } = await supabase
        .from('users')
        .update({ ...updates })
        .eq('id', id);

      if (error) throw error;

      setUsers((prev: User[]) => prev.map(user => user.id === id ? { ...user, ...updates } : user));
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      throw error;
    }
  };

  // CRUD operations for leads
  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newLead: Lead = {
        ...leadData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (isLocalMode) {
        const updatedLeads = [newLead, ...leads];
        setLeads(updatedLeads);
        saveToLocalStorage(STORAGE_KEYS.leads, updatedLeads);
        toast.success('Lead added successfully!');
        return newLead;
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([{
          full_name: leadData.fullName,
          email: leadData.email,
          phone: leadData.phone,
          country: leadData.country,
          qualification: leadData.qualification,
          source: leadData.source,
          status: leadData.status,
          assigned_to: leadData.assignedTo,
          course_interest: leadData.courseInterest,
          priority: leadData.priority,
          location: leadData.location,
          notes: leadData.notes,
          whatsapp_number: leadData.whatsappNumber,
          preferred_language: leadData.preferredLanguage || 'en',
          notes_date: leadData.notesDate
        }])
        .select()
        .single();

      if (error) throw error;

      const createdLead: Lead = {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        qualification: data.qualification,
        source: data.source,
        status: data.status,
        assignedTo: data.assigned_to,
        courseInterest: data.course_interest,
        priority: data.priority,
        location: data.location,
        notes: data.notes,
        whatsappNumber: data.whatsapp_number,
        preferredLanguage: data.preferred_language,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        notesDate: data.notes_date
      };

      setLeads((prev: Lead[]) => [createdLead, ...prev]);
      toast.success('Lead added successfully!');
      return createdLead;
    } catch (error) {
      console.error('Error adding lead:', error);
      toast.error('Failed to add lead');
      throw error;
    }
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const updatedLead = { ...updates, updatedAt: new Date().toISOString() };

      if (isLocalMode) {
        const updatedLeads = leads.map((lead: Lead) => 
          lead.id === id ? { ...lead, ...updatedLead } : lead
        );
        setLeads(updatedLeads);
        saveToLocalStorage(STORAGE_KEYS.leads, updatedLeads);
        toast.success('Lead updated successfully!');
        return;
      }

      const { error } = await supabase
        .from('leads')
        .update({
          full_name: updates.fullName,
          email: updates.email,
          phone: updates.phone,
          country: updates.country,
          qualification: updates.qualification,
          source: updates.source,
          status: updates.status,
          assigned_to: updates.assignedTo,
          course_interest: updates.courseInterest,
          priority: updates.priority,
          location: updates.location,
          notes: updates.notes,
          whatsapp_number: updates.whatsappNumber,
          preferred_language: updates.preferredLanguage,
          notes_date: updates.notesDate,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setLeads((prev: Lead[]) => prev.map((lead: Lead) => 
        lead.id === id ? { ...lead, ...updatedLead } : lead
      ));
      toast.success('Lead updated successfully!');
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead');
      throw error;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      if (isLocalMode) {
        const updatedLeads = leads.filter((lead: Lead) => lead.id !== id);
        setLeads(updatedLeads);
        saveToLocalStorage(STORAGE_KEYS.leads, updatedLeads);
        toast.success('Lead deleted successfully!');
        return;
      }

      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLeads((prev: Lead[]) => prev.filter((lead: Lead) => lead.id !== id));
      toast.success('Lead deleted successfully!');
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead');
      throw error;
    }
  };

  // Add a new sale (update lead as Admission Done with sales info)
  const addSale = async (sale: {
    date: string;
    name: string;
    phone: string;
    email: string;
    country: string;
    qualification: string;
    course: string;
    fees: string;
    feesType: string;
    feesCollected: string;
    note: string;
  }) => {
    try {
      // Find lead by name, phone, or email (simple match)
      let lead = leads.find(l =>
        l.fullName === sale.name && l.phone === sale.phone && l.email === sale.email
      );

      if (!lead) {
        // If not found, create a new lead
        const newLead = await addLead({
          fullName: sale.name,
          email: sale.email,
          phone: sale.phone,
          country: sale.country,
          qualification: sale.qualification,
          source: 'Sales',
          status: 'Admission Done',
          assignedTo: '',
          courseInterest: sale.course,
          priority: '',
          location: '',
          notes: '',
          whatsappNumber: '',
          preferredLanguage: 'en',
          notesDate: sale.date
        });
        lead = newLead;
      }

      // Update lead with sales info
      await updateLead(lead.id, {
        status: 'Admission Done',
        fees: Number(sale.fees),
        feesType: sale.feesType,
        feesCollected: Number(sale.feesCollected),
        note: sale.note,
        updatedAt: new Date().toISOString(),
        notesDate: sale.date,
        courseInterest: sale.course,
        qualification: sale.qualification,
        country: sale.country
      });

      toast.success('Sale saved!');
    } catch (error) {
      console.error('Error saving sale:', error);
      toast.error('Failed to save sale');
      throw error;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    leads,
    courses,
    users,
    followUps,
    loading,
    addUser,
    updateUser,
    addLead,
    updateLead,
    deleteLead,
    addSale,
    refreshData: loadData
  };
}