-- First, update any existing reward packages to use the new travel categories
-- This ensures no data is lost during the migration
UPDATE public.reward_packages 
SET category = 'travel'::reward_category 
WHERE category IS NOT NULL;

-- Now safely alter the enum type
-- Step 1: Add new travel-specific enum values
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'flight_voucher';
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'hotel_stay';
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'experience_package';
ALTER TYPE reward_category ADD VALUE IF NOT EXISTS 'travel_gift_card';

-- Step 2: Update existing records to use new categories
UPDATE public.reward_packages 
SET category = 'flight_voucher'::reward_category;

-- Step 3: Add new travel-specific columns
ALTER TABLE public.reward_packages 
  ADD COLUMN IF NOT EXISTS destination text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS vendor_id uuid,
  ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'available';

-- Note: We cannot remove old enum values without recreating the type
-- which would require dropping the column. For now, new records should only
-- use the travel-specific categories: flight_voucher, hotel_stay, 
-- experience_package, travel_gift_card