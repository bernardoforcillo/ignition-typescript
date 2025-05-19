import Stripe from 'stripe';

const client = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
});

export { client };
