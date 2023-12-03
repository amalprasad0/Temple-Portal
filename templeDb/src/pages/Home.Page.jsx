import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
export  function HomePage() {
  const navigate = useNavigate();
    const isLogin = localStorage.getItem('login') === 'true';

  return (
    <>
     {isLogin ?<NavBar />:<div>
        </div>}
    <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ background: 'linear-gradient(to right, #CFE4E3, #E8E5EB)' }}>
      <Player
        src='https://lottie.host/6359d25e-3aa9-4005-8262-92016cc0bf74/iOZJzO2i4M.json'
        className="player"
        autoplay
        loop
        style={{ height: '300px', width: '300px' }}
      />
      <h3 className='text-center mt-3 animated-text fw-bold'>ഈ പേജ് ഞങ്ങളുടെ സെർവറിൽ കാണുന്നില്ല</h3>
      <a className='btn btn-primary w-50 mt-3 fw-bold' onClick={()=>{
        if(isLogin)
          navigate('/member')
        else
          navigate('/userdetails')
      }}>{
        isLogin ? "Member Detials" : "Add Your Details"
      }</a>
      <div>
        <h6 className='text-center py-2'>Need help ?</h6>
        <h6>Contact our support center via 7306557354</h6>
      </div>
      
      <p className='text-center '>©️ Developed by Bharath Prayok Softwares Chittarikkal</p>
    </div>
    </>
  );
}
