import { useHistory } from "react-router-dom";

import { CircleButton } from '../styled-components'
import { BackArrowIcon } from '../icons'

const BackButton = () => {
    const history = useHistory();

    return (
        <CircleButton onClick={() => history.goBack()}>
            <BackArrowIcon />
        </CircleButton>
    )
}

export default BackButton
