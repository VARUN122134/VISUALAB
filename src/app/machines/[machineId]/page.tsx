import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonShell } from "@/components/LessonShell";
import { getMachine, machineCatalogue } from "@/content";

export function generateStaticParams() {
  return machineCatalogue.map((machine) => ({ machineId: machine.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ machineId: string }>;
}): Promise<Metadata> {
  const { machineId } = await params;
  const machine = getMachine(machineId);
  if (!machine) return { title: "Machine not found — VISUALAB" };
  return {
    title: `${machine.title} — VISUALAB`,
    description: machine.summary,
  };
}

export default async function MachinePage({
  params,
}: {
  params: Promise<{ machineId: string }>;
}) {
  const { machineId } = await params;
  const machine = getMachine(machineId);
  if (!machine) notFound();

  return <LessonShell machine={machine} />;
}
