import { useState, useCallback } from 'react';
import { Service } from '../types';

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Non-Technical Writing',
    description: 'Essays, research papers, literature reviews, and general school assignments.',
    icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop&crop=center',
    price: '$8/page',
    features: ['English', 'History', 'Philosophy', 'Psychology', 'Sociology', 'Business', 'Marketing']
  },
  {
    id: '2',
    title: 'Technical Writing',
    description: 'Specialized help with technical subjects and programming assignments.',
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=64&h=64&fit=crop&crop=center',
    price: '$15/page',
    features: ['Python', 'Java', 'C++', 'Data Analysis', 'Statistics', 'Mathematics', 'Engineering']
  },
  {
    id: '3',
    title: 'Exam Help',
    description: 'Professional assistance with exams, quizzes, and assessments.',
    icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=64&h=64&fit=crop&crop=center',
    price: '$30/exam',
    features: ['All subjects', 'Timely delivery', 'Guaranteed quality', 'Confidential service']
  }
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [loading, setLoading] = useState(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setServices(mockServices);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getServiceById = useCallback((id: string) => {
    return services.find(service => service.id === id);
  }, [services]);

  const getServicesByCategory = useCallback((category: string) => {
    const categoryMap: Record<string, string[]> = {
      'non-technical': ['1'],
      'technical': ['2'],
      'exams': ['3']
    };
    return services.filter(service => categoryMap[category]?.includes(service.id));
  }, [services]);

  return { 
    services, 
    loading, 
    fetchServices, 
    getServiceById, 
    getServicesByCategory 
  };
};
