import { Suspense } from 'react';
import VerifyEmail from './verify-email';

export default function Page() {
  return (
    <Suspense fallback={<div>Ladataan...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}