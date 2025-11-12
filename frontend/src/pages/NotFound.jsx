import React from 'react'

const HomePage = () => {
    return <div className ="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
        <img src="404notfound.png" alt="notfound" className="max-w-full mb-6 w-96"/>

        <p className ="text-xt font-semibold">
            You pick the wrong house fool!
        </p>

        <a href="/" className="inline-block px-6 py-3 mt-6 font-medium transition shadow-md bg-primary rounded-2xl hover:bg-primaryu-dark ">
            Back to the main page
        </a>
    </div>
    
};

export default HomePage;