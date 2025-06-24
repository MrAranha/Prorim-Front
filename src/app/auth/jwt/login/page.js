import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Prorim: Login',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
