// src/services/contactService.ts
import { supabase } from './supabaseClient';

interface ContactFormData {
  name: string;
  email: string;
  project: string;
  message: string;
}

export const sendContactForm = async (formData: ContactFormData) => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          project_type: formData.project,
          message: formData.message,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    
    // Trigger email notification via Supabase Database webhook
    // We'll set this up in the Supabase dashboard
    
    return { success: true };
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};