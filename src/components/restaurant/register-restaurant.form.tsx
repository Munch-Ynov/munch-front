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
import { Label } from "../ui/label";
import imageApi from "@/lib/api/images.api";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";

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
  main_picture: z.string(),
  pictures: z.array(z.string()),
  features: z.array(z.string()),
});

export function RegisterRestaurantForm({
  restaurant,
  features,
}: {
  restaurant: RestaurantWithFeatures;
  features: RestaurantFeatureWithCategory[];
}) {
  const [mainPicture, setMainPicture] = useState<File | null>(null);
  const [pictures, setPictures] = useState<File[]>([]);
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
    form.setValue(
      "features",
      featuresValue.map((f) => f.value)
    );
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
      main_picture: restaurant?.main_picture ?? "",
      pictures: restaurant?.pictures ?? [],
      features: restaurant?.features.map((f) => f.id) ?? [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (mainPicture) {
      const mainPicture = await uploadMainPicture();
      values.main_picture = mainPicture.public_id;
    }

    if (pictures.length) {
      const pictures = await uploadPictures();
      values.pictures = pictures.map((p) => p.public_id);
    }

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
          main_picture: values.main_picture,
          pictures: values.pictures,
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
  const submit = form.handleSubmit(onSubmit);

  const handleMainPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainPicture(e.target.files?.[0] || null);
  };

  const handlePicturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPictures(Array.from(e.target.files ?? []));
  };

  const uploadMainPicture = async () => {
    const formData = new FormData();
    formData.append("file", mainPicture as Blob);
    formData.append("upload_preset", "restaurant");

    return imageApi.uploadPicture(formData);
  };

  const uploadPictures = async () => {
    const promises = pictures.map((picture) => {
      const formData = new FormData();
      formData.append("file", picture as Blob);
      formData.append("upload_preset", "restaurant");

      return imageApi.uploadPicture(formData);
    });

    return Promise.all(promises);
  };

  return (
    <div className="flex flex-col justify-end items-end gap-4">
      <Button onClick={submit} className="col-span-6">
        Enregistrer
      </Button>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <Card className="w-full lg:w-2/3">
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
                        <FormLabel className="whitespace-nowrap">
                          Email associé à l'établissement
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="chez.john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 md:col-span-3">
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
                <div className="col-span-6 md:col-span-1">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="whitespace-nowrap">
                          Gamme de prix
                        </FormLabel>
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
                              <SelectItem
                                value={PriceCategoryEnum.VERY_EXPENSIVE}
                              >
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

                <div className="col-span-6 md:col-span-6">
                  <FormField
                    control={form.control}
                    name={`features`}
                    render={() => (
                      <FormItem>
                        <FormLabel>Caractéristiques</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            placeholder="Sélectionner les caractéristiques"
                            hidePlaceholderWhenSelected
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
                <div className="col-span-6 md:col-span-3">
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
                <div className="col-span-6 md:col-span-3">
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
                <div className="col-span-6 md:col-span-6">
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
                <div className="col-span-6 md:col-span-3">
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
                <div className="col-span-6 md:col-span-3">
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
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">Image principale</CardTitle>
            </CardHeader>
            <CardContent>
              {mainPicture ? (
                <img
                  src={URL.createObjectURL(mainPicture)}
                  alt="main_picture"
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
              ) : restaurant?.main_picture ? (
                <AdvancedImage
                  cldImg={cld.image(restaurant?.main_picture)}
                  alt="main_picture"
                  className="w-full h-28 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-full h-24 bg-gray-200 rounded-md mb-2" />
              )}
              <Input
                id="main_picture"
                name="main_picture"
                type="file"
                accept="image/*"
                onChange={handleMainPictureChange}
              />
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">Gallerie photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap w-full gap-2 mb-2">
                {pictures.length > 0 ? (
                  pictures.map((picture, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(picture)}
                      alt="picture"
                      className="min-w-5/12 h-24 aspect-auto object-cover rounded-md"
                    />
                  ))
                ) : restaurant?.pictures && restaurant.pictures.length > 0 ? (
                  restaurant.pictures.map((picture, index) => (
                    <AdvancedImage
                      key={index}
                      cldImg={cld.image(picture)}
                      alt="picture"
                      className="min-w-5/12 h-24 aspect-auto object-cover rounded-md"
                    />
                  ))
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gray-200 rounded-md" />
                    <div className="w-10 h-24 bg-gray-200 rounded-md" />
                    <div className="w-20 h-24 bg-gray-200 rounded-md" />
                  </>
                )}
              </div>
              <Input
                id="pictures"
                name="pictures"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePicturesChange}
              />
              {/* preview pictures */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
