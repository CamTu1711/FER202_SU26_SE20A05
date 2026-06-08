function Hello() {
    // Phải có định nghĩa này thì dòng 17 mới chạy được nè
    const containerStyle = {
        fontSize: '36px',
        color: 'black',
        fontWeight: 'normal'
    };

    const highlightStyle = {
        fontSize: 48,
        color: 'blue',
        fontWeight: 'bold'
    };

    return (
        <div>
            <p style={containerStyle}>
                Hello 
                <span style={highlightStyle}>
                    React
                </span>
            </p>
        </div>
    );
}

export default Hello;
