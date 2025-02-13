import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-3 border-t border-gray-700">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; Quản lý thu chi cá nhân Fasttrack, develop by CongBV1 && DatNK.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white transition">
            Chính sách bảo mật
          </a>
          <a href="#" className="hover:text-white transition">
            Điều khoản sử dụng
          </a>
          <a href="#" className="hover:text-white transition">
            Liên hệ
          </a>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xl">
          <a
            href="https://www.facebook.com/kingg.coong/"
            className="hover:text-blue-500 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.facebook.com/kingg.coong/"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com/kingg.coong/"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
