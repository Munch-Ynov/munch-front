import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle } from "lucide-react";

export const ErrorComponent = ({ error }: { error: any }) => {
  toast.error(error.message);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-destructive">
          <AlertCircle className="w-6 h-6 mr-2" />
          Erreur de chargement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Une erreur s'est produite lors du chargement des données. Veuillez
          réessayer ou contacter le support si le problème persiste.
        </p>
      </CardContent>
    </Card>
  );
};
