import type { NextPage } from 'next';
import Home from '../modules/home/home';

const HomePage: NextPage = () => {
  return (
    <Home></Home>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: "Home"
    },
  }
}

export default HomePage
