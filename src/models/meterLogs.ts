import {collection, doc, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {MeterData} from "@/types";

const meterDataConverter = {
  toFirestore: (data: MeterData) => data,
  fromFirestore: (snapshot): MeterData => {
    return snapshot.data();
  },
};

export const saveMeterData = async (data) => {
  const docId = `${data.year}-${data.month}`;
  const docRef = doc<MeterData>(collection(db, "meters").withConverter(meterDataConverter), docId);

  try {
    await setDoc(docRef, data);
    console.log("データの保存に成功しました");
  } catch (error) {
    console.error("データの保存に失敗しました", error);
  }
};

export const fetchMeters = async (): Promise<MeterData[]> => {
  const q = query<MeterData>(collection(db, 'meters').withConverter(meterDataConverter))
  const querySnapshot = await getDocs<MeterData>(q);
  console.log(querySnapshot.docs)
  return querySnapshot.docs.map((doc) => {
    return doc.data();
  });
};

