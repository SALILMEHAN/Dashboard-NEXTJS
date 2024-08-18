'use client'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router=useRouter();
  const {user}= useSelector(store=>store.user);
  if(!user) router.push('/sign-in');
  else router.push('/dashboard');
  return (
    <div>
      Home Page
    </div>
  );
}
