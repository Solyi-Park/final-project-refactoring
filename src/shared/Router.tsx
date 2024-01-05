import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Auth from "../pages/Auth";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Write from "../pages/Write";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/write" element={<Write />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}