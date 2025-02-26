import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { Mail, Eye, EyeOff, Lock, Loader2, LogIn } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const { login, isLoggingIn } = useAuthStore();

	const validateForm = () => {
		if(!formData.email.trim()) return toast.error("Email is required.");
		if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format.");
		if(!formData.password.trim()) return toast.error("Password is required.");

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isFormValid = validateForm();
		if(isFormValid === true) login(formData);
	};

	return (
		<div className="h-screen grid lg:grid-cols-2">
			{/* Left Side - Form */}
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					{/* Logo */}
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div
								className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
								<LogIn className="w-6 h-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
							<p className="text-base-content/60">Sign in to your account</p>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-10">
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium pb-1">Email</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
									<Mail className="size-5 text-primary" />
								</div>
								<input
									type="email"
									className={`input validator input-primary input-bordered w-full pl-10 z-0`}
									placeholder="you@example.com"
									value={formData.email} required={true}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								/>
								<div className="absolute left-0 validator-hint text-xs">Enter valid email address.</div>
							</div>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium pb-1">Password</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
									<Lock className="size-5 text-primary mb-6" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									className={`input validator input-primary input-bordered w-full pl-10 z-0`}
									placeholder="••••••••"
									value={formData.password} minLength={6}
									pattern="{6,}" required={true}
									title="Must be more than 6 characters."
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<EyeOff className="size-5 text-primary mb-6" />
									) : (
										<Eye className="size-5 text-primary mb-6" />
									)}
								</button>
								<p className="validator-hint">
									Must be more than 6 characters.
								</p>
							</div>
						</div>

						<button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
							{isLoggingIn ? (
								<>
									<Loader2 className="size-5 animate-spin" />
									Loading...
								</>
							) : (
								"Sign in"
							)}
						</button>
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Don&apos;t have an account?{" "}
							<Link to="/signup" className="link link-primary">
								Create account
							</Link>
						</p>
					</div>
				</div>
			</div>

			{/* Right Side - Image/Pattern */}
			<AuthImagePattern
				title={"Welcome back!"}
				subtitle={"Sign in to continue your conversations and catch up with your messages."}
			/>
		</div>
	);
};

export default LoginPage;