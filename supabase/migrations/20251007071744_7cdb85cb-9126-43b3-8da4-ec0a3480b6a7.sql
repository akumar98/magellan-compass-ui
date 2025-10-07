-- Add new travel-specific enum values to reward_category
-- These must be added in separate statements and committed before use
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'flight_voucher';
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'hotel_stay';
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'experience_package';
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'travel_gift_card';

-- Add new travel-specific columns to reward_packages
ALTER TABLE public.reward_packages 
  ADD COLUMN IF NOT EXISTS destination text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS vendor_id uuid,
  ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'available';