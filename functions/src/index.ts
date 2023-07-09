import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

// exports.api = functions.region("europe-west1").https.onRequest(app)

// Create a Cloud Function
export const getTodos = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  try {
    // Get a reference to the "todos" collection in Firestore
    const todosRef = admin.firestore().collection("todos");

    // Retrieve all documents in the "todos" collection
    const snapshot = await todosRef.get();

    // Extract the data from the documents
    const todos: any[] = [];
    snapshot.forEach((doc) => {
      todos.push(doc.data());
    });

    // Send the todos as a response
    response.json(todos);
  } catch (error) {
    console.error("Error retrieving todos:", error);
    response.status(500).send("Internal Server Error");
  }
});

