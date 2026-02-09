export default function NameCell() {
  return (
    <>
      {/* Profile photo — grayscale by default, color on hover */}
      <img
        src="/profile_foto_color.jpg"
        alt="Piotr Gosiewski"
        className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover/photo:grayscale-0"
      />

      {/* Gradient overlay with name */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-16 md:p-5 md:pt-20 lg:p-6 lg:pt-24">
        <h1 className="font-display text-3xl leading-[0.9] text-white md:text-4xl lg:text-5xl">
          PIOTR
          <br />
          GOSIEWSKI
        </h1>
      </div>
    </>
  )
}
