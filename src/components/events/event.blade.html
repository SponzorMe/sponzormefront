@if (!$event[0]->privacy || $event[0]->privacy && Sentry::check())

<!Doctype html>
<html lang="en" ng-app="EventPage">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <title>{{$event[0]->title}}</title>
  <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}"/>
 <!-- CSS -->
  <link rel="stylesheet" href="{{ asset('components/bootstrap/dist/css/bootstrap.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('components/font-awesome/css/font-awesome.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('components/ngDialog/css/ngDialog.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('components/ngDialog/css/ngDialog-theme-default.min.css')}}"/>  
  <link rel="stylesheet" href="{{ asset('css/dashboard.css')}}"/>  
  <link rel="stylesheet" href="{{ asset('css/event.css')}}"> 
  <!-- Javascripts ================================================== -->
  <script src="{{ asset('components/jquery/dist/jquery.min.js') }}"></script>
  <script src="{{ asset('components/angular/angular.min.js')}}"></script>

  <script src="{{ asset('components/angular-cookies/angular-cookies.min.js')}}"></script>

  <script src="{{ asset('components/angular-bootstrap/ui-bootstrap.min.js')}}"></script>
  <script src="{{ asset('components/angular-bootstrap/ui-bootstrap-tpls.min.js')}}"></script>

  <script src="{{ asset('components/angular-ui-router/release/angular-ui-router.min.js')}}"></script>

  <script src="{{ asset('components/ngDialog/js/ngDialog.min.js')}}"></script>

  <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
        <script src="{{ asset('components/ngAutocomplete/src/ngAutocomplete.js')}}"></script>

  <script src="{{ asset('components/angular-sanitize/angular-sanitize.min.js')}}"></script>
  <script src="{{ asset('components/angular-file-upload/angular-file-upload.min.js')}}"></script>

  <script src="{{ asset('js/event.js')}}"></script><!--script principal-->
  <script src="{{ asset('js/services/customizationService.js') }}"></script><!-- load our service -->



</head>
<body ng-controller="EventCtrl">
<div id="page-wrapper" class="active">
<div id="sidebar-wrapper">
      <ul class="sidebar">
        <li class="">
          <br>
          <div class="img-div col-centered" style="background-color: #FFF;">
          <img src="{{ asset('images/users/'.$organizer[0]->image)}}"  width="300px" height="300px" />
          </div>
        </li>
        <li><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style="color:#fff;">{{$organizer[0]->location}}</span>
        </li> 
        <li><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <span style="color:#fff;">{{trans('dashboard.comunity')}}: {{$organizer[0]->comunity_size}}</span>
        </li>
        <li><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <span style="color:#fff;">{{trans('dashboard.nextEvent')}} : <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$nextEvent}}</span>
        </li>   
        <li><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <span style="color:#fff;"><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:{{$organizer[0]->email}}" style="margin-left:38px;">{{trans('dashboard.contactOrganizer')}}</a></span>
        </li>  
      </ul>
       <div class="sidebar-footer">
        <div class="col-xs-4">
          <a id="blogUrl" href="http://blogen.sponzor.me/">Blog</a>
        </div>
        <div class="col-xs-4">
          <a href="http://staging.sponzor.me/testimonials" target="_blank">
            About          </a>
        </div>
        <div class="col-xs-4">
          <a target="_blank" href="http://support.sponzor.me/">
            Support</a>
        </div>
      </div>
      </div>


<div id="content-wrapper">
  <div id="page-content">
    <div class="page-content">
      <section>
      <div class="events-slider">
<div class="slide">
<div class="slide-bg" style="background-image: url({{ asset('images/bg.jpg')}})"></div>
<div class="col-lg-12">
<div class="logo pull-right">
<span class="slide-logo-wrapper" itemprop="image">
<img src="{{ asset('images/events/thumbs/thumb_'.$event[0]->image)}}"> </span>
</div>
<div class="col-lg-6 eventcss">
<div class="info event-view pull-left" style="padding-left:50px; left: 200px;ç">
<span class="type">{{$category[0]->title}}</span>
<h1><strong itemprop="name">{{$event[0]->title}}</strong></h1>
<div id="tags">
<img src="{{ asset('images/tag.png')}}" width="10">{{$category[0]->title}}<img src="{{ asset('images/map.png')}}" width="10"> &nbsp; {{$event[0]->location}} &nbsp;<img src="{{ asset('images/calendar.png')}}" width="10">&nbsp;{{$event[0]->starts}}
</div>
<div class="socials pull-left">
	<a href="https://www.facebook.com/sharer/sharer.php?u={{URL::to('/api/v1/event/')}}{{$event[0]->id}}" target="_blank" onclick="javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;">
	<img src="{{ asset('images/social/facebook.png')}}" width="30"></a>&nbsp;
	<a href="https://twitter.com/home?status={{URL::to('/api/v1/event/')}}{{$event[0]->id}}">
		<img src="{{ asset('images/social/twitter.png')}}" width="30"></a> &nbsp; 
	<a href="https://plus.google.com/share?url={{URL::to('/api/v1/event/')}}{{$event[0]->id}}"><img src="{{ asset('images/social/google+.png')}}" width="30"></a>
    </div>
    </div>
	</div>
	</div>
	<div class="row desc">
  <h1>{{trans('dashboard.description')}}</h1>
  <p>
    {{$event[0]->description}}
  </p>
  <h2>{{trans('dashboard.sponzor')}}</h2>
  @foreach ($peaks as $p)
  <div class="col-sm-6 col-md-4">
    <div class="thumbnail">
      <div class="caption">
        <h3><strong>{{$p->kind}}</strong></h3>
        <hr/>
        <ul class="list-group">
        	<li class="list-group-item">${{$p->usd}} USD</li>
      	</ul>
      	<hr/>
      	<ul class="list-group">
          @foreach ($tasks as $t)
            @if ($t->peak_id==$p->id )
              <li class="list-group-item">{{$t->title}}</li>
            @endif        	
          @endforeach
      	</ul>
      @if (Sentry::check() && (Sentry::getUser()->hasAccess('admin')|| Sentry::getUser()->hasAccess('sponsors') ))
      <a href="" data-ng-click="sponzor({{$p->id}},{{ Session::get('userId') }}   )" class="btn btn-primary center-block" role="button">{{trans('dashboard.sponzorButton')}}
      </a>
      @endif
      @if (Sentry::check() && (Sentry::getUser()->hasAccess('users')))
      <a href="#" class="btn btn-danger center-block" role="button"><p style="white-space: pre-line !important; margin:0px !important;">{{trans('dashboard.sponzorButtonNotSponsor')}}</p></a>
      
      @endif
      @if (!Sentry::check())
        <a href="{{ URL::to('/login') }}" target="_blank" class="btn btn-danger center-block" role="button">{{trans('dashboard.sponzorButtonNotlogin')}}       
        </a>
      @endif
      </div>
    </div>
  </div>
  @endforeach
</div>
</div>
</section>
</div>
</div>
</div>
</div>
</div>
</body>
</html>
@else
{{trans('pages.eventRestricted')}}
@endif