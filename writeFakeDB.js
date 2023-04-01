
import * as fakedb from './fakedb.json';
import { writeToDB } from './Firebase/firestoreHelper';

export function writeFakeDB() {
  console.log(fakedb);
  console.log(fakedb["users"]);
  console.log(fakedb["mentors"]);
  console.log(fakedb["mentees"]);
  fakedb["users"].forEach((doc) => {
      writeToDB(doc, "users");
    });
    fakedb["mentors"].forEach((doc) => {
    writeToDB(doc, "mentors");
  });
  fakedb["mentees"].forEach((doc) => {
    writeToDB(doc, "mentees");
  });
  fakedb["mentorships"].forEach((doc) => {
    writeToDB(doc, "mentorships");
  });
}


