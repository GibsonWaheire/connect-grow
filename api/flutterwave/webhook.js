/**
 * Flutterwave Webhook Handler
 *
 * Receives payment notifications from Flutterwave and verifies them using
 * the secret hash (HMAC-SHA256). Set FLW_SECRET_HASH in your environment.
 *
 * Dashboard setup:
 * 1. Go to Settings → Webhooks
 * 2. Add URL: https://yourdomain.com/api/flutterwave/webhook
 * 3. Set your secret hash (same value as FLW_SECRET_HASH)
 *
 * @see https://developer.flutterwave.com/docs/webhooks
 */

import crypto from "crypto";

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function verifyFlutterwaveSignature(rawBody, signature, secretHash) {
  if (!secretHash || !signature) return false;
  const hash = crypto
    .createHmac("sha256", secretHash)
    .update(rawBody)
    .digest("base64");
  return hash === signature;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, flutterwave-signature");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["flutterwave-signature"];
    const secretHash = process.env.FLW_SECRET_HASH;

    if (!secretHash) {
      console.error("FLW_SECRET_HASH not configured");
      return res.status(500).json({ error: "Webhook not configured" });
    }

    if (!verifyFlutterwaveSignature(rawBody, signature, secretHash)) {
      console.warn("Flutterwave webhook: invalid signature");
      return res.status(401).json({ error: "Invalid signature" });
    }

    const payload = JSON.parse(rawBody);

    // Log for debugging (remove or reduce in production)
    console.log("Flutterwave webhook received:", {
      type: payload.type,
      id: payload.id,
      timestamp: payload.timestamp,
    });

    // Handle events (charge.completed, charge.failed, etc.)
    const { type, data } = payload;

    if (type === "charge.completed" && data?.status === "succeeded") {
      // TODO: Update order/payment status in your database
      // TODO: Verify transaction via Flutterwave API before fulfilling
      // const txRef = data.reference;
      // const amount = data.amount;
      // const currency = data.currency;
    }

    if (type === "charge.failed") {
      // TODO: Handle failed payment (notify customer, retry logic, etc.)
    }

    // Must return 200 to acknowledge receipt
    return res.status(200).end();
  } catch (error) {
    console.error("Flutterwave webhook error:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
