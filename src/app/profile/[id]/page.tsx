"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserProfile({ params }: any) {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  
  return (
    <center>
      <h2 className="text-2xl font-bold mt-10">User Id - {params.id}</h2>
      <br />
      <button
        onClick={logout}
        className="mt-10 py-2 px-4 bg-red-600 text-white rounded-lg font-medium"
      >
        Logout
      </button>
    </center>
  );
}
