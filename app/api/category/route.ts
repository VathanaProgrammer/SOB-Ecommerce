import api from "../api";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await api.get("/category/all");
    return NextResponse.json(res.data);
}