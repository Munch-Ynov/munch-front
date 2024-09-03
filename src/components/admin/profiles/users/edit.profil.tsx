import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userAtom } from "@/store/auth.store";
import { useAtom } from "jotai";
import { RoleEnum } from "@/models/enum/role-enum";

interface EditProfileProps {
  open: boolean;
  onOpenChange: () => void;
}

export const EditProfile = ({ open, onOpenChange }: EditProfileProps) => {
  const [user] = useAtom(userAtom);
  const [profile, setProfile] = useState(user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Updated profile:", profile);
    // Here you would typically send the updated profile to your backend
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setProfile((prev: any) => ({ ...prev, role: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev: any) => ({
          ...prev,
          [event.target.name]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Modifier vos informations</SheetTitle>
          <SheetDescription>
            Modifier les informations de votre profil ici. N'oublier pas de
            sauvegarder avant de quitter.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {user.role != RoleEnum.ADMIN && (
            <>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center space-x-4">
                  <img
                    src={profile.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={profile.password}
              onChange={handleChange}
            />
          </div>
          {user.role != RoleEnum.ADMIN && (
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            Enregistrer les modifications
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
