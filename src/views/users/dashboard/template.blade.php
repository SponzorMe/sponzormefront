@extends ('users.dashboard.layout')

@section ('content')

	@include ('users.dashboard.main')

	@include ('users.dashboard.events')

	@include ('users.dashboard.sponzors')

	@include ('users.dashboard.friend')

	@include ('users.dashboard.settings')

	@include ('users.dashboard.todo')

@stop

