import { useFirebase } from '../Firebase'

const Login = () => {
    const { signInWithGoogle } = useFirebase()

    return (
        <button onClick={signInWithGoogle}>sign in</button>
    )
}

export default Login
