import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProjectsView } from './features/projects/components/ProjectsView';
import { TestimonialsView } from './features/testimonials/components/TestimonialsView';
import { ClientsView } from './features/clients/components/ClientsView';
import { InquiriesView } from './features/inquiries/components/InquiriesView';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30, // 30 seconds
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<ProjectsView />} />
            <Route path="testimonials" element={<TestimonialsView />} />
            <Route path="clients" element={<ClientsView />} />
            <Route path="inquiries" element={<InquiriesView />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
