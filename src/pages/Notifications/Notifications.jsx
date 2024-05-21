import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {Link }from 'react-router-dom'
import LeftNav from '../../components/LeftNav/LeftNav';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-auth';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'notifications'));
                const notificationsData = snapshot.docs.map(doc => doc.data());
                setNotifications(notificationsData);
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className='notifications'>
            <div className='Navigation'>
                <LeftNav/>
            </div>
            <div className='ntf-container'>
                <div>
                    <h1><b>Notifications</b></h1>
                {notifications.map((notification, index) => (
                    <div key={index} className='ntn-card'>
                        {currentUser && currentUser.role !== 'admin' && notification.type === 'announcement' && (
                            <Link to='/Announcements'>
                            <p>New Announcement For: "{notification.title}" listed at Announcement section</p>
                            </Link>
                        )}
                        {currentUser && currentUser.role !== 'admin' && notification.type === 'job' && (
                            <Link to='/JobPortal'>
                            <p>New Job for : "{notification.title} "listed At Job Portal</p>
                            </Link>
                        )}
                          {currentUser && currentUser.role === 'admin' && notification.type === 'application' && (
                                <Link to="/ApplicationForm">
                                    <p>New Application for: "{notification.title}"</p>
                                </Link>
                            )}
                    </div>
                    
                ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
