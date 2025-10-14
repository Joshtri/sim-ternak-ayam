import type { LoginDto } from "../types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { authService } from "../services/authService";

import { showToast } from "@/utils/showToast";

// Expose a login hook which performs the authService.login call.
export function useLogin() {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<string | void, unknown, LoginDto>({
    mutationFn: async (data: LoginDto) => {
      return authService.login(data);
    },
    onSuccess: _data => {
      // _data may be the token string or undefined (if backend uses cookie)
      // Refresh the current user info (me) so UI like Navbar can update
      // immediately without waiting for background refetch.
      try {
        qc.invalidateQueries({ queryKey: ["me"] });
      } catch {}

      showToast({
        title: "Berhasil masuk",
        description: "Anda berhasil login.",
        color: "success",
      });

      // Navigate to dashboard after successful login
      navigate({ to: "/dashboard" });
    },
    onError: (err: any) => {
      const message = err?.message ?? "Gagal melakukan login";

      showToast({
        title: "Login gagal",
        description: String(message),
        color: "error",
      });
    },
  });

  return mutation;
}

export function useCurrentUser<T = unknown>() {
  return useQuery<T>({
    queryKey: ["me"],
    queryFn: () => authService.me<T>(),
    staleTime: 1000 * 60 * 5,
  });
}
