
interface ImageProps {
  src: string;
}

export const Image = ({ src }: ImageProps) => {
  return (
    <div className="aspect-3/2 rounded-lg overflow-hidden bg-slate-300">
      <img src={ src } className="w-full aspect-3/2 object-contain" />
    </div>
  )
}
