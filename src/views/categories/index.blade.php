@extends('layouts.default')

{{-- Web site Title --}}
@section('title')
@parent
{{trans('pages.helloworld')}}
@stop

{{-- Content --}}
@section('content')

<?php
 
 $categories = Category::all();

 ?> 
@foreach($categories as $category)
<pre>{{$category->name}}</pre>
@endforeach 
@stop