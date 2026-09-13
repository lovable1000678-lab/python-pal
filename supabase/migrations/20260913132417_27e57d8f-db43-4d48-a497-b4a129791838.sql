REVOKE EXECUTE ON FUNCTION public.apply_feedback_weights() FROM PUBLIC, anon, authenticated;
REVOKE SELECT, INSERT ON public.answer_feedback FROM anon, authenticated;
ALTER TABLE public.answer_feedback ADD COLUMN receipt_id uuid UNIQUE;
