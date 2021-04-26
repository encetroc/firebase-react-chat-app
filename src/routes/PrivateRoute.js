import { Route, Redirect } from "react-router-dom"
import { useStore } from '../Store'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useStore()

    return (
        <Route
            {...rest}
            render={props => {
                return state.currentUser.userInfoFromAuth ? <Component {...props} /> : <Redirect to="/sign-in" />
            }}
        ></Route>
    )
}

export default PrivateRoute