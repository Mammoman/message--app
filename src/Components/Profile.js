import React, { useState, useEffect } from "react";
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please sign in to view profile</div>;
    }

    return (
        <div>
            <div className="profile-img-container">
                <div className="profile-img">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" />
                    ) : (
                        <div className="avatar-placeholder">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <div className="user-name-container">
                <h2>UserName: 
                    <span>{user.displayName || 'Not set'}</span>
                </h2>
            </div>

            <div className="nick-name-container">
                <h2>Nickname:</h2>
                <span>{user.displayName || 'Not set'}</span>
            </div>

            <div className="gmail-container">
                <h2>Connected Gmail:</h2>
                <span>{user.email}</span>
            </div>
        </div>
    );
};

export default Profile;