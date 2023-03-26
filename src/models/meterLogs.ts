import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { MeterValues } from "@/types";

const saveMeterData = async (year: number, month: number, meterValues: MeterValues) => {
  const yearStr = year.toString();
  const monthStr = month.toString().padStart(2, "0");
  const docRef = doc<MeterValues>(collection(db, "meters", yearStr, monthStr), "data");

  try {
    await setDoc(docRef, { values: meterValues });
    console.log("データの保存に成功しました");
  } catch (error) {
    console.error("データの保存に失敗しました", error);
  }
};
