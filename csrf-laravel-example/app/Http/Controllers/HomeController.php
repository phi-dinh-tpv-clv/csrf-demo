<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JetBrains\PhpStorm\NoReturn;

class HomeController extends Controller
{
    public function home(): \Illuminate\Contracts\View\View
    {
        return view('home.index');
    }

    #[NoReturn] public function submitForm(Request $request)
    {
//        dd($request->all());
        return [
            'success' => true,
            'data' => $request->all()
        ];
    }
}
