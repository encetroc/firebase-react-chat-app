import { BrowserRouter as Router, Switch } from "react-router-dom"
import { FirebaseProvider } from './Firebase'
import { StoreProvider } from './Store'
import { Dashboard } from './components'
import { PrivateRoute, LoginRoute } from './routes'
import { FullScreen } from './styled-components'
import { Chatrooms } from "./pages"

function App() {
    return (
        <Router>
            <FirebaseProvider>
                <StoreProvider>
                    <FullScreen>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute exact path="/chatrooms" component={Chatrooms} />
                            <LoginRoute path="/login" />
                        </Switch>
                    </FullScreen>
                </StoreProvider>
            </FirebaseProvider>
        </Router>
    );
}

export default App;
