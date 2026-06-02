import { montserratAlt } from '@/src/config/fonts';
import Link from 'next/link';
import LoginForm from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ montserratAlt.className } text-4xl mb-5` }>Ingresar</h1>

      <LoginForm />
    </div>
  );
}