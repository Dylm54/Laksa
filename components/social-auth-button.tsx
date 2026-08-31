import { Button } from "./ui/button";

interface SocialButtonProps {
    children: React.ReactNode;
    action: () => void;
}

export default function SocialAuthButton({ children, action }: SocialButtonProps) {
    return (
        <Button onClick={action} variant="outline" className="w-full border-black rounded-sm">{ children }</Button>

    );
}