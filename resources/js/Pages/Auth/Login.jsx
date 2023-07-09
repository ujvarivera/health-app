import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import Layout from '@/Layouts/Layout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [hideOrShow, setHideOrShow] = useState('Show');
    const [inputType, setInputType] = useState('password');

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    function showPasswordFunc() {
        setShowPassword(!showPassword);
        if (showPassword) {
          setHideOrShow('Show');
          setInputType('password');
        } else {
          setHideOrShow('Hide');
          setInputType('text');
        }
      }
      
    return (
        <Layout>
            <Head title="Log in" />

            {/*<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">*/}
            <div className="flex flex-col sm:justify-center md:mt-40 items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg border border-4">

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <div className="relative">
                    <TextInput
                        id="password"
                        type={inputType}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full pr-10"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center">
                        <button type="button" className="text-purple-500 pr-4" onClick={showPasswordFunc}>
                        {hideOrShow}
                        </button>
                    </span>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} onChange={handleOnChange} />
                        <span className="ml-2 text-sm text-gray-600 cursor-pointer">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline-none hover:underline text-m tracking-wide text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
            </div>
            </div>
        </Layout>
    );
}
