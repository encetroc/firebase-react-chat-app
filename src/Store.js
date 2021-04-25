import React, { useContext, useReducer, useCallback, useEffect, useState } from 'react'
import { useFirebase } from './Firebase'

const StoreContext = React.createContext()

const initialState = {
    currentUser: {},
    contacts: [],
    chatrooms: [],
    messages: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'REFRESH':
            console.log(state)
            return { ...state }
        case 'RESET_STORE':
            return initialState
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: {
                    userInfoFromAuth: action.payload
                }
            }
        case 'ADD_DATABASE_USER_INFO':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload
                }
            }
        case 'SET_CONTACTS':
            return {
                ...state,
                contacts: action.payload || []
            }
        case 'SET_CHATROOMS':
            return {
                ...state,
                chatrooms: action.payload || []
            }
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: {
                    ...state.messages,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

const useStore = () => {
    return useContext(StoreContext)
}

const StoreProvider = ({ children }) => {
    const { auth, getContacts, getChatrooms, getRealtimeMessages, getDatabaseUserInfo } = useFirebase()
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribes = []
        unsubscribes.push(auth.onAuthStateChanged(async user => {
            dispatch({
                type: "SET_CURRENT_USER",
                payload: user
            });

            if (user) {
                const databaseUserInfo = await getDatabaseUserInfo(user.uid)
                const contacts = await getContacts(databaseUserInfo.contacts)
                const chatrooms = await getChatrooms(user.uid, contacts)

                dispatch({
                    type: "ADD_DATABASE_USER_INFO",
                    payload: {
                        userInfoFromDatabase: {
                            username: databaseUserInfo.username,
                            photoURL: databaseUserInfo.photoURL
                        }
                    }
                })

                dispatch({
                    type: "SET_CONTACTS",
                    payload: contacts
                })

                dispatch({
                    type: "SET_CHATROOMS",
                    payload: chatrooms
                })

                chatrooms.forEach(chatroom => {
                    unsubscribes.push(getRealtimeMessages(chatroom.id, dispatch))
                })

                databaseUserInfo && contacts && chatrooms && setLoading(false)
            } else {
                dispatch({
                    type: 'RESET_STORE'
                })
                setLoading(false)
            }
        }))

        return () => {
            unsubscribes.forEach(unsubscribe => unsubscribe())
        }
    }, [])

    const asyncDispatch = useCallback(async (actionType) => {
        switch (actionType) {
            case 'SET_CURRENT_USER':
                break
            default:
                break
        }
    }, [])

    const value = {
        state,
        dispatch,
        asyncDispatch
    }

    return (
        <StoreContext.Provider value={value}>
            {!loading && children}
        </StoreContext.Provider>
    )
}

export { StoreProvider, useStore }
