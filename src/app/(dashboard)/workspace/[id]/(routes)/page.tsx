import { redirect } from "next/navigation";
import React from "react";

const SingleWorkspacePage = ({ params }: { params: { id: string } }) => {
  if (!params.id) {
    redirect("/select-workspace");
  }

  redirect(`/workspace/${params?.id}/dashboard`);
};

export default SingleWorkspacePage;
