import type React from "react"

import { useState } from "react"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const [selectedRole, setSelectedRole] = useState("user")

  const roles = {
    admin: {
      email: "admin@example.com",
      password: "admin123",
    },
    manager: {
      email: "manager@example.com",
      password: "manager123",
    },
    user: {
      email: "user@example.com",
      password: "user123",
    },
  }

  const handleRoleSelect = (role: keyof typeof roles) => {
    setSelectedRole(role)
    setEmail(roles[role].email)
    setPassword(roles[role].password)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Logging in with: ${email} / ${password}`)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-2xl">
        {/* Role selector */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-medium text-gray-200">Select a role to demo:</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(roles).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role as keyof typeof roles)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedRole === role ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex border-b border-gray-700">
          <button
            className={`flex-1 border-b-2 py-2 text-center font-medium ${
              activeTab === "login"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 cursor-not-allowed border-b-2 py-2 text-center font-medium opacity-50 ${
              activeTab === "signup" ? "border-indigo-500 text-indigo-400" : "border-transparent text-gray-400"
            }`}
            disabled
          >
            Sign Up (Disabled)
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-800"
          >
            Login
          </button>
        </form>

        {/* Role information */}
        <div className="mt-6 rounded-lg border border-gray-700 bg-gray-750 p-4">
          <div className="mb-2 flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-medium text-gray-200">
              Currently selected: <span className="text-indigo-400">{selectedRole}</span> role
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            Use the buttons above to switch between different user roles and see their credentials. The signup section
            is intentionally disabled as requested.
          </p>
        </div>
      </div>
    </div>
  )
}

