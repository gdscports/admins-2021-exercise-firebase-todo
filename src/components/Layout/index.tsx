import {PropsWithChildren} from 'react';

import Header from '../Header';

const Layout = ({children}: PropsWithChildren<{}>) => (
  <>
    <Header title="To-Do List" />
    {children}
  </>
);

export default Layout;
