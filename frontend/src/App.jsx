import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/hello') // temporary test endpoint
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h1>Spotify React Frontend</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
