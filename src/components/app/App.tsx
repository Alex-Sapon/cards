import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import React from 'react';

import {Navbar} from '../navbar/Navbar';
import {Login} from '../../features/login/Login';
import {Register} from '../../features/register/Register';
import {Profile} from '../../features/profile/Profile';
import {SetPassword} from '../../features/setPass/SetPassword';
import {RecoveryPass} from '../../features/recoveryPass/RecoveryPass';
import {Test} from '../../features/test/Test';
import {Error404} from '../error404/Error404';

import {PATH} from '../../enums/path';

function App() {
    return (
        <div className="app_container">
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.TEST}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.SET_PASS} element={<SetPassword/>}/>
                <Route path={PATH.RECOVERY_PASS} element={<RecoveryPass/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} element={<Error404/>}/>
            </Routes>
        </div>
    );
}

export default App;

// 4. Сделать роутинг на пустые страницы (вывести название страниц):
//
// логинизация
// регистрация
// профайл
// 404 (можно застилизовать заранее)
// восстановление пароля
// ввод нового пароля
// тестовая - отобразить/продемонстрировать все SuperКопмоненты
// 5. Сделать стор и пустые редьюсеры (которые просто возвращают входящий стейт
//
// Проект должен запускаться без критических ошибок
// Закоммитить, запушить, задеплоить
// 6.  Скиньте мне ссылку на ваш репозиторий (ссылку на сайт кидать не нужно, я найду её в package.json
