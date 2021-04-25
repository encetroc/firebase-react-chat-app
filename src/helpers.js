import { format } from 'date-fns'

const formatSeconds = (seconds) => {
    return format(new Date(seconds * 1000), 'h:mmaa')
}

export {
    formatSeconds
}