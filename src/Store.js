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
        case 'ADD_CHATROOM':
            return {
                ...state,
                chatrooms: [
                    ...state.chatrooms,
                    action.payload
                ]
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
    const { auth, getContacts, getChatrooms, getRealtimeMessages, getDatabaseUserInfo, addMessage, addChatroom, getRealtimeChatrooms, getChatroom } = useFirebase()
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
                    unsubscribes.push(getRealtimeMessages(chatroom.id, dispatch, user))
                })

                unsubscribes.push(getRealtimeChatrooms(user.uid, contacts, dispatch))

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

    const asyncDispatch = useCallback(async (action) => {
        switch (action.type) {
            case 'ADD_MESSAGE':
                const { messageContent, userUid, chatroomId } = action.payload
                await addMessage(messageContent, userUid, chatroomId)
                break
            case 'ADD_CHATROOM':
                const { recipients, currentUser, contacts } = action.payload
                const chatroomDoc = await addChatroom(recipients)
                const chatroom = await getChatroom(chatroomDoc, contacts, currentUser.uid)
                console.log(chatroom)
                //const chatrooms = await getChatrooms(currentUser.uid, contacts)
                //console.log(chatroom)
                /* dispatch({
                    type: "ADD_CHATROOM",
                    payload: chatroom
                }) */
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
