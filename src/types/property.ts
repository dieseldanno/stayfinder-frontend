export type Property = {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  price_per_night: number;
  max_guests: number;
  image_url: string | null;
  created_at: string;
};

export type NewProperty = {
  title: string;
  description: string;
  city: string;
  country: string;
  price_per_night: number;
  max_guests: number;
  image_url: string | null;
};
