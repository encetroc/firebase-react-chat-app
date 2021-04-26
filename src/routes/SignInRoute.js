import { Route, Redirect } from "react-router-dom"
import { useStore } from '../Store'
import { SignIn } from '../pages'

const SignInRoute = ({ ...rest }) => {
    const { state } = useStore()

    return (
        <Route
            {...rest}
            render={props => {
                return state.currentUser.userInfoFromAuth ? <Redirect to="/chatrooms" /> : <SignIn />
            }}
        ></Route>
    )
}

export default SignInRoute