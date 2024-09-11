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
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MultipleSelector from "../ui/multiselect";
import { RestaurantWithFeatures } from "@/models/restaurant.model";
import { PriceCategoryEnum } from "@/models/enum/price-category.enum";
import { useEffect, useState } from "react";
import { RestaurantFeatureWithCategory } from "@/models/restaurant-feature.model";

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
  priceRange: z.string(),
  features: z.array(string()),
});

export function RegisterRestaurantForm({
  restaurant,
  features,
}: {
  restaurant: RestaurantWithFeatures;
  features: RestaurantFeatureWithCategory[];
}) {
  const [featuresValue, setFeaturesValue] = useState(
    restaurant?.features.map((f) => ({
      label: features.find((feature) => feature.id === f.id)?.name ?? "",
      value: f.id,
      categoryName:
        features.find((feature) => feature.id === f.id)?.category.name ?? "",
    })) ?? []
  );

  useEffect(() => {
    console.log("featuresValue", featuresValue);
    form.setValue(
      "features",
      featuresValue.map((f) => f.value)
    );
    console.log("form", form.getValues());
  }, [featuresValue]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: restaurant?.name,
      description: restaurant?.description,
      email: restaurant?.email,
      phone: restaurant?.phone,
      address: restaurant?.address,
      siretNumber: restaurant?.n_siret,
      postalCode: restaurant?.code_postal,
      city: restaurant?.city,
      priceRange: restaurant?.price,
      features: restaurant?.features.map((f) => f.id) ?? [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    confirm("Êtes-vous sûr de vouloir enregistrer ces informations ?");
    console.log("Form values:", values);
  };

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
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email associé à l'établissement</FormLabel>
                    <FormControl>
                      <Input placeholder="chez.john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du restaurant</FormLabel>
                    <FormControl>
                      <Input placeholder="Chez John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
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
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gamme de prix</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner la gamme de prix" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={PriceCategoryEnum.ECO}>
                            €
                          </SelectItem>
                          <SelectItem value={PriceCategoryEnum.MODERATE}>
                            €€
                          </SelectItem>
                          <SelectItem value={PriceCategoryEnum.EXPENSIVE}>
                            €€€
                          </SelectItem>
                          <SelectItem value={PriceCategoryEnum.VERY_EXPENSIVE}>
                            €€€€
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {features && (
              <div className="col-span-5 mb-2">
                <FormField
                  name={`features`}
                  render={() => (
                    <FormItem>
                      <FormLabel>Caractéristiques</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          placeholder="Sélectionner les caractéristiques"
                          options={features?.map((f) => ({
                            label: f.name,
                            value: f.id,
                            categoryName: f.category.name,
                          }))}
                          value={featuresValue}
                          onChange={(values) =>
                            setFeaturesValue(
                              values.map((v) => ({
                                ...v,
                                categoryName:
                                  features.find((f) => f.id === v.value)
                                    ?.category.name ?? "",
                              }))
                            )
                          }
                          groupBy="categoryName"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        className="min-h-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
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
            <div className="col-span-2">
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
            <div className="col-span-1">
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
            <div className="col-span-1">
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

            <Button type="submit" className="w-full col-span-6">
              Enregistrer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
