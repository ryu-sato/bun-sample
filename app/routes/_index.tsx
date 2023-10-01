import type { V2_MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/kanbans");
  }, [navigate]);
}
