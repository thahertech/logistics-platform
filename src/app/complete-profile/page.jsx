"use client";
import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("profiles").update({
      company_name: company,
      role,
    }).eq("id", user.id);

    router.push("/oma-tili");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company Name"
        required
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Your Role"
        required
      />
      <button type="submit">Save & Continue</button>
    </form>
  );
}