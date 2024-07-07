import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { getWorkspaces } from "./action";
import Link from "next/link";
import { SelectWorkspace } from "@/db/schema";
import WorkspaceForm from "./WorkspaceForm";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const SelectWorkspacePage = async () => {
  const workspaces: SelectWorkspace[] | null = await getWorkspaces();
  console.log(workspaces);
  return (
    <div className="flex items-center justify-center h-full w-full">
      {workspaces && workspaces.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Workspace</CardTitle>
            <CardDescription>
              Select the workspace in order to visit the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {workspaces?.map((workspace) => {
              return (
                <Link
                  key={workspace.id}
                  className="p-4 rounded-lg border flex items-center justify-between"
                  href={`workspace/${workspace.id}`}
                >
                  <p>{workspace?.name}</p>
                  <ArrowRightIcon />
                </Link>
              );
            })}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create Workspace</CardTitle>
            <CardDescription>
              Enter the name of your workpsace to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkspaceForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SelectWorkspacePage;
