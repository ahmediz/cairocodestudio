import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './features/auth/pages/LoginPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProjectsView } from './features/projects/components/ProjectsView';
import { TestimonialsView } from './features/testimonials/components/TestimonialsView';
import { ClientsView } from './features/clients/components/ClientsView';
import { InquiriesView } from './features/inquiries/components/InquiriesView';
import { SettingsView } from './features/settings/components/SettingsView';
import { Toaster } from './components/ui/sonner';

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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/projects" replace />} />
              <Route path="projects" element={<ProjectsView />} />
              <Route path="testimonials" element={<TestimonialsView />} />
              <Route path="clients" element={<ClientsView />} />
              <Route path="inquiries" element={<InquiriesView />} />
              <Route path="settings" element={<SettingsView />} />
              <Route path="*" element={<Navigate to="/projects" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;


