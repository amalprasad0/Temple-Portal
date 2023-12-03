import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
export function SuccessPage() {
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('login') === 'true';

  return (
    <>
     {isLogin ?<NavBar />:<div>
        </div>}
    <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ background: 'linear-gradient(to right, #CFE4E3, #E8E5EB)' }}>
      <Player
        src='https://lottie.host/1f50409f-7031-42bb-be9f-766c20952a50/vCIuFdLp6g.json'
        className="player"
        autoplay
        loop
        style={{ height: '300px', width: '300px' }}
      />
      <h3 className='text-center mt-3 animated-text fw-bold'>നിങ്ങളുടെ വിശദാംശങ്ങൾ വിജയകരമായി ചേർത്തു</h3>
      <a className='btn btn-primary w-50 mt-3 fw-bold' onClick={()=>{
        navigate('/userdetails')
      }}>ADD ANOTHER FAMILY MEMBER</a>
      <div>
        <h6 className='text-center py-2'>Need help ?</h6>
        <h6>Contact our support center via 7306557354</h6>
      </div>
      
      <p className='text-center mt-3 mt-auto'>©️ Developed by Bharath Prayok Softwares Chittarikkal</p>
    </div>
    </>
  );
}
