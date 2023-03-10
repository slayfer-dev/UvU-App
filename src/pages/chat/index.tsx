import React, { useContext } from "react";
import AvatarCard from "@/components/AvatarCard";
import { Acompa├▒anteContext } from "@/context";
import ChatComponent from "@/components/Chat";

export default function Chat() {
  const { name } = useContext(Acompa├▒anteContext);

  const Node = name ? <ChatComponent /> : <AvatarCard />;

  return <div className="h-full py-10 px-10 lg:pt-0">{Node}</div>;
}
