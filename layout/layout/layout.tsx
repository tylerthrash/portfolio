import { Fragment } from 'react';
import { Props } from '../../types/common.type';
import GithubCorner from '../github-corner';
import Meta from '../meta';

import NavBar from '../nav-bar';

const Layout = (props: Props) => {
  return (
    <div className="tyler-thrash-portfolio-layout">
      <Meta/>
      {/* <NavBar /> */}
      <GithubCorner/>
      <main className="layout-main-container">{props.children}</main>
    </div>
  );
}

export default Layout;
