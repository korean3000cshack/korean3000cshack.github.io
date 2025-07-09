import {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { db } from "./firebase.js";

export const DAO = {
  // Add methods to interact with the Firestore database
  async addData(collection, data) {
    try {
      const docRef = await this.db.collection(collection).add(data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  },

  async getData(collection, id) {
    try {
      const doc = await this.db.collection(collection).doc(id).get();
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      throw error;
    }
  },

  // Add more methods as needed
};
