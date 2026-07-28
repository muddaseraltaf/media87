import { connect } from "cloudflare:sockets";
import { sendSmtpEmail } from "./smtp-client.js";

export function sendHostingerEmail(options) {
  return sendSmtpEmail({
    ...options,
    connect,
    hostname: options.hostname || "smtp.hostinger.com",
    port: options.port || 465,
  });
}
