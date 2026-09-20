import { Link } from "react-router-dom";
import {
  Plane,
  Instagram,
  Twitter,
  Facebook,
  Mail,
} from "lucide-react";

export default function Footer() {
  const socialIcons = [
    { Icon: Instagram, label: "Instagram" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Mail, label: "Email" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>

              <span className="font-bold text-xl text-white">
                Trip<span className="text-teal-400">Flow</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Multi-destination travel packages and reservation
              orchestration. Explore more, travel smarter.
            </p>

            <div className="flex gap-3 mt-5">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Explore
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-teal-400 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/packages"
                  className="hover:text-teal-400 transition-colors"
                >
                  Packages
                </Link>
              </li>

              <li>
                <Link
                  to="/bookings"
                  className="hover:text-teal-400 transition-colors"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-teal-400 transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              Get in Touch
            </h4>

            <ul className="space-y-2 text-sm text-slate-400">
              <li>support@tripflow.in</li>
              <li>+91 98765 43210</li>
              <li>Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TripFlow. SOA Programming &
            Microservices College Project.
          </p>

          <p className="text-xs text-slate-500">
            Built with React + Vite
          </p>
        </div>
      </div>
    </footer>
  );
}