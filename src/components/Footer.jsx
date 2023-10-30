export const Footer = () => {
  return (
    <footer className="bg-white my-10">
      <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          문의 : devlab2023@gmail.com
        </span>
        <span className="text-sm text-gray-500 sm:text-center">
          © 2023<a href="https://flowbite.com/" className="hover:underline"> DEVLAB </a>All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
            <a href="/private" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
