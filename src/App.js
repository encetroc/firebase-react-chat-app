import { BrowserRouter as Router, Switch } from "react-router-dom"
import { FirebaseProvider } from './Firebase'
import { StoreProvider } from './Store'
import { Dashboard } from './components'
import { PrivateRoute, LoginRoute } from './routes'

function App() {
    return (
        <Router>
            <FirebaseProvider>
                <StoreProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <LoginRoute path="/login" />
                    </Switch>
                </StoreProvider>
            </FirebaseProvider>
        </Router>
    );
}

export default App;
