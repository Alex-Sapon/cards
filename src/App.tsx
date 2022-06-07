import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Login} from './pages/login/Login';
import {Error404} from './pages/error404/Error404';
import {NewPassword} from './pages/newPassword/NewPassword';
import {RecoveryPassword} from './pages/recoveryPassword/RecoveryPassword';
import {Register} from './pages/register/Register';
import {Profile} from './pages/profile/Profile';
import {Test} from './pages/test/Test';
import {Navbar} from './components/navbar/Navbar';
import {PATH} from './enums/path';

function App() {
    return (
        <div className="app_container">
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.TEST}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={'/*'} element={<Error404/>}/>
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
