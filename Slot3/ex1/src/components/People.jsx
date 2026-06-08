import React from 'react';

function People() {
  const peopleList = [
    { id: 1, name: 'Trương Nam Nhân', age: 21 },
    { id: 2, name: 'Ngô Thị Hoài Trinh', age: 20 },
    { id: 3, name: 'Nguyễn Văn A', age: 22 },
    { id: 4, name: 'Lê Thị B', age: 19 },
    { id: 5, name: 'Trần Văn C', age: 21 },
    { id: 6, name: 'Phạm Thị D', age: 20 },
    { id: 7, name: 'Hoàng Văn E', age: 23 },
    { id: 8, name: 'Đặng Thị F', age: 19 },
    { id: 9, name: 'Bùi Văn G', age: 21 },
    { id: 10, name: 'Vũ Thị H', age: 20 }
  ];

  const firstTeenager = peopleList.find(person => person.age >= 13 && person.age <= 19);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#003366' }}>Danh sách 10 thành viên</h1>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {peopleList.map((person, index) => (
          <li key={person.id} style={{ padding: '10px', borderBottom: '1px solid #ddd', fontSize: '18px' }}>
            <span style={{ fontWeight: 'bold', color: '#E6B800' }}>{index + 1}.</span> 
            <strong> {person.name}</strong> - {person.age} tuổi
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', border: '2px dashed #003366', borderRadius: '8px' }}>
        <h2 style={{ color: '#003366', marginTop: 0 }}>Kết quả tìm kiếm Teenager:</h2>
        {firstTeenager ? (
          <p style={{ fontSize: '20px', color: '#28a745' }}>
            Tìm thấy: <strong>{firstTeenager.name}</strong> - {firstTeenager.age} tuổi
          </p>
        ) : (
          <p style={{ fontSize: '20px', color: '#dc3545', fontWeight: 'bold' }}>No result</p>
        )}
      </div>
    </div>
  );
}

export default People;