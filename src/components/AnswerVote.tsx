import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { voteOnAnswer } from '@/lib/feedback.functions';

export function AnswerVote({ receipt }: { receipt: string }) {
  const submit = useServerFn(voteOnAnswer);
  const [vote, setVote] = useState<number>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  async function rate(value: 1 | -1) {
    if (pending || vote) return;
    setPending(true); setError(false);
    try { await submit({ data: { receipt, vote: value } }); setVote(value); }
    catch { setError(true); }
    finally { setPending(false); }
  }
  return <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-line pt-2">
    <Button variant="ghost" size="icon" aria-label="Helpful answer" title="Helpful answer" aria-pressed={vote === 1} disabled={pending || !!vote} className={vote === 1 ? 'text-brand' : 'text-subtle'} onClick={() => void rate(1)}><ThumbsUp /></Button>
    <Button variant="ghost" size="icon" aria-label="Unhelpful answer" title="Unhelpful answer" aria-pressed={vote === -1} disabled={pending || !!vote} className={vote === -1 ? 'text-brand' : 'text-subtle'} onClick={() => void rate(-1)}><ThumbsDown /></Button>
    <span role="status" className="text-xs text-subtle">{pending ? 'Saving…' : vote ? 'Thanks for your feedback' : error ? 'Vote not saved. Try again.' : ''}</span>
  </div>;
}
