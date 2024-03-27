import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../../api/user';
import Uvc from 'universal-cookie'
// this page needs styling job for frontend :)

const EmailVerification = () => {
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      const cookie = new Uvc();
      cookie.set("verification-token", token);
      
      verifyEmail()
        .then((response) => {
          window.location = response.data.redirectURL
        })
        .catch(err => {
          console.error('Verification error:', err);
        })
    }
  }, [token]);

  return (
    <div>
      <h2>Verifying your email...</h2>
      {/* instead of text add somekinda loading spinner in future */}
    </div>
  );
};

export default EmailVerification;