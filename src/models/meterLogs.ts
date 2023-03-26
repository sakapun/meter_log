import {collection, doc, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {MeterData, MeterValues} from "@/types";

export const saveMeterData = async (data: MeterData) => {
  const yearStr = data.year.toString();
  const monthStr = data.month.toString().padStart(2, "0");
  const docRef = doc<MeterValues>(collection(db, "meters", yearStr, monthStr));

  try {
    await setDoc(docRef, { values: data.meters });
    console.log("データの保存に成功しました");
  } catch (error) {
    console.error("データの保存に失敗しました", error);
  }
};

export const fetchMeters = async (): Promise<MeterData[]> => {
  const q = query(collection(db, 'meters'))
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs)
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      year: data.year,
      month: data.month,
      meters: data.values,
    };
  });
};

