import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { userAtom } from "@/store/auth.store";
import { useAtom, useSetAtom } from "jotai";
import { RoleEnum } from "@/models/enum/role-enum";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "@/main";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ChangePassword from "@/components/auth/change-password";
import api from "@/lib/api/images.api";
import { updateProfile, updateProfileToken } from "@/lib/api/profiles.api";
import { json } from "stream/consumers";
import { toast } from "sonner";

const profileSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

interface EditProfileProps {
  open: boolean;
  onOpenChange: () => void;
}

export const EditProfile = ({ open, onOpenChange }: EditProfileProps) => {
  const [user, setUser] = useAtom(userAtom);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: user,
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (file) {
      await uploadAvatar()
        .then((res) => {
          console.log("Avatar uploaded", res.public_id);
          values.avatar = res.public_id;
        })
        .catch((err) => {
          toast.error("Erreur lors de l'enregistrement de l'avatar");
        });
    }
    await updateProfileToken({ ...values })
      .then((res) => {
        setUser(res);
        toast.success("Profil mis à jour");
      })
      .catch((err) => {
        toast.error("Erreur lors de la mise à jour du profil");
      });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("upload_preset", "avatar");

    return api.uploadAvatar(formData);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col gap-4 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Modifier vos informations</SheetTitle>
          <SheetDescription>
            Modifier les informations de votre profil ici. N'oublier pas de
            sauvegarder avant de quitter.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {user.role != RoleEnum.ADMIN && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar</Label>
                  <div className="flex items-center space-x-4">
                    <AdvancedImage
                      cldImg={cld.image(user.avatar)}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <Input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {user.role != RoleEnum.ADMIN && (
              <div className="space-y-2">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              Enregistrer les modifications
            </Button>
          </form>
        </Form>

        <ChangePassword />
      </SheetContent>
    </Sheet>
  );
};
