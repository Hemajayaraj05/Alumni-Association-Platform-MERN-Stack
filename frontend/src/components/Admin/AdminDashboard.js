import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../utils/api';

const AdminDashboard = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [pendingQueries, setPendingQueries] = useState(0);

    useEffect(() => {
        // Fetch users count and pending queries (for simplicity, assuming these values)
        const fetchStats = async () => {
            const users = await getAllUsers();
            setUsersCount(users.length);
            setPendingQueries(5); // Mock data, replace with actual logic
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <p>Total Users: {usersCount}</p>
                <p>Pending Queries: {pendingQueries}</p>
                <Link to="/admin/manage-users">Manage Users</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
