"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin/checkadmin");
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          setErrorMessage("Vous n'êtes pas autorisé à accéder à cette page.");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'admin :", error);
        setErrorMessage("Erreur lors de la vérification de l'admin.");
      }
    };

    checkAdmin();
  }, []);

  const handleSetAdmin = async () => {
    try {
      const response = await fetch("/api/admin/setadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Utilisateur défini comme admin avec succès");
      } else {
        alert("Échec de la mise à jour de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setPosts(data.posts);
        } else {
          console.error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string, type: string) => {
    try {
      const response = await fetch("/api/admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(type === "user" ? { userId: id } : { postId: id }),
      });

      if (response.ok) {
        if (type === "user") {
          setUsers(users.filter((user: { id: string }) => user.id !== id));
        } else {
          setPosts(posts.filter((post: { id: string }) => post.id !== id));
        }
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!isAdmin) {
    return (
      <div>
        Vous n&apos;êtes pas autorisé à accéder à cette page. Ou patientez
        quelques instants.
      </div>
    );
  }

  return (
    <Card className="mb-4 p-4 gap-4">
      <div className="container mx-auto p-4 gap-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <h2 className="text-xl font-bold">
          Définir un utilisateur comme Admin
        </h2>

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresse e-mail de l'utilisateur"
          className="border p-2 mb-2"
        />
        <Button onClick={handleSetAdmin}>Définir comme Admin</Button>

        <Separator className="my-4" />

        <h2 className="text-xl font-bold">Utilisateurs</h2>

        {users.map((user: { id: string; name: string; email: string }) => (
          <div key={user.id} className="flex justify-between items-center mb-2">
            <li>
              <span>
                {user.name} ({user.email})
              </span>
            </li>
            <Button onClick={() => handleDelete(user.id, "user")}>
              Delete
            </Button>
          </div>
        ))}
        <Separator className="my-4" />
        <h2 className="text-xl font-bold">Posts</h2>

        {posts.map((post: { id: string; title: string }) => (
          <div key={post.id} className="flex justify-between items-center mb-2">
            <li>
              <span>{post.title}</span>
            </li>
            <Button onClick={() => handleDelete(post.id, "post")}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
