import { promises as fs } from "node:fs";
import path from "node:path";
import type { Contract } from "./settlement";

export type Report = {
  id: string;
  member: string;
  /** 稼働日 YYYY-MM-DD */
  workedOn: string;
  /** その日の稼働時間（0.5刻み） */
  hours: number;
};

export type Member = {
  name: string;
  contract: Contract;
};

const DATA_DIR = path.join(process.cwd(), "data");

export async function loadMembers(): Promise<Member[]> {
  const raw = await fs.readFile(path.join(DATA_DIR, "members.json"), "utf-8");
  return JSON.parse(raw) as Member[];
}

export async function loadReports(): Promise<Report[]> {
  const raw = await fs.readFile(path.join(DATA_DIR, "reports.json"), "utf-8");
  return JSON.parse(raw) as Report[];
}

export async function addReport(r: Omit<Report, "id">): Promise<Report> {
  const reports = await loadReports();
  const created: Report = { ...r, id: `r${Date.now()}` };
  reports.push(created);
  await fs.writeFile(
    path.join(DATA_DIR, "reports.json"),
    JSON.stringify(reports, null, 2),
    "utf-8"
  );
  return created;
}
