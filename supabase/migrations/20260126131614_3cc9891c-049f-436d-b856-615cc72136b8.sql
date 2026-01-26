-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Drop overly permissive policies on ideas table
DROP POLICY IF EXISTS "Allow all operations on ideas" ON public.ideas;

-- Create admin-only UPDATE policy for ideas
CREATE POLICY "Only admins can update ideas"
ON public.ideas FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create admin-only DELETE policy for ideas
CREATE POLICY "Only admins can delete ideas"
ON public.ideas FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop overly permissive policies on roadmap_items table
DROP POLICY IF EXISTS "Allow all operations on roadmap items" ON public.roadmap_items;

-- Create admin-only INSERT policy for roadmap_items
CREATE POLICY "Only admins can create roadmap items"
ON public.roadmap_items FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create admin-only UPDATE policy for roadmap_items
CREATE POLICY "Only admins can update roadmap items"
ON public.roadmap_items FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create admin-only DELETE policy for roadmap_items
CREATE POLICY "Only admins can delete roadmap items"
ON public.roadmap_items FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop overly permissive policies on release_notes table
DROP POLICY IF EXISTS "Allow all operations on release notes" ON public.release_notes;

-- Create admin-only INSERT policy for release_notes
CREATE POLICY "Only admins can create release notes"
ON public.release_notes FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create admin-only UPDATE policy for release_notes
CREATE POLICY "Only admins can update release notes"
ON public.release_notes FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create admin-only DELETE policy for release_notes
CREATE POLICY "Only admins can delete release notes"
ON public.release_notes FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));