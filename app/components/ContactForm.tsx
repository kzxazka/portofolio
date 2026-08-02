'use client';

import { useState, useRef } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

// Ganti dengan Form ID dari Formspree Anda
const FORMSPREE_FORM_ID = 'your-formspree-id';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type Status = {
  type: 'success' | 'error' | 'info';
  message: string;
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email.toLowerCase());
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validasi nama (3-50 karakter)
    const name = formData.name.trim();
    if (!name) {
      newErrors.name = 'Nama harus diisi';
    } else if (name.length < 3) {
      newErrors.name = 'Nama terlalu pendek (minimal 3 karakter)';
    } else if (name.length > 50) {
      newErrors.name = 'Nama terlalu panjang (maksimal 50 karakter)';
    }
    
    // Validasi email
    const email = formData.email.trim();
    if (!email) {
      newErrors.email = 'Email harus diisi';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format email tidak valid';
    } else if (email.length > 100) {
      newErrors.email = 'Email terlalu panjang (maksimal 100 karakter)';
    }
    
    // Validasi pesan (10-1000 karakter)
    const message = formData.message.trim();
    if (!message) {
      newErrors.message = 'Pesan harus diisi';
    } else if (message.length < 10) {
      newErrors.message = 'Pesan terlalu pendek (minimal 10 karakter)';
    } else if (message.length > 1000) {
      newErrors.message = 'Pesan terlalu panjang (maksimal 1000 karakter)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    // Hapus error saat user mengetik
    if (errors[name]) {
    setErrors((prev: Record<string, string>) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Harap perbaiki kesalahan di form' });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: 'info', message: 'Mengirim pesan...' });

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim pesan');
      }

      setStatus({ 
        type: 'success', 
        message: 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      formRef.current?.reset();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ 
        type: 'error', 
        message: 'Terjadi kesalahan. Silakan coba lagi nanti.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email Anda"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>
        
        <div>
          <Textarea
            id="message"
            name="message"
            placeholder="Pesan Anda"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {status && (
          <div className={`text-sm px-4 py-2 rounded ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-800' 
              : status.type === 'error'
                ? 'bg-red-50 text-red-800'
                : 'bg-blue-50 text-blue-800'
          }`}>
            {status.message}
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[160px]"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengirim...
            </span>
          ) : 'Kirim Pesan'}
        </Button>
      </div>
    </form>
  );
}