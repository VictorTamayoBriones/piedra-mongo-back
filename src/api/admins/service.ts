import * as firebase from "../database/firebase";

const firebaseAuth = firebase.auth();
const firestore = firebase.firestore();

async function addAdminUser(data: any) {
  try {
    const userRecord = await firebaseAuth.createUser({
      email: data.email,
      displayName: 'ADMIN',
      emailVerified: true,
      password: data.password,
    });

    await firestore.collection("admins").doc(userRecord.uid).set({
      name: data.name,
      uid: userRecord.uid,
      password: data.password,
      userType: data.userType,
      email: data.email,
    });
    return "user added";
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateAdminUser(data: any) {
  try {
    await firebaseAuth.updateUser(data.uid, {
      email: data.email,
      password: data.password,
    });

    await firestore.collection("admins").doc(data.uid).update({
      name: data.name,
      password: data.password,
      email: data.email,
    });
    return "user updated";
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function deleteUserAdmin(id: string) {
  try {
    await firebaseAuth.deleteUser(id);
    await firestore.collection("admins").doc(id).delete();
    return "user deleted";
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export { addAdminUser, updateAdminUser, deleteUserAdmin };
