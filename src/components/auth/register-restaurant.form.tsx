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
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Euro } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z.string(),
  siretNumber: z
    .string()
    .length(14, { message: "Siret number must be 14 characters long" }),
  postalCode: z
    .string()
    .length(5, { message: "Postal code must be 5 characters long" }),
  city: z.string(),
  country: z.string(),
  priceRange: z.number().int().min(1).max(5),
});

export function RegisterRestaurantForm({ isNew }: { isNew?: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Chez John",
      description: "Restaurant de qualité",
      email: "chez-john@gmail.com",
      phone: "+33123456789",
      address: "1 rue de la paix",
      siretNumber: "12345678901234",
      postalCode: "31500",
      city: "Toulouse",
      country: "France",
      priceRange: 3,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Votre restaurant</CardTitle>
        <CardDescription>
          Retrouvez ici toutes les informations concernant votre restaurant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-6 gap-4"
          >
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email associé à l'établissement</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du restaurant</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="priceRange"
                render={() => (
                  <FormItem>
                    <FormLabel>Gamme de prix</FormLabel>
                    <FormControl>
                      {/* button group */}
                      <ToggleGroup
                        type="single"
                        variant={"outline"}
                        className="flex justify-around"
                      >
                        <ToggleGroupItem value="1" aria-label="Toggle €">
                          <Euro className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="2" aria-label="Toggle €">
                          <Euro className="h-4 w-4" />
                          <Euro className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="3" aria-label="Toggle €">
                          <Euro className="h-4 w-4" />
                          <Euro className="h-4 w-4" />
                          <Euro className="h-4 w-4" />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
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
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="siretNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro SIRET</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678901234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="1 rue de la paix" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Postal</FormLabel>
                    <FormControl>
                      <Input placeholder="31500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input placeholder="Toulouse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pays</FormLabel>
                    <FormControl>
                      <Input placeholder="France" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full col-span-6" type="submit">
              Enregistrer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
