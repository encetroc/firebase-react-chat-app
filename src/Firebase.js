import React, { useContext, useState, useEffect } from 'react'
import { initializeApp, getApps } from "firebase/app"
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import { setDoc, getDoc, doc, collection, getDocs, getFirestore, query, where, limit, updateDoc, arrayUnion, orderBy, onSnapshot, serverTimestamp, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

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

const storage = getStorage();

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
                    console.log(user)
                    const randomUsername = `user${getRndInteger(1000, 9999)}#${getRndInteger(1000, 9999)}`
                    const docRef = doc(firestore, "users", user.uid)
                    await setDoc(docRef, {
                        contacts: [],
                        uid: user.uid,
                        username: randomUsername,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    });

                    const photoRef = ref(storage, user.uid)
                    const blob = await fetch(user.photoURL).then(r => r.blob());
                    const snapshot = await uploadBytes(photoRef, blob)
                    const photoURL = await getDownloadURL(snapshot.ref)
                    await updateDoc(docRef, {
                        photoURL
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
            const contacts = Promise.all(contactsRefs.map(async contactRef => {
                const contactSnap = await getDoc(contactRef)
                return contactSnap.data()
            }))
            return contacts
        } else {
            return []
        }
    }

    const getRealtimeContacts = (currentUserUid, dispatch) => {
        const unsubscribe = onSnapshot(doc(firestore, 'users', currentUserUid), async (doc) => {
            const user = doc.data()
            if (user.contacts && user.contacts.length !== 0) {
                const contacts = await Promise.all(user.contacts.map(async contactRef => {
                    const contactSnap = await getDoc(contactRef)
                    return contactSnap.data()
                }))
                dispatch({
                    type: "SET_CONTACTS",
                    payload: contacts
                })
            }
        });
        return unsubscribe
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

    const getRealtimeChatrooms = (currentUserUid, contacts, dispatch) => {
        const q = query(collection(firestore, 'chatrooms'), where('usersUid', 'array-contains', currentUserUid))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chatrooms = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                const id = doc.id
                const usersUid = data.usersUid.filter(userUid => userUid !== currentUserUid)
                const recipients = usersUid.map(userUid => contacts.find(contact => contact.uid === userUid))
                chatrooms.push({ id, recipients })
            });
            dispatch({
                type: 'SET_CHATROOMS',
                payload: chatrooms
            })
        });
        return unsubscribe
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

    const addChatroom = async (recipients) => {
        const chatroomsRef = collection(firestore, 'chatrooms')
        const chatroomDoc = await addDoc(chatroomsRef, {
            usersUid: recipients
        })
        return chatroomDoc.id
    }

    const findContact = async (username, currentUser, contacts) => {
        const q = query(collection(firestore, 'users'), where('username', "==", username), where("uid", "!=", currentUser.uid), limit(1))
        const querySnapshot = await getDocs(q)
        const users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        });
        const user = users[0]
        if (!user) {
            return null
        }
        const isUserInContacts = contacts.find(contact => contact.uid === user.uid)
        if (isUserInContacts) {
            return null
        } else {
            return user
        }
    }

    const addContact = async (currentUserUid, contactUid) => {
        const currentUserRef = doc(firestore, "users", currentUserUid)
        const contactUserRef = doc(firestore, "users", contactUid)
        await updateDoc(currentUserRef, {
            contacts: arrayUnion(contactUserRef)
        });
        await updateDoc(contactUserRef, {
            contacts: arrayUnion(currentUserRef)
        });
    }

    const uploadImg = async () => {
        const storageRef = ref(storage, 'profile-photos');
        const blob = await fetch('https://lh3.googleusercontent.com/a-/AOh14Gi11kb5I14YqgA1wIbwjfnwYlMMX96503UEPsD7=s96-c').then(r => r.blob());
        /* uploadBytes(storageRef, blob).then((snapshot) => {
            //console.log('Uploaded a blob or file!', snapshot);
            getDownloadURL(snapshot.ref).then(url => console.log(url))
        }); */
        const snapshot = await uploadBytes(storageRef, blob)
        const photoURL = await getDownloadURL(snapshot.ref)
        console.log(photoURL)
    }

    const downloadImg = async () => {
        getDownloadURL(ref(storage, 'profile-photos'))
            .then(url => console.log(url))
    }

    const value = {
        signInWithGoogle,
        getChatrooms,
        getContacts,
        getRealtimeMessages,
        getDatabaseUserInfo,
        disconnect,
        addMessage,
        addChatroom,
        getRealtimeChatrooms,
        getRealtimeContacts,
        findContact,
        addContact,
        uploadImg,
        downloadImg,
        auth
    }

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider, useFirebase }
