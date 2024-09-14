import ChangePassword from "@/components/auth/change-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useConfirm } from "@/hooks/useConfirm";
import imageApi from "@/lib/api/images.api";
import { updateProfileToken } from "@/lib/api/profiles.api";
import { cld } from "@/main";
import { RoleEnum } from "@/models/enum/role-enum";
import { userAtom } from "@/store/auth.store";
import { AdvancedImage } from "@cloudinary/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { LogOut, UserCircle2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  const { confirm } = useConfirm();
  const { logout } = useAuth();

  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: user,
    resolver: zodResolver(profileSchema),
  });

  const handleLogout = async () => {
    const isConfirmed = await confirm({
      content:
        "Vous êtes sur le point de vous déconnecter. Êtes-vous sûr de vouloir continuer ?",
    });
    if (isConfirmed) {
      logout().catch((err) => {
        toast.error("Erreur lors de la déconnexion");
      });
    }
  };

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

    return imageApi.uploadPicture(formData);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col gap-4 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Vos informations</SheetTitle>
          <SheetDescription>
            Modifier les informations de votre profil ici. N'oublier pas de
            sauvegarder avant de quitter.
          </SheetDescription>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
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
                        {file ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : user.avatar ? (
                          <AdvancedImage
                            cldImg={cld.image(user.avatar)}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <UserCircle2Icon className="w-12 h-12 text-primary" />
                        )}
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
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Se déconnecter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
