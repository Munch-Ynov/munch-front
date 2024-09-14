import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function ChangePassword() {
  const [wantToChange, setWantToChange] = useState(false);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("data", data);
        })}
        className="space-y-6"
      >
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onCheckedChange={setWantToChange} />
          <Label htmlFor="airplane-mode">Changer le mot de passe</Label>
        </div>

        {wantToChange && (
          <div className="space-y-2">
            <FormField
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ancien mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau mot de passe</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {wantToChange ? "Changer le mot de passe" : "Enregistrer"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
