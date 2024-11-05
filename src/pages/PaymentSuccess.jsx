import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { db } from '../firebaseConfig.jsx';
import { auth } from '../firebaseConfig.jsx';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const PaymentSuccess = () => {
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const sessionId = new URLSearchParams(location.search).get('session_id');

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            if (!sessionId) {
                setStatus('failed');
                setError('No session ID found');
                return;
            }

            try {
                // Get current user
                const user = auth.currentUser;
                if (!user || !user.uid) {
                    throw new Error('User not authenticated');
                }

                // Update database with user UID
                await updatePaymentStatus(sessionId, user.uid);

                // Only set success after database update is confirmed
                setStatus('success');

                // Redirect after success
                setTimeout(() => {
                    navigate('/');
                }, 3000);

            } catch (err) {
                console.error('Payment processing error:', err);
                setStatus('failed');
                setError(err.message);
            }
        };

        handlePaymentSuccess();
    }, [sessionId, navigate]);

    const updatePaymentStatus = async (sessionId, uid) => {
        try {
            // Get reference to the user document using UID
            const userDocRef = doc(db, 'users', uid);
            
            // Check if document exists
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) {
                throw new Error(`User document not found for UID: ${uid}`);
            }

            const updateData = {
                paymentId: sessionId,
                lastPaymentDate: new Date().toISOString(),
                subscriptionStatus: 'premium',
                updatedAt: new Date().toISOString(),
            };

            // Update the document
            await updateDoc(userDocRef, updateData);
            console.log('Payment status updated successfully');
            
        } catch (error) {
            console.error('Database update error:', error);
            throw new Error(`Failed to update payment status: ${error.message}`);
        }
    };

    const handleManualRedirect = () => {
        navigate('/');
    };

    return (
        <Container className="payment-success-container" maxWidth="sm">
            {status === 'loading' && (
                <div className="text-center space-y-4">
                    <CircularProgress />
                    <Typography variant="h6">
                        Processing your payment...
                    </Typography>
                </div>
            )}
            
            {status === 'success' && (
                <div className="text-center space-y-4">
                    <Typography variant="h4" color="success.main">
                        Payment successful!
                    </Typography>
                    <Typography variant="body1">
                        Your premium access has been activated.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Redirecting to home page...
                    </Typography>
                </div>
            )}
            
            {status === 'failed' && (
                <div className="text-center space-y-4">
                    <Typography variant="h4" color="error.main">
                        Payment confirmation failed
                    </Typography>
                    <Typography variant="body1" color="error">
                        {error || 'Please try again later'}
                    </Typography>
                    <Typography variant="body2">
                        If this issue persists, please contact support with your session ID: {sessionId}
                    </Typography>
                </div>
            )}
            
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleManualRedirect}
                className="mt-8"
            >
                Go to Home
            </Button>
        </Container>
    );
};

export default PaymentSuccess;
