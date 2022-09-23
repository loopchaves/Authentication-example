import { auth, db } from "./firebaseCfg";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  // deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteField
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  sendPasswordResetEmail,
  EmailAuthProvider,
  signInWithCredential,
  updateEmail,
  updatePassword
} from "firebase/auth";

import Feedback from "../components/layout/Feedback";

const userPattern = (currentUser) => {
  return {
    uid: currentUser.uid,
    name: currentUser.displayName,
    email: currentUser.email,
    emailVerified: currentUser.emailVerified,
    creationDate: new Date(parseInt(currentUser.metadata.createdAt)).toLocaleString(),
    lastLogin: new Date(parseInt(currentUser.metadata.lastLoginAt)).toLocaleString()
  }
}

export const handlerVerifyUser = async () => {
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (currentUser) => {
      currentUser ? resolve(userPattern(currentUser)) : resolve(null);
    });
  });
  return user;
}

export const handlerVerifyPasswordCode = async (actionCode) => {
  const email = await verifyPasswordResetCode(auth, actionCode);
  return email;
}

export const handlerVerifyEmailCode = async (actionCode) => {
  await applyActionCode(auth, actionCode);
  await auth.currentUser?.reload();
}

export const handlerTryLogin = async (values) => {
  const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
  return userPattern(userCredential.user);
}

export const handlerTryLogout = async () => {
  await signOut(auth);
  return null;
}

export const handlerTrySignup = async (values) => {
  const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
  await updateProfile(userCredential.user, { displayName: values.name });
  await setDoc(doc(db, 'users', userCredential.user.uid), { name: values.name });
  await sendEmailVerification(userCredential.user);
  return userPattern(userCredential.user);
}

export const handlerTryPasswordReset = async (values) => {
  await confirmPasswordReset(auth, values.actionCode, values.newPassword);
  const userCredential = await signInWithEmailAndPassword(auth, values.email, values.newPassword);
  return userPattern(userCredential.user);
}

export const handlerTrySendPasswordResetEmail = async (values) => {
  await sendPasswordResetEmail(auth, values.email);
}

export const handlerTryEditUser = async (values) => {
  const credential = EmailAuthProvider.credential(values.initial.email, values.form.password);
  const userCredential = await signInWithCredential(auth, credential);
  const user = userCredential.user;

  if (values.form.name !== values.initial.name) {
    await updateProfile(user, { displayName: values.form.name });
    await updateDoc(doc(db, 'users', user.uid), { name: values.form.name });
  }

  if (values.form.email !== values.initial.email) {
    await updateEmail(user, values.form.email);
    await sendEmailVerification(user);
  }

  if (values.form.newPassword) {
    await updatePassword(user, values.form.newPassword);
    const credential = EmailAuthProvider.credential(values.initial.email, values.form.newPassword);
    await signInWithCredential(auth, credential);
  }

  await auth.currentUser?.reload();
  return userPattern(auth.currentUser ? auth.currentUser : user);
}

export const handlerSaveStyle = async (values) => {
  if (values.style.color || values.style.ftype || values.style.fsize) {
    await updateDoc(doc(db, 'users', values.uid), { style: values.style });
  } else {
    await updateDoc(doc(db, 'users', values.uid), { style: deleteField() });
  }
  return values.style;
}

export const handlerGetStyle = async (uid) => {
  const user = await getDoc(doc(db, 'users', uid));
  return user.data().style;
}

export const handlerSendFeedback = async (values) => {
  const feedback = {
    user: values.uid,
    date: new Date().getTime(),
    feedback: values.feedback
  }
  await addDoc(collection(db, 'feedbacks'), feedback);
  return <Feedback
    name={values.name}
    date={feedback.date}
    feedback={feedback.feedback}
  />
}

export const handlerGetFeedbacks = async () => {
  const feedbacks = await getDocs(collection(db, 'feedbacks'));
  const users = await getDocs(collection(db, 'users'));
  if (!feedbacks.empty) {
    let uids = {}, arrObj = [];
    users.forEach((user) => uids = { ...uids, [user.id]: user.data().name });
    feedbacks.forEach((feedback) => {
      arrObj.push({
        name: uids[feedback.data().user],
        date: feedback.data().date,
        feedback: feedback.data().feedback
      });
    });
    console.log(uids);
    console.log(arrObj.sort((a, b) => a.date - b.date));
    return arrObj
      .sort((a, b) => a.date - b.date)
      .map((obj, i) => {
        return <Feedback
          key={i}
          name={obj.name}
          date={obj.date}
          feedback={obj.feedback}
        />
      })
      .reverse();
  }
}