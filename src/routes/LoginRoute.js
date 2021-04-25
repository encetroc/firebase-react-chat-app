import { Route, Redirect } from "react-router-dom"
import { useStore } from '../Store'
import { Login } from '../components'

const LoginRoute = ({ ...rest }) => {
    const { state } = useStore()

    return (
        <Route
            {...rest}
            render={props => {
                return state.currentUser.userInfoFromAuth ? <Redirect to="/chatrooms" /> : <Login />
            }}
        ></Route>
    )
}

export default LoginRoute