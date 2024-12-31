import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const data = useSelector(state => state.user);
    const navigate = useNavigate();

    const loginClickHandler = () => navigate('/auth');

    React.useState(() => {
    }, []);

    return (
        <React.Fragment>
            <section className='flex h-screen justify-center items-center'>
                <div className='flex flex-col gap-4 items-center'>
                    <h1 className='text-8xl font-semibold'>{data.auth ? 'Authenticated' : 'Not Authenticated'}</h1>
                    {
                        !data.auth && <button onClick={loginClickHandler} className='px-3 py-1 rounded-md text-white bg-black'>Click to authenticate youreself</button>
                    }
                    {
                        data.auth && <h1 className='text-3xl text-zinc-600'>Hello, {data.user.name}</h1>
                    }
                    <button onClick={loginClickHandler} className='px-5 py-1 font-semibold text-white rounded-md bg-black'>Login</button>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Home