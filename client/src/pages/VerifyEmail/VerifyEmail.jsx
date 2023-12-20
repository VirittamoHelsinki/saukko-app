import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../api/user';

// this page needs styling job for frontend :)

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then(response => {
          console.log('Email verified:', response.data);
          // Redirect to reset password page for user to reset / create own password
          navigate(`/reset-password/${token}`)
        })
        .catch(error => {
          console.error('Verification error:', error);
          // Handle error, maybe redirect to an error page or show a message if the front end got it ? or just redirect to login page 
        });
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>Verifying your email...</h2>
      {/* instead of text add somekinda loading spinner in future */}
    </div>
  );
};

export default EmailVerification;