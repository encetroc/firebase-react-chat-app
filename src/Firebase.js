import React, { useContext, useState, useEffect } from 'react'
import { initializeApp, getApps } from "firebase/app"
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import { setDoc, getDoc, doc, collection, getDocs, getFirestore, query, where, limit, updateDoc, arrayUnion, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"

if (getApps().length === 0) {
    const firebaseApp = initializeApp({
        apiKey: "AIzaSyAWBigzUVWR_p24jK6Fq8YKpBcjIazLd5E",
        authDomain: "chat-app-ce4f5.firebaseapp.com",
        projectId: "chat-app-ce4f5",
        storageBucket: "chat-app-ce4f5.appspot.com",
        messagingSenderId: "916021836729",
        appId: "1:916021836729:web:0979ca59bc5dc8cd8c9468"
    });
}

const auth = getAuth()
const firestore = getFirestore();
const googleProvider = new GoogleAuthProvider()

const FirebaseContext = React.createContext()

const useFirebase = () => {
    return useContext(FirebaseContext)
}

const FirebaseProvider = ({ children }) => {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const additionalUserInfo = getAdditionalUserInfo(result)
                const user = result.user

                if (additionalUserInfo.isNewUser) {
                    const randomUsername = `user${getRndInteger(1000, 9999)}#${getRndInteger(1000, 9999)}`
                    await setDoc(doc(firestore, "users", user.uid), {
                        contacts: [],
                        uid: user.uid,
                        username: randomUsername,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    });
                }
            }).catch((error) => {
                console.log('login error', error)
            })
    }

    const disconnect = () => {
        signOut(auth).then(() => {
            console.log('disconnected')
        }).catch((error) => {
            console.log('log out error', error)
        });
    }

    const getDatabaseUserInfo = async (userId) => {
        const userRef = doc(firestore, "users", userId)
        const userSnap = await getDoc(userRef)
        return userSnap.data()
    }

    const getContacts = async (contactsRefs) => {
        if (contactsRefs && contactsRefs.length !== 0) {
            const contacts = await Promise.all(contactsRefs.map(async contactRef => {
                const contactSnap = await getDoc(contactRef)
                return contactSnap.data()
            }))
            return contacts
        } else {
            return []
        }
    }

    const getRealtimeMessages = (docId, dispatch, user) => {
        const q = query(collection(firestore, 'chatrooms', docId, 'messages'), orderBy("createdAt", "desc"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = []
            querySnapshot.forEach((doc) => {
                messages.push({
                    ...doc.data(),
                    isOwned: user.uid === doc.data().uid ? true : false,
                    id: doc.id,
                })
                //messages.push(doc.data());
            });
            dispatch({
                type: 'SET_MESSAGES',
                payload: { [docId]: { id: docId, messages } }
            })
        });
        return unsubscribe
    }

    const getChatrooms = async (currentUserUid, contacts) => {
        const q = query(collection(firestore, 'chatrooms'), where('usersUid', 'array-contains', currentUserUid))
        const querySnapshot = await getDocs(q)
        const chatroomDocs = []
        querySnapshot.forEach(async (doc) => {
            chatroomDocs.push(doc)
        });

        const chatrooms = chatroomDocs.map(doc => {
            const data = doc.data()
            const id = doc.id
            const usersUid = data.usersUid.filter(userUid => userUid !== currentUserUid)
            const recipients = usersUid.map(userUid => contacts.find(contact => contact.uid === userUid))
            return { id, recipients }
        })

        return chatrooms
    }

    const addMessage = async (messageContent, userUid, chatroomId) => {
        const messageRef = doc(collection(firestore, 'chatrooms', chatroomId, 'messages'));
        await setDoc(messageRef, {
            type: 'text',
            createdAt: serverTimestamp(),
            content: messageContent,
            uid: userUid
        });
    }

    const value = {
        signInWithGoogle,
        getChatrooms,
        getContacts,
        getRealtimeMessages,
        getDatabaseUserInfo,
        disconnect,
        addMessage,
        auth
    }

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider, useFirebase }
