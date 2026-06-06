import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../../features/landing/pages/LandingPage';
import JournalDetailPage from '../../features/journal/pages/JournalDetailPage';
import JournalListPage from '../../features/journal/pages/JournalListPage';
import CatalogSearchPage from '../../features/catalog/pages/CatalogSearchPage';
import ArticleListPage from '../../features/article/pages/ArticleListPage';
import ArticleDetailPage from '../../features/article/pages/ArticleDetailPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import LoginPage from '../../features/auth/pages/LoginPage';

// Auth Pages
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../../features/auth/pages/ResetPasswordPage';
import ActivationSuccessPage from '../../features/auth/pages/ActivationSuccessPage';
import ProfilePage from '../../features/auth/pages/ProfilePage';

// Author Pages
import AuthorListPage from '../../features/author/pages/AuthorListPage';
import AuthorDetailPage from '../../features/author/pages/AuthorDetailPage';

// Geography Page
import GeographyPage from '../../features/zone/pages/GeographyPage';

// Project Pages
import ProjectListPage from '../../features/project/pages/ProjectListPage';
import ProjectCreatePage from '../../features/project/pages/ProjectCreatePage';
import ProjectDetailPage from '../../features/project/pages/ProjectDetailPage';
import ProjectKeywordsPage from '../../features/project/pages/ProjectKeywordsPage';

// Admin Pages
import AdminDashboardPage from '../../features/admin/pages/AdminDashboardPage';
import AdminJournalsPage from '../../features/admin/pages/AdminJournalsPage';
import AdminArticlesPage from '../../features/admin/pages/AdminArticlesPage';
import AdminVolumesPage from '../../features/admin/pages/AdminVolumesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"           element={<LandingPage />} />
      <Route path="/dashboard"  element={<DashboardPage />} />
      <Route path="/journals"   element={<JournalListPage />} />
      <Route path="/journals/:id" element={<JournalDetailPage />} />
      <Route path="/catalog"    element={<CatalogSearchPage />} />
      <Route path="/search"     element={<CatalogSearchPage />} />
      <Route path="/articles"   element={<ArticleListPage />} />
      <Route path="/articles/:id" element={<ArticleDetailPage />} />
      
      {/* Auth Routes */}
      <Route path="/register"   element={<RegisterPage />} />
      <Route path="/login"      element={<LoginPage />} />
      <Route path="/forgot-password"   element={<ForgotPasswordPage />} />
      <Route path="/reset-password"    element={<ResetPasswordPage />} />
      <Route path="/activation-success" element={<ActivationSuccessPage />} />
      <Route path="/profile"           element={<ProfilePage />} />
      
      {/* Author Routes */}
      <Route path="/authors"     element={<AuthorListPage />} />
      <Route path="/authors/:id" element={<AuthorDetailPage />} />
      
      {/* Geography Route */}
      <Route path="/geography"   element={<GeographyPage />} />
      
      {/* Project Routes */}
      <Route path="/projects"           element={<ProjectListPage />} />
      <Route path="/projects/create"    element={<ProjectCreatePage />} />
      <Route path="/projects/:id"       element={<ProjectDetailPage />} />
      <Route path="/projects/:id/keywords" element={<ProjectKeywordsPage />} />

      {/* Admin Routes */}
      <Route path="/admin"              element={<AdminDashboardPage />} />
      <Route path="/admin/journals"     element={<AdminJournalsPage />} />
      <Route path="/admin/articles"     element={<AdminArticlesPage />} />
      <Route path="/admin/volumes"      element={<AdminVolumesPage />} />

      {/* Fallback */}
      <Route path="*"           element={<LandingPage />} />
    </Routes>
  );
}



