import Svg from './Svg'

const DoneIcon = (props) => {
    return (
        <Svg {...props}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path fill={props.fill || 'currentColor'} d="M9 16.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 000-1.4.984.984 0 00-1.4 0L9 16.2z" />
        </Svg>
    )
}

export default DoneIcon