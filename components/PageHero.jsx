export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="bg-gradient-to-r from-primary-700 via-primary-500 to-primary-400 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 text-center">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.4em] text-white/80">
            {eyebrow}
          </p>
        )}
        <div>
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          {description && (
            <p className="mt-3 text-base text-white/80 md:text-lg">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

