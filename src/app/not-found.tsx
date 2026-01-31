import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1 className='mb-4 text-4xl font-bold'>404 - Không tìm thấy trang</h1>
        <p className='mb-8'>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <Link href='/' className='text-blue-500 hover:underline'>
          Quay lại trang chủ
        </Link>
      </div>
    </main>
  );
}
