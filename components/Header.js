import Head from 'next/head';

const Header = ({ children }) => {
  return (
    <Head>
      {children}
      <link
        rel="shortcut icon"
        href={`${process.env.PREFIX}/static/img/globals/favicon.ico`}
        type="image/x-icon"
      />
    </Head>
  );
};

export default Header;
