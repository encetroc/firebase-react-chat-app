import { CBox, Button } from "../styled-components"
import { useFirebase } from '../Firebase'

const SignIn = () => {
    const { signInWithGoogle } = useFirebase()

    return (
        <CBox justifyContent='center' alignItems='center'>
            <Button onClick={signInWithGoogle}>
                Sign In with Google
            </Button>
        </CBox>
    )
}

export default SignIn
