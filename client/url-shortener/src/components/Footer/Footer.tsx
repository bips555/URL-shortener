import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <footer className='bg-slate-900 text-white text-base text-center flex justify-center gap-10'>
     <div>@Copyright</div>
   
    <div>@Biplov Subedi</div>

    <div>Url shortener</div>

    </footer>
  )
};

export default Footer;
