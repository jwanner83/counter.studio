import { NextResponse } from 'next/server'
import { createClient } from "@supabase/supabase-js";
import { IncrementCounterForm } from "@/types/Counter.types";
import dayjs from "dayjs";
import { serviceSupabase } from "@/data/serviceSupabase";

export async function POST(request: Request) {
  const { id } = await request.json() as IncrementCounterForm

  const { data } = await serviceSupabase.from('COUNTER').select('count').eq('id', id).single()
  if (!data) {
    return NextResponse.json({ success: false })
  }
  await serviceSupabase.from('COUNTER').update({
    count: data.count + 1,
    modified: dayjs().toISOString()
  }).eq('id', id)

  return NextResponse.json({ success: true })
}
