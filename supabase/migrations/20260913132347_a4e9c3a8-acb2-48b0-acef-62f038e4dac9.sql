CREATE TABLE public.answer_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id text NOT NULL,
  question text NOT NULL,
  tokens text[] NOT NULL DEFAULT '{}',
  vote smallint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.feedback_token_weights (
  entry_id text NOT NULL,
  token text NOT NULL,
  weight real NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (entry_id, token)
);

CREATE INDEX feedback_token_weights_token_idx ON public.feedback_token_weights (token);

GRANT SELECT, INSERT ON public.answer_feedback TO anon, authenticated;
GRANT ALL ON public.answer_feedback TO service_role;
GRANT SELECT ON public.feedback_token_weights TO anon, authenticated;
GRANT ALL ON public.feedback_token_weights TO service_role;

ALTER TABLE public.answer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_token_weights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback" ON public.answer_feedback FOR INSERT TO anon, authenticated WITH CHECK (vote IN (-1, 1) AND char_length(question) BETWEEN 1 AND 500 AND char_length(entry_id) BETWEEN 1 AND 120 AND array_length(tokens, 1) IS NOT NULL AND array_length(tokens, 1) <= 40);
CREATE POLICY "Feedback is not publicly readable" ON public.answer_feedback FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "Anyone can read learned weights" ON public.feedback_token_weights FOR SELECT TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.apply_feedback_weights()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.feedback_token_weights (entry_id, token, weight, updated_at)
  SELECT NEW.entry_id, t, NEW.vote, now()
  FROM unnest(NEW.tokens) AS t
  ON CONFLICT (entry_id, token)
  DO UPDATE SET weight = least(5, greatest(-5, public.feedback_token_weights.weight + NEW.vote)), updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER answer_feedback_weights
AFTER INSERT ON public.answer_feedback
FOR EACH ROW EXECUTE FUNCTION public.apply_feedback_weights();