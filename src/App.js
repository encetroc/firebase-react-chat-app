import { Switch } from "react-router-dom"
import { FirebaseProvider } from './Firebase'
import { StoreProvider } from './Store'
import { Dashboard } from './components'
import { PrivateRoute, SignInRoute } from './routes'
import { FullScreen } from './styled-components'
import { Chatrooms, Chatroom, Contacts, AddContact } from "./pages"

function App() {
    return (
        <FirebaseProvider>
            <StoreProvider>
                <FullScreen>
                    <Switch>
                        <PrivateRoute path="/chatrooms" component={Chatrooms} />
                        <PrivateRoute path="/contacts" component={Contacts} />
                        <PrivateRoute path="/add-contact" component={AddContact} />
                        <PrivateRoute path="/chatroom/:id" component={Chatroom} />
                        <SignInRoute path="/sign-in" />
                        <PrivateRoute exact path="/" component={Dashboard} />
                    </Switch>
                </FullScreen>
            </StoreProvider>
        </FirebaseProvider>
    );
}

export default App;
