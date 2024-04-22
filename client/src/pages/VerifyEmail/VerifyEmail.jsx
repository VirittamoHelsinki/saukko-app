import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../../api/user';
import Uvc from 'universal-cookie'
import RequestEmailVerificationLink from './RequestEmailVerificationLink';
// this page needs styling job for frontend :)

const EmailVerification = () => {
  const { token } = useParams();
  const [responseError, setResponseError] = useState({ hasError: false, errorMessage: "", errorType: "" });

  useEffect(() => {
    if (token) {
      const cookie = new Uvc();
      cookie.set("verification-token", token);
      
      verifyEmail()
        .then((response) => {
          window.location = response.data.redirectURL
        })
        .catch(err => {
          console.log(Object.keys(err))
          console.log(err.response?.status)
          switch (err.response?.status) {
            case 401:
              const msg = err.response?.data?.errorMessage ?? "Unknown"
              const errType = msg === "Token is expired" ? "token" : "unknown";
              setResponseError({ hasError: true, errorMessage: msg, errorType: errType })
              break;
            default:
              setResponseError({ hasError: true, errorMessage: "", errorType: "unknown" });
              break;
          }
            
          console.error('Verification error:', err);
        })
    }
  }, [token]);

  return (
    <>
      {!responseError.hasError && <h2>Verifying your email...</h2>}
      {(responseError.hasError && responseError.errorType === "token") && (
        <RequestEmailVerificationLink />
      )}

      {(responseError.hasError && responseError.errorType !== "token") && (
        <div>Unknown error</div>
      )}
    </>
  );
};

export default EmailVerification;