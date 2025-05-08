<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|string|in:user,admin',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est requis',
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email doit être une adresse email valide',
            'email.unique' => 'Cet email est déjà utilisé',
            'password.required' => 'Le mot de passe est requis',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas',
            'role.in' => 'Le rôle doit être soit user soit admin',
        ];
    }
}
