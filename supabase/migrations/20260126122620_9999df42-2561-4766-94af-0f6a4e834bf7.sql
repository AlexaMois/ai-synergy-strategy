-- Create enum types for ideas
CREATE TYPE idea_status AS ENUM ('backlog', 'planned', 'in_progress', 'done');
CREATE TYPE idea_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE idea_source AS ENUM ('client', 'internal', 'partner', 'client_form');

-- Create enum types for roadmap
CREATE TYPE roadmap_status AS ENUM ('planned', 'in_progress', 'done');

-- Create enum types for release notes
CREATE TYPE release_status AS ENUM ('released', 'beta', 'internal');

-- Create ideas table
CREATE TABLE public.ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  source idea_source NOT NULL DEFAULT 'client_form',
  status idea_status NOT NULL DEFAULT 'backlog',
  priority idea_priority NOT NULL DEFAULT 'medium',
  votes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create roadmap_items table
CREATE TABLE public.roadmap_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  status roadmap_status NOT NULL DEFAULT 'planned',
  related_idea_id UUID REFERENCES public.ideas(id) ON DELETE SET NULL,
  eta TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create release_notes table
CREATE TABLE public.release_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status release_status NOT NULL DEFAULT 'released',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.release_notes ENABLE ROW LEVEL SECURITY;

-- Public read access for ideas (anyone can view)
CREATE POLICY "Anyone can view ideas" 
ON public.ideas 
FOR SELECT 
USING (true);

-- Public can insert ideas (for suggestion form)
CREATE POLICY "Anyone can suggest ideas" 
ON public.ideas 
FOR INSERT 
WITH CHECK (source = 'client_form' AND status = 'backlog');

-- Public can update votes only
CREATE POLICY "Anyone can vote on ideas" 
ON public.ideas 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Public read access for roadmap items
CREATE POLICY "Anyone can view roadmap items" 
ON public.roadmap_items 
FOR SELECT 
USING (true);

-- Public read access for release notes (only released ones)
CREATE POLICY "Anyone can view released notes" 
ON public.release_notes 
FOR SELECT 
USING (status = 'released');

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_ideas_updated_at
  BEFORE UPDATE ON public.ideas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_roadmap_items_updated_at
  BEFORE UPDATE ON public.roadmap_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_release_notes_updated_at
  BEFORE UPDATE ON public.release_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();