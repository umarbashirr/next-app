import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import LoginForm from "../_components/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Card className="w-full max-w-[450px]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Welcome Back! We are happy to see you again
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm text-center">
          Don&lsquo;t have an account?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold">
            Create now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
