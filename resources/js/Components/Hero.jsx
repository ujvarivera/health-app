import ButtonLink from "./ButtonLink";

export default function Hero({ auth }) {
  return (
    <div className="relative text-white min-h-screen">
      <div className="absolute inset-0">
        <img className="w-full h-full object-cover" src="/healthy.jpg" alt="Healthy Image" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-white bg-opacity-70 text-purple-700 p-4 shadow-m">
            Welcome to Our Healthy Website
          </h1>
          <p className="text-lg font-bold mb-8 bg-white bg-opacity-70 text-purple-700 p-4 shadow-m">
            Discover the benefits of a healthy lifestyle.
          </p>
          <div className="flex justify-center">
            {
              !auth.user ?
              <>
                <ButtonLink href={route('login')} className="w-40 mx-2 flex flex-col items-center">LOGIN</ButtonLink>
                <ButtonLink href={route('register')} className="w-40 flex flex-col items-center">REGISTER</ButtonLink>
              </> :
              <ButtonLink href={route('profile.edit')} className="w-40 flex flex-col items-center">PROFILE</ButtonLink>

            }
          </div>
        </div>
      </div>
    </div>
  );
}
