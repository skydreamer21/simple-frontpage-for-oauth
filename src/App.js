import logo from "./logo.svg";
import "./App.css";
import RouterApp from "./routers/routers";
import store from "./store";
import { Provider } from "react-redux";

function App() {
    return (
        <div>
            <Provider store={store}>
                <RouterApp />
            </Provider>
        </div>
    );
}

export default App;
