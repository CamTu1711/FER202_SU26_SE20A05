// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import RegistrationForm from './components/RegistrationForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      {/* Thanh menu luôn xuất hiện toàn cục */}
      <AppNavbar />

      <Routes>
        {/* LƯU Ý: Trang đăng ký tài khoản chạy đầu tiên khi khởi động hệ thống */}
        <Route path='/'          element={<RegistrationForm />} />
        
        {/* Trang chủ hiển thị danh sách bài viết Blog chuyển sang tuyến đường '/home' */}
        <Route path='/home'      element={<Home />} />
        
        <Route path='/posts'     element={<PostList />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route path='/about'     element={<About />} />
        <Route path='*'          element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;