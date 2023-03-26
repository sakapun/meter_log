import { doc, setDoc } from "firebase/firestore";
import {db} from "@/firebase";

const saveMeterData = async (yearMonth: string, meterValues: number[]) => {
  const docRef = doc(db, "meters", yearMonth);

  try {
    await setDoc(docRef, { values: meterValues });
    console.log("データの保存に成功しました");
  } catch (error) {
    console.error("データの保存に失敗しました", error);
  }
};
