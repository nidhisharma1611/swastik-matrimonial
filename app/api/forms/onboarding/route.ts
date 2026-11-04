import { NextRequest } from "next/server";
import { handleForm } from "@/lib/forms/server";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) { return handleForm(request, "onboarding"); }
