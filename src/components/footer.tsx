import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background border-t" >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/img/logo.svg" width="96" height="32" alt="Munch" />
            </div>
            <p className="text-sm text-muted-foreground">
              Révolutionner la façon dont vous dînez à l'extérieur.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><Link to="/a-propos" className="text-sm text-muted-foreground hover:text-primary">À Propos de Nous</Link></li>
              <li><Link to="/carrieres" className="text-sm text-muted-foreground hover:text-primary">Carrières</Link></li>
              <li><Link to="/presse" className="text-sm text-muted-foreground hover:text-primary">Presse</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link to="/conditions" className="text-sm text-muted-foreground hover:text-primary">Conditions d'Utilisation</Link></li>
              <li><Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-primary">Politique de Confidentialité</Link></li>
              <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">Politique de Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="mailto:support@Munch.com" className="text-sm text-muted-foreground hover:text-primary">support@Munch.com</Link></li>
              <li><Link to="tel:+33123456789" className="text-sm text-muted-foreground hover:text-primary">+33 1 23 45 67 89</Link></li>
              <li><address className="text-sm text-muted-foreground not-italic">123 Rue de la Table, 31400 Toulouse, France</address></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Munch. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer >
  );
};
