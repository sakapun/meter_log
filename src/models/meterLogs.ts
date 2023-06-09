import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  getDoc
} from "firebase/firestore";
import {db} from "@/firebase";
import {MeterData} from "@/types";

const meterDataConverter: FirestoreDataConverter<MeterData> = {
  toFirestore: (data: MeterData) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<MeterData>): MeterData => {
    return snapshot.data();
  },
};

export const saveMeterData = async (data: MeterData) => {
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
  return querySnapshot.docs.map((doc) => {
    return doc.data();
  });
};

export const fetchMeterByYearMonth = async (
  year: number,
  month: number
): Promise<MeterData | undefined> => {
  const docRef = doc<MeterData>(
    collection(db, "meters").withConverter(meterDataConverter),
    `${year}-${month}`
  );
  const docSnapshot = await getDoc<MeterData>(docRef);

  return docSnapshot.data();
};

