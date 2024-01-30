import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <div className='bg-white p-10 shadow-2xl'>
        <h1 className={ `${ titleFont.className } text-4xl mb-5` }>New Account</h1>
        <RegisterForm />

      </div>

    </main>
  );
}