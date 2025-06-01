import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
      const {signInWithGoogle}= useContext(AuthContext);
      const navigate = useNavigate();
      const handleGoogleSignIn =() =>{
            signInWithGoogle()
            .then(result=>{
                  console.log(result.user);
                  navigate(location?.state ? location.state : "/");
            })
            .catch(error=>{
                  console.log(error.massage);
            })
      }
      return (
        <div className="m-4 mx-auto">
          <div className="divider">OR</div>
          <button onClick={handleGoogleSignIn}  className="w-full flex items-center justify-center gap-2 bg-blue-600  text-white py-2 rounded hover:bg-blue-800 transition">
            <BsGoogle />
            Continue With Google
          </button>
        </div>
      );
};

export default SocialLogin;