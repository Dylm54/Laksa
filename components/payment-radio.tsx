import { CreditCard, QrCode } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import styles from "./payment-radio.module.css";

interface PaymentRadioProps {
  value: "xendit" | "stripe";
  onValueChange: (value: "xendit" | "stripe") => void;
}

export function PaymentRadio({ value, onValueChange }: PaymentRadioProps) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className={styles.group} aria-label="Metode pembayaran">
      <label htmlFor="xendit-method" className={styles.option} data-selected={value === "xendit"}>
        <QrCode className={styles.methodIcon} size={23} strokeWidth={1.5} aria-hidden="true" />
        <span className={styles.copy}>
          <span className={styles.title}>Xendit <span className={styles.currency}>IDR</span></span>
          <span id="xendit-description" className={styles.description}>QRIS, Virtual Account, GoPay, ShopeePay, OVO</span>
        </span>
        <RadioGroupItem value="xendit" id="xendit-method" aria-label="Xendit" aria-describedby="xendit-description" className={styles.radio} />
      </label>
      <label htmlFor="stripe-method" className={styles.option} data-selected={value === "stripe"}>
        <CreditCard className={styles.methodIcon} size={23} strokeWidth={1.5} aria-hidden="true" />
        <span className={styles.copy}>
          <span className={styles.title}>Stripe <span className={styles.currency}>USD</span></span>
          <span id="stripe-description" className={styles.description}>Credit/Debit Card (USD)</span>
        </span>
        <RadioGroupItem value="stripe" id="stripe-method" aria-label="Stripe" aria-describedby="stripe-description" className={styles.radio} />
      </label>
    </RadioGroup>
  );
}
