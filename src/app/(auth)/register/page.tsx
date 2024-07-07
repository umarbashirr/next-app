import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <Card className="w-full max-w-[450px]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Fill out the below form to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold">
            Login now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
