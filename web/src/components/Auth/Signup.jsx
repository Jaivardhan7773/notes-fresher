import React, { useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore';

const Signup = () => {
  const { login } = useAuthStore();

  async function handleCredentialResponse(response) {
    const idToken = response.credential;

    try {
      await login(idToken);
      console.log("Logged in!");
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
    
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    };

    return () => {
     
      document.body.removeChild(script);
    };
  }, []); 

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-cyan-950 px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <a href="/#" className="mx-auto inline-block max-w-[160px]">
                  <h1 className='text-white text-2xl'>Notes Fresher</h1>
                </a>
              </div>
              <div className="mb-12">
                <h1 className="text-white mb-4"></h1>
                <div id="google-signin-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup;