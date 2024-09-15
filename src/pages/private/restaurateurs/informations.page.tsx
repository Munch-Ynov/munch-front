import { RegisterRestaurantForm } from "@/components/restaurant/register-restaurant.form";
import featuresApi from "@/lib/api/features.api";
import restaurantApi from "@/lib/api/restaurant.api";
import type { RestaurantWithFeatures } from "@/models/restaurant.model";
import { userAtom } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { toast } from "sonner";
import imageApi from "@/lib/api/images.api";
import { Loader } from "@/components/ui/loader";

export const InformationsPage = () => {
  const [user] = useAtom(userAtom);
  const { data: restaurant } = useQuery({
    queryKey: ["my-restaurant"],
    queryFn: async () => await restaurantApi.getRestaurantByOwner(user?.id),
    retry: false,
  });

  const { data: features } = useQuery({
    queryKey: ["features"],
    queryFn: async () => await featuresApi.getFeatures(),
  });

  const onSubmit = async (
    uRestaurant: Omit<
      RestaurantWithFeatures,
      "id" | "createdAt" | "updatedAt" | "deletedAt"
    >,
    mainPicture: Blob | null,
    pictures: Blob[]
  ) => {
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    if (mainPicture) {
      uRestaurant.main_picture = (
        await uploadMainPicture(mainPicture)
      ).public_id;
    }

    if (pictures.length) {
      uRestaurant.pictures = (await uploadPictures(pictures)).map(
        (p) => p.public_id
      );
    }

    try {
      await restaurantApi.updateRestaurant({
        ...uRestaurant,
        id: restaurant.id,
      });
      toast.success("Restaurant mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du restaurant");
    }
  };

  const uploadMainPicture = async (picture: Blob) => {
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", "restaurant");

    return imageApi.uploadPicture(formData);
  };

  const uploadPictures = async (pictures: Blob[]) => {
    const promises = pictures.map((picture) => {
      const formData = new FormData();
      formData.append("file", picture);
      formData.append("upload_preset", "restaurant");

      return imageApi.uploadPicture(formData);
    });

    return Promise.all(promises);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">
      {!(restaurant && features) ? (
        <Loader />
      ) : (
        <RegisterRestaurantForm
          restaurant={restaurant}
          features={features}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
};
