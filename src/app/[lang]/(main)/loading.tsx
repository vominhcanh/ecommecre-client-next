import { Spinner } from '@heroui/react';

export default function AppLoading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Spinner variant='spinner' />
    </div>
  );
}
