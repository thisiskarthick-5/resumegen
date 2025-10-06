import { useState, useCallback, useEffect } from 'react';

const initialResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: []
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('ats-resume-data');
    return saved ? JSON.parse(saved) : initialResumeData;
  });

  const updateResumeData = useCallback((section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('ats-resume-data', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveToLocalStorage]);

  return {
    resumeData,
    updateResumeData,
    saveToLocalStorage
  };
};