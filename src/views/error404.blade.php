@extends('layouts.default-angular')

{{-- Web site Title --}}
@section('title', 'SponzorMe -- Error 404')
@parent
{{trans('pages.helloworld')}}
@stop

{{-- Content --}}
@section('content')

	<br/><br/>
	<img src="{{ asset('images/error404.png') }}" alt="{{trans("page.error404")}}"/>

	<h1>{{trans("pages.error404")}}</h1>

	<a href="{{URL::to('/');}}"><h2>{{trans("pages.backhome")}}</h2></a>

@if (Sentry::check())
@endif
@stop