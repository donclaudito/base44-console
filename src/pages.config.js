import Console from './pages/Console';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Console": Console,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Console",
    Pages: PAGES,
    Layout: __Layout,
};