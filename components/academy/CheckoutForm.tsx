import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const CheckoutForm = ({ handleEnrollment, user }) => {
  return (
    <form>
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                defaultValue={user.name.split(" ")[0]}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                defaultValue={user.name.split(" ").slice(1).join(" ")}
                required
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                required
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Payment Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="4242 4242 4242 4242"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                For testing, use 4242 4242 4242 4242 with any future date and
                any CVC
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <Label htmlFor="expiry-month">Month</Label>
                <Input id="expiry-month" placeholder="MM" required />
              </div>
              <div className="col-span-1">
                <Label htmlFor="expiry-year">Year</Label>
                <Input id="expiry-year" placeholder="YY" required />
              </div>
              <div className="col-span-1">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-gray-500">
            <div className="flex items-center space-x-2 mb-1">
              <Image src="/visa-logo.png" alt="Visa" width={32} height={10} />
              <Image
                src="/mastercard-logo.png"
                alt="Mastercard"
                width={32}
                height={20}
              />
              <Image
                src="/amex-logo.png"
                alt="American Express"
                width={32}
                height={20}
              />
              <Image
                src="/paypal-logo.png"
                alt="PayPal"
                width={32}
                height={20}
              />
            </div>
            <p>Your payment information is secure</p>
          </div>
          <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
            Complete Purchase
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
