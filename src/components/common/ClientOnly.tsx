import { useEffect, useState } from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const ClientOnly = ({ children, fallback }: ClientOnlyProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []); // Chạy chỉ một lần khi component được mount

  return isClient ? children : (fallback ?? <></>);
};

export default ClientOnly;
