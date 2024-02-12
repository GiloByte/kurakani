import { GoogleLogin } from '@react-oauth/google';
import { User, useUser } from '../contexts';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../lib';
import { useEffect } from 'react';

export function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user && user.token) {
      navigate('/u/lobby');
    }
  }, [user, navigate]);

  return (
    <>
      <nav className="flex justify-between items-center px-5 lg:px-36 h-[100px] bg-white">
        <img src="logo.png" alt="logo" height={60} width={80} />
      </nav>

      <main>
        <div className="flex px-5 pt-16 pb-12 mb-12 lg:px-36 min-h-[calc(100vh-180px)]">
          <div className="flex flex-col gap-8 w-full xl:pr-32 lg:w-1/2">
            <div className="flex flex-col gap-5">
              <p className=" text-[72px] leading-[70px] lg:text-[90px] text-transparent font-medium lg:leading-[85px] tracking-tight bg-gradient bg-clip-text">
                Kurakani
                <br /> anytime, anywhere
              </p>
              <p className="text-lg leading-7 text-gray-600">
                Kurakani makes it easy and fun to quickly chat with people all around the globe.
              </p>
            </div>

            <GoogleLogin
              onSuccess={async credentialResponse => {
                try {
                  const _user = await fetchApi<User>('/api/auth/google', {
                    body: JSON.stringify({ credential: credentialResponse.credential }),
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });

                  setUser(_user);
                  localStorage.setItem('user', JSON.stringify(_user));
                  navigate('/u/lobby');
                } catch (err: any) {
                  console.log(err.message);
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
          <div className="object-cover w-0 lg:w-1/2">
            <img src="hero.svg" alt="hero" />
          </div>
        </div>
      </main>

      <footer className="flex justify-center items-center px-5 mt-5 mb-2 lg:px-36">
        <div className="w-full">
          <span className="font-semibold">© Kurakani {new Date().getFullYear()}. </span>
          <span className="font-light">
            Powered with ❤️ and JS by{' '}
            <a href="https://gilobyte.com" target="_blank" className="text-primary">
              GiloByte
            </a>
            .
          </span>
        </div>
      </footer>
    </>
  );
}
