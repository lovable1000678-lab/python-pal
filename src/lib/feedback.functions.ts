import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export const voteOnAnswer = createServerFn({ method: 'POST' })
  .inputValidator((input) => z.object({ receipt: z.string().max(4000), vote: z.union([z.literal(1), z.literal(-1)]) }).parse(input))
  .handler(async ({ data }) => {
    const { verifyReceipt, feedbackTokens } = await import('./feedback.server');
    const receipt = verifyReceipt(data.receipt);
    // Privileged insert only after verifying a server-issued, expiring answer receipt.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('answer_feedback').insert({ receipt_id: receipt.id, entry_id: receipt.entryId, question: receipt.question, tokens: feedbackTokens(receipt.question), vote: data.vote });
    if (error && error.code !== '23505') throw new Error('Could not save vote');
    return { saved: true };
  });
