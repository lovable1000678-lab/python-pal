import { createHmac, timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { tokenize } from './nlp';

export function feedbackTokens(question: string) {
  return [...new Set(tokenize(question))].slice(0, 40);
}
function sign(payload: string) {
  const key = process.env['LOVABLE_API_KEY'];
  if (!key) throw new Error('Feedback unavailable');
  return createHmac('sha256', key).update(payload).digest('base64url');
}
export function issueReceipt(question: string, entryId: string) {
  const payload = Buffer.from(JSON.stringify({ question, entryId, id: crypto.randomUUID(), expires: Date.now() + 86400000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}
export function verifyReceipt(receipt: string) {
  const [payload, signature] = receipt.split('.');
  if (!payload || !signature) throw new Error('Invalid vote');
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new Error('Invalid vote');
  const data = z.object({ question: z.string().min(1).max(500), entryId: z.string(), id: z.string().uuid(), expires: z.number() }).parse(JSON.parse(Buffer.from(payload, 'base64url').toString()));
  if (data.expires < Date.now()) throw new Error('Vote expired');
  return data;
}
export async function learnedWeights(question: string) {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) return [];
  const client = createClient(url, key, { auth: { persistSession: false }, global: { fetch: (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith('sb_')) headers.delete('Authorization');
    headers.set('apikey', key);
    return fetch(input, { ...init, headers });
  } } });
  const { data, error } = await client.from('feedback_token_weights').select('entry_id, token, weight').in('token', feedbackTokens(question)).limit(2000);
  if (error) throw new Error('Learning scores unavailable');
  return data ?? [];
}
