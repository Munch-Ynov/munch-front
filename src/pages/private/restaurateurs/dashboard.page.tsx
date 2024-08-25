import { CardKPI } from "@/components/kpi/card.kpi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ClipboardListIcon,
  InfoIcon,
  UsersIcon,
} from "lucide-react";

export const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardKPI
            title="Réservations Confirmées"
            value={128}
            icon="Calendar"
            subtitle="+14% par rapport à la semaine dernière"
          />
          <CardKPI
            title="Tables Disponibles"
            value={24}
            icon="ClipboardList"
            subtitle="6 tables réservées"
          />
          <CardKPI
            title="Capacité Totale"
            value={120}
            icon="Users"
            subtitle="Nombre de places assises dans tous les espaces"
          />
          <CardKPI
            title="Chiffre d'Affaires Moyen Quotidien"
            value={3240}
            icon="Info"
            subtitle="+5.2% par rapport au mois dernier"
          />
        </div>
        <Tabs defaultValue="reservations" className="mt-6">
          <TabsList>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="dining-rooms">Dining Rooms</TabsTrigger>
            <TabsTrigger value="restaurant-info">Restaurant Info</TabsTrigger>
          </TabsList>
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Party Size</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>2023-06-15</TableCell>
                      <TableCell>19:00</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>Confirmed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>2023-06-15</TableCell>
                      <TableCell>20:30</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>Pending</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bob Johnson</TableCell>
                      <TableCell>2023-06-16</TableCell>
                      <TableCell>18:00</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>Confirmed</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="dining-rooms">
            <Card>
              <CardHeader>
                <CardTitle>Dining Room Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Main Dining Room</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Capacity: 60 seats</p>
                      <p>Tables: 15</p>
                      <p>Status: Open</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Patio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Capacity: 40 seats</p>
                      <p>Tables: 10</p>
                      <p>Status: Open (Weather Permitting)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Private Room</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Capacity: 20 seats</p>
                      <p>Tables: 5</p>
                      <p>Status: Available for Reservations</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="restaurant-info">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Restaurant Name</Label>
                    <Input
                      id="restaurant-name"
                      placeholder="Enter restaurant name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter restaurant address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Operating Hours</Label>
                    <Input id="hours" placeholder="Enter operating hours" />
                  </div>
                  <Button>Update Information</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
