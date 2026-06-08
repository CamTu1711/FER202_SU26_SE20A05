import React from 'react';
import MyProfile from './MyProfile';

function Footer({ profile }) {
  return (
    <footer className="mt-5 pt-4 border-top">
      <h3 className="text-center text-secondary mb-3">Thông tin tác giả (Footer)</h3>
      
      <MyProfile profile={profile} />
      
      <p className="text-center text-muted small mt-3">© 2024 - Bản quyền thuộc về TraltB</p>
    </footer>
  );
}

export default Footer;