<!Doctype html>
<html lang="en" ng-app="EventPage">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <title>Dashboard</title>
  <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}"/>
 <!-- CSS -->
  <link rel="stylesheet" href="{{ asset('components/bootstrap/dist/css/bootstrap.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('components/font-awesome/css/font-awesome.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('css/dashboard.css')}}"/>  
  <link rel="stylesheet" href="{{ asset('css/event.css')}}"> 
  <!-- Javascripts ================================================== -->
</head>
<body>
<div id="page-wrapper" class="active">
  <div id="sidebar-wrapper">
    <ul class="sidebar">
      <li class="">
        <br>
        <div class="img-div col-centered" style="background-color: #FFF;">
          <img src="{{asset('images/users/'.$organizer[0]->image)}}"  width="300px" height="300px" />
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
        <span style="color:#fff; margin-left: 37px !important;"><br>
            <p style="margin-left: 37px !important;"><strong itemprop="name">{{$event[0]->title}}</strong></p>
            <p style="margin-left: 37px !important;">{{$category[0]->title}}</p>
            <p style="margin-left: 37px !important;"><img src="{{ asset('images/tag.png')}}" width="10">{{$category[0]->title}}<br></p>
            <p style="margin-left: 37px !important;">&nbsp; {{$event[0]->location}} &nbsp;<br></p>
            <p style="margin-left: 37px !important;"><img src="{{ asset('images/calendar.png')}}" width="10">&nbsp;{{$event[0]->starts}}</p>
          
        <span style="color:#fff;"><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:{{$organizer[0]->email}}" style="margin-left: 37px !important;">{{trans('dashboard.contactOrganizer')}}</a></span>
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
  <div class="col-xs-12">
    <div class="col-sm-12">
    <h1 align="center">{{trans('widget.signupform')}}</h1>   </div> 
    {{ Form::open(array('action' => 'ApiController@storeExternalSponzor')) }}
    <table class="table">
      <tr><td>{{trans('widget.sponzorname')}}</td>
        <td><input type="text" name="company" placeholder="{{trans('widget.sponzornameplaceholder')}}"/></td></tr>
      <tr><td>{{trans('widget.contactsname')}}</td>
        <td><input type="text" name="name" placeholder="{{trans('widget.contactsnameplaceholder')}}"/></td></tr>
      <tr><td>{{trans('widget.contactsemail')}}</td>
        <td><input type="text" name="email" placeholder="{{trans('widget.contactsemailplacelhoder')}}"/></td></tr>
      <tr><td colspan="2" align="center">{{trans('widget.whichlevelsponzor')}}</td></tr>
      <tr><td colspan="2" align="center">        
        @foreach ($peaks as $p)
          <div class="col-sm-5 col-md-4">
            <div class="thumbnail">
              <div class="caption">
                <input type="radio" name="peak" value="{{$p->id}}"/><strong>{{$p->kind}}</strong>
                <hr/>
                <strong>{{trans('widget.price')}}</strong>
                <ul class="list-group">
                  <li class="list-group-item">${{$p->usd}} USD</li>
                </ul>
                <strong>{{trans('widget.details')}}</strong>
                <ul class="list-group">
                  @foreach ($tasks as $t)
                    @if ($t->peak_id==$p->id )
                      <li class="list-group-item">{{$t->title}}</li>
                    @endif          
                  @endforeach
                </ul>
              </div>
            </div>
          </div>
        @endforeach
        <div class="clearfix"></div>
        <div class="col-sm-10">
          <input type="submit" class="btn btn-success" value="{{trans('widget.submitbutton')}}"/>
        </div>
      </td></tr>
    </table>
    {{ Form::close() }}
  </div>
</div>
</body>
</html>