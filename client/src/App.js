import './App.scss';
import Admin from './layouts/Admin/Admin';
import Editor from './layouts/Editor/Editor';
import Home from './layouts/Home/Home';
import LinkPage from './layouts/LinkPage/LinkPage';
import Login from './layouts/Login/Login';
import Lounge from './layouts/Lounge/Lounge';
import Missing from './layouts/Missing/Missing';
import Register from './layouts/Register/Register';
import Unauthorized from './layouts/Unauthorized/Unauthorized';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth/RequireAuth';
import PersistLogin from './components/PersistLogin/PersistLogin';

const ROLES_LIST = {
    ADMIN: 5012,
    EDITOR: 1986,
    USER: 2001,
};

function App() {
    return (
        <main className="App">
            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/linkpage" element={<LinkPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Private route */}
                <Route element={<PersistLogin />}>
                    <Route
                        element={
                            <RequireAuth allowedRoles={[ROLES_LIST.USER]} />
                        }
                    >
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route
                        element={
                            <RequireAuth allowedRoles={[ROLES_LIST.EDITOR]} />
                        }
                    >
                        <Route path="editor" element={<Editor />} />
                    </Route>
                    <Route
                        element={
                            <RequireAuth allowedRoles={[ROLES_LIST.ADMIN]} />
                        }
                    >
                        <Route path="admin" element={<Admin />} />
                    </Route>
                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[
                                    ROLES_LIST.ADMIN,
                                    ROLES_LIST.EDITOR,
                                ]}
                            />
                        }
                    >
                        <Route path="lounge" element={<Lounge />} />
                    </Route>
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Routes>
        </main>
    );
}

export default App;
