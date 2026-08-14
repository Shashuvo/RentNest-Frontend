import { House } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-2">
                <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground animate-bounce">
                    <House className="size-5.5" strokeWidth={2.5} />
                </span>
                <span className="text-lg font-semibold tracking-tight">
                    Rent<span className="text-primary">Nest</span>
                </span>
                <p className="text-sm text-muted-foreground">
                    Home is closer than you think
                </p>
                <div className="h-2 w-60 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/3 animate-loading-bar rounded-full bg-primary" />
                </div>
            </div>
        </div>
    )
}