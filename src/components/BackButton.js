import { useHistory } from "react-router-dom";

import { CircleButton } from '../styled-components'
import { BackArrowIcon } from '../icons'

const BackButton = ({ backHome }) => {
    const history = useHistory();

    return (
        <CircleButton onClick={() => backHome ? history.push('/chatrooms') : history.goBack()}>
            <BackArrowIcon />
        </CircleButton>
    )
}

export default BackButton
