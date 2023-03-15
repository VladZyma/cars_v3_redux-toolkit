import {Outlet} from 'react-router-dom';

import {Header} from "../component/header/Header";

const MainLayout = () => {

    return (
        <div>
            <Header/>
            <hr/>
            <Outlet/>
        </div>
    );
};

export {MainLayout}