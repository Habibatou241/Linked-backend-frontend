import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TestConnection() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/test')
            .then(response => setMessage(response.data.message))
            .catch(error => console.error('Connection error:', error));
    }, []);

    return (
        <div>
            <h2>API Test</h2>
            <p>{message}</p>
        </div>
    );
}

export default TestConnection;