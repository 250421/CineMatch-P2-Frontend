import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { CircleAlert } from "lucide-react"

export const NoPostFound = () => {
  return (
    <Card data-testid="no-post-found" className="w-[100%] py-2 gap-2 hover:bg-slate-100 w-full flex flex-col items-center justify-center">
      <CardContent className="px-4">
        <CircleAlert className="size-40" />
      </CardContent>
      <CardFooter className="flex flex-row gap-4 p-4">
        <h2 className="text-lg font-bold">
          No posts found.
        </h2>
      </CardFooter>
    </Card>
  )
}
