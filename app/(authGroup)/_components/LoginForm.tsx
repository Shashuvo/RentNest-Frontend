import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const LoginForm = () => {
    return (
        <form className="space-y-4">
            <Card className="p-5 space-y-4">
                <input className="p-3 rounded-4xl bg-gray-200" type="email" name="email" placeholder="Enter Your Email" required />
                <input className="p-3 rounded-4xl bg-gray-200" type="password" name="password" placeholder="Enter Your Password" required />
                <Button type="submit">
                    Login
                </Button>
            </Card>
        </form>
    )
}

export default LoginForm
