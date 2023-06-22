import ButtonLink from "./ButtonLink";

export default function Hero() {
  return (
    <div className="bg-purple-400 text-white py-20 h-screen">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <img className="w-full max-w-lg mb-8 md:rounded-lg shadow-lg" src="/healthy.jpg" alt="Healthy Image" />
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Healthy Website</h1>
          <p className="text-lg mb-8">Discover the benefits of a healthy lifestyle.</p>
          <div className="flex justify-center">
            <ButtonLink href={route('login')} className="w-40 mx-2 flex flex-col items-center">LOGIN</ButtonLink>
            <ButtonLink href={route('register')} className="w-40 flex flex-col items-center">REGISTER</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
