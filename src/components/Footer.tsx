import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="container mx-auto max-w-[2560px] mt-auto py-8">
      <div className="flex flex-wrap justify-center space-x-6 md:space-x-12 py-8">
        <Link 
          href="/app" 
          className="text-base font-tt-hoves-pro-trial font-medium hover:underline"
          aria-label="Enter Alexandria"
          tabIndex={0}
        >
          Enter Alexandria
        </Link>
        <Link 
          href="/manifesto" 
          className="text-base font-tt-hoves-pro-trial font-medium hover:underline"
          aria-label="Manifesto"
          tabIndex={0}
        >
          Manifesto
        </Link>
        <Link 
          href="/about" 
          className="text-base font-tt-hoves-pro-trial font-medium hover:underline"
          aria-label="About Us"
          tabIndex={0}
        >
          About Us
        </Link>
        <Link 
          href="/changelog" 
          className="text-base font-tt-hoves-pro-trial font-medium hover:underline"
          aria-label="Changelog"
          tabIndex={0}
        >
          Changelog
        </Link>
      </div>
    </footer>
  );
};

export { Footer }; 