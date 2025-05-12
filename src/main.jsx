import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './routes/layout/MainLayout.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const HomePage = React.lazy(() => import("./routes/homePage/HomePage.jsx"));
const CreatePage = React.lazy(() => import("./routes/createPage/CreatePage.jsx"));
const PostPage = React.lazy(() => import("./routes/postPage/PostPage.jsx"));
const ProfilePage = React.lazy(() => import("./routes/profilePage/ProfilePage.jsx"));
const SearchPage = React.lazy(() => import("./routes/searchPage/SearchPage.jsx"));
const Auth = React.lazy(() => import("./routes/authPage/Auth.jsx"));

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/pin/:id" element={<PostPage />} />
              <Route path="/profile/:userName" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
