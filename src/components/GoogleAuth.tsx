import { useRouter } from 'next/router';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { auth } from "@/index/firebase";

export const GoogleAuth = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('Googleログイン成功');
      router.push('/'); // ホームへの遷移
    } catch (error) {
      console.error('Googleログイン失敗:', error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn}>Googleでログイン</Button>
  );
};
