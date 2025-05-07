import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Fábrica de Software: Login',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
