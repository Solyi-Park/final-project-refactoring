import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'layouts/Layout';
import React, { Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';
// import About from 'pages/about/About';
// import Auth from 'pages/auth/Auth';
// import ByMango from 'pages/bymango/ByMango';
// import Community from 'pages/community/Community';
// import Detail from 'pages/detail/Detail';
// import Home from 'pages/home/Home';
// import MyPage from 'pages/mypage/MyPage';
// import Write from 'pages/write/Write';
const About = React.lazy(() => import('pages/about/About'));
const Auth = React.lazy(() => import('pages/auth/Auth'));
const ByMango = React.lazy(() => import('pages/bymango/ByMango'));
const Community = React.lazy(() => import('pages/community/Community'));
const Detail = React.lazy(() => import('pages/detail/Detail'));
const Home = React.lazy(() => import('pages/home/Home'));
const MyPage = React.lazy(() => import('pages/mypage/MyPage'));
const Write = React.lazy(() => import('pages/write/Write'));
export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/bymango" element={<ByMango />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/write" element={<Write key={new Date().getTime()} />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
      <ReactQueryDevtools />
    </BrowserRouter>
  );
}
