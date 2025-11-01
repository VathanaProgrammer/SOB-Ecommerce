//D:\Works\internship_at_SOB\SOB-Ecommerce\app\api\product\route.ts
import api from "../api";
import { NextResponse } from "next/server";

export async function GET(){
    const res = await api.get("/product/all");
    return NextResponse.json(res.data);
}