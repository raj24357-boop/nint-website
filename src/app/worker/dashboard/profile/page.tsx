"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WorkerProfilePage() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const response = await fetch("/api/worker/profile", { cache: "no-store" });
      if (!response.ok) {
        router.push("/login");
        return;
      }
      const data = await response.json();
      if (data.worker) {
        setBio(data.worker.bio ?? "");
        setCity(data.worker.city ?? "");
        setHourlyRate(String(data.worker.hourlyRate ?? ""));
        setWhatsappNumber(data.worker.whatsappNumber ?? "");
        setSkills(data.worker.skills?.map((skill: { name: string }) => skill.name).join(", ") ?? "");
      }
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const response = await fetch("/api/worker/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio,
        skills,
        hourlyRate,
        whatsappNumber,
        city,
      }),
    });

    setSaving(false);
    if (response.ok) {
      router.push("/worker/dashboard");
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-600">Loading your profile...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Worker profile</CardTitle>
          <CardDescription>Tell customers who you are, what you offer, and how to reach you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="min-h-28 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Describe your experience, service area, and expertise"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                value={skills}
                onChange={(event) => setSkills(event.target.value)}
                placeholder="Plumbing, Electrical, Painting"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="1"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  placeholder="300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  value={whatsappNumber}
                  onChange={(event) => setWhatsappNumber(event.target.value)}
                  placeholder="919999999999"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City / Location</Label>
              <Input
                id="city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Hyderabad"
              />
            </div>

            <Button type="submit" disabled={saving} className="bg-primary text-white hover:bg-blue-700">
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
