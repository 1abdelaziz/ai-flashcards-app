export default function HeroSection({ title, paragraph }: any) {
    return (
        <section className="p-5">
            <h1 className="text-center text-5xl mb-5">{title}</h1>
            <p className="text-center text-xl">{paragraph}</p>
        </section>
    );
}   