import { useFirebase } from '../Firebase'
import { useStore } from '../Store'

const Dashboard = () => {
    const { state } = useStore()
    const { disconnect } = useFirebase()

    return (
        <div>
            <pre>
                {JSON.stringify(state, undefined, 2)}
            </pre>
            <button onClick={disconnect}>sign out</button>
        </div>
    )
}

export default Dashboard
