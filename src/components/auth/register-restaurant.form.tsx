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
import MultipleSelector from "@/components/ui/multiselect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useConfirm } from "@/hooks/useConfirm";
import { PriceCategoryEnum } from "@/models/enum/price-category.enum";
import { RestaurantFeatureWithCategory } from "@/models/restaurant-feature.model";
import { RestaurantWithFeatures } from "@/models/restaurant.model";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import restaurantApi from "@/lib/api/restaurant.api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  address: z.string(),
  n_siret: z
    .string()
    .length(14, { message: "Siret number must be 14 characters long" }),
  code_postal: z
    .string()
    .length(5, { message: "Postal code must be 5 characters long" }),
  city: z.string(),
  country: z.string(),
  price: z.string(),
  features: z.array(z.string()),
});

export function RegisterRestaurantForm({
  restaurant,
  features,
}: {
  restaurant: RestaurantWithFeatures;
  features: RestaurantFeatureWithCategory[];
}) {
  const { confirm } = useConfirm();
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
    defaultValues: {
      name: restaurant?.name ?? "",
      description: restaurant?.description ?? "",
      email: restaurant?.email ?? "",
      phone: restaurant?.phone ?? "",
      address: restaurant?.address ?? "",
      n_siret: restaurant?.n_siret ?? "",
      code_postal: restaurant?.code_postal ?? "",
      city: restaurant?.city ?? "",
      price: restaurant?.price ?? "",
      features: restaurant?.features.map((f) => f.id) ?? [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isConfirm = await confirm({
      content: "Êtes-vous sûr de vouloir enregistrer ces informations ?",
    });
    if (isConfirm) {
      restaurantApi
        .updateRestaurant({
          ...values,
          id: restaurant.id,
          price: values.price as PriceCategoryEnum,
          name: values.name,
          description: values.description,
          email: values.email,
          phone: values.phone,
          address: values.address,
          n_siret: values.n_siret,
          code_postal: values.code_postal,
          city: values.city,
        })
        .then(() => {
          toast.success("Informations enregistrées avec succès");
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "Une erreur s'est produite lors de l'enregistrement des informations"
          );
        });
    }
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
            <div className="col-span-6 md:col-span-2">
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
            <div className="col-span-6 md:col-span-2">
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
            <div className="col-span-6 md:col-span-2">
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
            <div className="col-span-6 md:col-span-1">
              <FormField
                control={form.control}
                name="price"
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

            <div className="col-span-6 md:col-span-5 mb-2">
              <FormField
                control={form.control}
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
                                features.find((f) => f.id === v.value)?.category
                                  .name ?? "",
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

            <div className="col-span-6 md:col-span-6">
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
            <div className="col-span-6 md:col-span-2">
              <FormField
                control={form.control}
                name="n_siret"
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
            <div className="col-span-6 md:col-span-2">
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
            <div className="col-span-6 md:col-span-1">
              <FormField
                control={form.control}
                name="code_postal"
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
            <div className="col-span-6 md:col-span-1">
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
