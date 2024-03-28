"use client";

import Button from "../components/button";
import Input from "../components/input";
import AuthService from "../services/authService";
import UserService from "../services/userService";
import connectionValidators from "../services/validators/connectionValidator";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Index() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const next = searchParams.get("next") ?? "";

  const [isConnected, setIsConnected] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    setIsConnected(!!UserService.currentUser());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && isConnected) {
      router.push("/admin/dashboard");
    }
  }, [isConnected, router, isLoading]);

  const onSubmit = async () => {
    setIsLoading(true);
    const error = connectionValidators.isLoginFormValid({
      email,
      password,
    });

    if (error) {
      setError(error);
      return;
    }

    try {
      const err = await AuthService.login(email!, password!);
      if (err) {
        setError(err);
      } else {
        if (next) {
          router.push(`/${next}`);
        } else {
          router.push("/");
        }
      }
    } catch {
      setError("Une erreur s'est produite");
      setIsLoading(false);
    }
  };

  return !isConnected && !isLoading ? (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <Input title="Email" name="email" onChange={setEmail} />
          <Input
            title="Mot de passe"
            name="password"
            link={{
              title: "Mot de passe oublié",
              href: "/",
            }}
            onChange={setPassword}
          />

          <Button
            title="Se connecter"
            onClick={onSubmit}
            disabled={isLoading}
          />
        </form>
        {error && <p className="text-red-600">{error}</p>}
        <p className="mt-5 text-center text-sm text-gray-500">
          <a
            href={`/register?next=${next}`}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
          >
            S&apos;incrire
          </a>
        </p>
      </div>
    </div>
  ) : (
    <></>
  );
}
