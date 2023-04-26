// server.js

const apiUrl = 'http://localhost:3000';

export const postData = async (url, data) => {
    try {
        const response = await fetch(`${apiUrl}/${url}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getData = async (url) => {
    try {
        const response = await fetch(`${apiUrl}/${url}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
};
