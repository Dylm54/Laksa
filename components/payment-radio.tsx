import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "./ui/separator";

interface PaymentRadioProps {
  value: "xendit" | "stripe";
  onValueChange: (value: "xendit" | "stripe") => void;
}

export function PaymentRadio({ value, onValueChange }: PaymentRadioProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className="max-w-sm border border-black rounded-sm gap-0 overflow-hidden"
    >
      <FieldLabel htmlFor="xendit-method" className="!border-0 !rounded-none">
        <Field orientation="horizontal">
          <RadioGroupItem
            value="xendit"
            id="xendit-method"
            className="!border-black data-[state=checked]:!bg-[#F790E8] data-[checked]:not-[data-checked=false]:!bg-[#F790E8]"
          />
          <FieldContent>
            <FieldTitle>Xendit</FieldTitle>
            <FieldDescription>
              QRIS, Virtual Account, GoPay, ShopeePay, OVO
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <Separator className="bg-black" />
      <FieldLabel htmlFor="stripe-method" className="!border-0 !rounded-none">
        <Field orientation="horizontal">
          <RadioGroupItem 
            value="stripe" 
            id="stripe-method"
            className="!border-black data-[state=checked]:!bg-[#F790E8] data-[checked]:not-[data-checked=false]:!bg-[#F790E8]" 
        />
          <FieldContent>
            <FieldTitle>Stripe</FieldTitle>
            <FieldDescription>Credit/Debit Card (USD)</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
