import {Routes, Route, Navigate} from 'react-router-dom';

import {MainLayout} from "./layout";
import {HomePage, LoginPage, RegisterPage, CarPage} from "./page";

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<MainLayout/>}>
            <Route index element={<Navigate to={'/home'}/>}/>
            <Route path={'/home'} element={<HomePage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/cars'} element={<CarPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
