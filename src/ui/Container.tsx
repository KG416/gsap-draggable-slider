import { ReactNode } from 'react';

type Props = { children: ReactNode; title?: string };

export default function Container({ children, title }: Props) {
  return (
    <div className='overflow-x-hidden border-2 border-gray-900'>
      {title && <h2 className='subtitle'>{title}</h2>}

      {children}
    </div>
  );
}
