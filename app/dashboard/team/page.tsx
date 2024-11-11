"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Badge } from "@/app/_components/ui/badge";
import { Sheet, SheetContent } from "@/app/_components/ui/sheet";
import {
  Building2,
  Calendar,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
import TeamForm from "./components/team-form";
import PageHeaderWithForm from "@/app/_components/page-header/page-header-with-form";
import DisplayCard from "@/app/_components/display-card";
import { User } from "@/db/drizzle/schema/users";
import { getAllUsers } from "./actions";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<User[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    console.log(id);
    // setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        const user = await getAllUsers();
        setTeamMembers(Array.isArray(user) ? user : [user]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch team members",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <PageHeaderWithForm
        description="View contact information of all the team members."
        header="Team"
        formType="TEAM"
        buttonText="New Member"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <DisplayCard
          description="This is a description"
          icon={Calendar}
          title="Team Member"
          digit={23}
        />
        <DisplayCard
          description="This is a description"
          icon={Calendar}
          title="Team Member"
          digit={23}
        />
        <DisplayCard
          description="This is a description"
          icon={Calendar}
          title="Team Member"
          digit={23}
        />
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers?.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardHeader className="border-b p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10">
                        {getInitials(member.firstName, member.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold leading-none">
                        {`${member.firstName} ${member.lastName}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{member.phoneNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{member.branch}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="line-clamp-2">{member.address}</span>
                    </div>
                    <div className="pt-2">
                      <Badge
                        variant={
                          member.status === "ACTIVE" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-xs">
                            {getInitials(member.firstName, member.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{`${member.firstName} ${member.lastName}`}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.title}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phoneNumber}</TableCell>
                    <TableCell>{member.branch}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.status === "ACTIVE" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingMember(member);
                            setIsOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-[540px] overflow-y-auto">
          <TeamForm
            onClose={() => setIsOpen(false)}
            mode="edit"
            initialValues={{
              password: editingMember?.hashedPassword || "",
              address: editingMember?.address || "",
              title: editingMember?.title || "",
              role: editingMember?.role || "USER",
              firstName: editingMember?.firstName || "",
              lastName: editingMember?.lastName || "",
              email: editingMember?.email || "",
              phoneNumber: editingMember?.phoneNumber || "",
              branch: editingMember?.branch || "AUSTRALIA",
              status: editingMember?.status || "ACTIVE",
              middleName: editingMember?.middleName || "",
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
