<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBaddyAttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return $this->user()->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'session_date' => 'required|date_format:Y-m-d',  
            'session_location' => 'required|string|max: 50',
            'members' => 'required|array|min:2',
            'members.*' => 'exists:members,id',
        ];
    }
}
