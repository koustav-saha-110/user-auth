import React from 'react'
import axios from '../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/userSlice';

const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = React.useState({
        email: '',
        password: ''
    });

    const [signinForm, setSigninForm] = React.useState({
        name: '',
        email: '',
        password: ''
    });

    const [currentPage, setCurrentPage] = React.useState('login');
    const togglePage = () => setCurrentPage(prev => prev == 'login' ? 'signup' : 'login');

    const submitHandlerForLogin = async (e) => {
        e.preventDefault();

        try {
            let { data } = await axios.post('/user/login', loginForm);
            console.log(data);

            if (data.success) {
                localStorage.setItem('token', data.token);
                dispatch(login(data.user));
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    
    const submitHandlerForSignin = async (e) => {
        e.preventDefault();

        try {
            let { data } = await axios.post('/user/signin', signinForm);
            console.log(data);

            if (data.success) {
                localStorage.setItem('token', data.token);
                dispatch(login(data.user));
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    React.useEffect(() => {
    }, []);

    return (
        <React.Fragment>
            <ToastContainer />
            {
                currentPage == 'login' ? <div className="min-h-screen flex bg-gray-200 flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={submitHandlerForLogin}>
                                <i className='text-xl'>Login your account!!</i>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={loginForm.email}
                                            onChange={(e) => setLoginForm(prev => {
                                                return {...prev, email: e.target.value}
                                            })}
                                            autoComplete="email"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={loginForm.password}
                                            onChange={(e) => setLoginForm(prev => {
                                                return {...prev, password: e.target.value}
                                            })}
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Log in
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span onClick={togglePage} className="px-2 cursor-pointer bg-white text-gray-500">Sign in</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div className="min-h-screen flex bg-gray-200 flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={submitHandlerForSignin}>
                                <i className='text-xl'>Create your new account!!</i>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="text"
                                            type="name"
                                            value={signinForm.name}
                                            onChange={(e) => setSigninForm(prev => {
                                                return {...prev, name: e.target.value}
                                            })}
                                            autoComplete="name"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={signinForm.email}
                                            onChange={(e) => setSigninForm(prev => {
                                                return {...prev, email: e.target.value}
                                            })}
                                            autoComplete="email"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={signinForm.password}
                                            onChange={(e) => setSigninForm(prev => {
                                                return {...prev, password: e.target.value}
                                            })}
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span onClick={togglePage} className="px-2 cursor-pointer bg-white text-gray-500">Log in</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Auth