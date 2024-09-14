import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { RoleEnum } from "@/models/enum/role-enum";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "../ui/badge";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  // Add a new field to the form schema
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
});

export function RegisterProfileForm({ role }: { role: RoleEnum }) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [roleSelected, setRoleSelected] = useState<RoleEnum>(role);
  const [defaultValues, setDefaultValues] = useState({
    email: "john.doe@example.com",
    password: "!Password123",
    name: "John Doe",
    phone: "+33123456789",
  });

  useEffect(() => {
    setRoleSelected(role);
    if (role === RoleEnum.RESTAURATEUR) {
      setDefaultValues({
        email: "bernard.loiseau@example.com",
        password: "!Password123",
        name: "Bernard Loiseau",
        phone: "+33234567890",
      });
    } else {
      setDefaultValues({
        email: "john.doe@example.com",
        password: "!Password123",
        name: "John Doe",
        phone: "+33123456789",
      });
    }
  }, [role]);

  useEffect(() => {}, [defaultValues]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (role === RoleEnum.RESTAURATEUR) {
      register("bernard.loiseau@example.com", "!Password123", role, {
        name: "Bernard Loiseau",
        phone: "+33234567890",
      }).then(() => {
        navigate("/", { replace: true });
      });
    } else {
      ///
      const { email, password } = values;
      const profile = {
        name: values.name,
        phone: values.phone,
      };

      register(email, password, role, profile).then(() => {
        navigate("/", { replace: true });
      });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <span>👋</span>
              {roleSelected === RoleEnum.RESTAURATEUR && (
                <Badge variant="outline">Restaurateur</Badge>
              )}
            </div>
            <span className="text-3xl text-primary font-bold">S'inscrire</span>
          </div>
        </CardTitle>
        <CardDescription>
          Créer un compte pour accéder à votre espace personnel{" "}
          {roleSelected === RoleEnum.USER
            ? "en tant qu'utilisateur"
            : "en tant que restaurateur"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="John Do" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="+33123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte?{" "}
          <Link to="/login" className="underline">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
