import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ViewUsers() {
    const [pageStatus, setPageStatus] = useState("loading");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "api/service/serviceReq")
            .then(response => {
                setUsers(response.data);
                setPageStatus("loaded");
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setPageStatus("error");
            });
    }, []);

    if (pageStatus === "loading") {
        return <div>Loading users...</div>;
    }

    if (pageStatus === "error") {
        return <div>Error loading users. Please try again.</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.firstName} {user.lastName}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
}

export default ViewUsers;