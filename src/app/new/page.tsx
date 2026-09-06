import { loadMembers } from "@/lib/store";
import ReportForm from "./report-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const members = await loadMembers();
  return (
    <>
      <h1 style={{ fontSize: 20 }}>稼働を登録する</h1>
      <ReportForm members={members.map((m) => m.name)} />
    </>
  );
}
