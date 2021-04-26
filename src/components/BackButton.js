import { useHistory } from "react-router-dom";

import { CircleButton } from '../styled-components'
import { BackArrowIcon } from '../icons'

const BackButton = ({ backCustom }) => {
    const history = useHistory();

    return (
        <CircleButton onClick={() => backCustom ? history.push(backCustom) : history.goBack()}>
            <BackArrowIcon />
        </CircleButton>
    )
}

export default BackButton
