<!Doctype html>
<html lang="en" ng-app="Dashboard">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}"/>
  <title>Dashboard</title>
 <!-- CSS -->
  <link rel="stylesheet" href="{{ asset('components/bootstrap/dist/css/bootstrap.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('components/font-awesome/css/font-awesome.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('components/ngDialog/css/ngDialog.min.css')}}"/>
  <link rel="stylesheet" href="{{ asset('components/ngDialog/css/ngDialog-theme-default.min.css')}}"/>
  <!--Date timer-->
  <link rel="stylesheet" href="{{ asset('components/bootstrap/dist/css/bootstrap.css')}}">
  <link rel="stylesheet" href="{{ asset('components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css')}}"/>
  <!--Estilos principales-->
  <link rel="stylesheet" href="{{ asset('css/dashboard.css')}}"/>  

  <!-- demo styles -->
  <link rel="stylesheet" href="{{ asset('css/demo/demo.css')}}">

  <!-- Add IntroJs styles -->
  <link rel="stylesheet" href="{{ asset('css/demo/introjs.css')}}">

  <link rel="stylesheet" href="{{ asset('css/demo/bootstrap-responsive.min.css')}}">

  <!-- Javascripts ================================================== -->
  <script src="{{ asset('components/jquery/dist/jquery.min.js') }}"></script>
  <script src="{{ asset('components/angular/angular.min.js')}}"></script>
  <script src="{{ asset('components/angular-cookies/angular-cookies.min.js')}}"></script>
  <script src="{{ asset('components/angular-bootstrap/ui-bootstrap.min.js')}}"></script>
  <script src="{{ asset('components/angular-bootstrap/ui-bootstrap-tpls.min.js')}}"></script>
  <script src="{{ asset('components/angular-ui-router/release/angular-ui-router.min.js')}}"></script>
  <script src="{{ asset('components/ngDialog/js/ngDialog.min.js')}}"></script>
  <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
  <script src="{{ asset('components/ngAutocomplete/src/ngAutocomplete.js')}}"></script>
  <script src="{{ asset('components/angular-sanitize/angular-sanitize.min.js')}}"></script>
  <script src="{{ asset('components/angular-file-upload/angular-file-upload.min.js')}}"></script>  <!--Date timer-->
  <script type="text/javascript" src="{{ asset('components/moment/moment.js')}}"></script>
  <script type="text/javascript" src="{{ asset('components/bootstrap/dist/js/bootstrap.min.js')}}"></script>
  <script type="text/javascript" src="{{ asset('components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js')}}"></script>
  <script src="{{ asset('js/demo/intro.js')}}"></script><!--controller principal-->
  <script src="{{ asset('js/dashboard.js')}}"></script><!--controller principal-->
  <script src="{{ asset('js/services/customizationService.js') }}"></script><!-- load our service -->
  <script src="//js.pusher.com/2.2/pusher.min.js" type="text/javascript"></script><!-- Pusher Service -->
</head>
@if (Sentry::check())
<body ng-controller="MasterCtrl">
  <div id="page-wrapper" ng-class="{'active': toggle}" ng-cloak>

    <!-- Sidebar -->

    <div id="sidebar-wrapper">
      <ul class="sidebar">
        <li class="sidebar-main" id="step3">
          <a href="" ng-click="toggleSidebar()">
            Dashboard
            <span class="menu-icon glyphicon glyphicon-transfer"></span>
          </a>
        </li>
        <li class="sidebar-title"><span>{{trans('dashboard.navigation')}}</span></li>
        <li class="sidebar-list">
          <a href="#/main">{{trans('dashboard.dashboard')}}<span class="menu-icon fa fa-tachometer"></span></a>
        </li>       
        <li class="sidebar-list">
          <a href="#/following">{{trans('dashboard.following')}} <span class="menu-icon fa fa-eye"></span></a>
        </li>
        <li class="sidebar-list">
          <a href="#/sponzoring">{{trans('dashboard.sponzoring')}} <span class="menu-icon fa fa-bolt"></span></a>
        </li>
        <li class="sidebar-list">
          <a href="#/settings">{{trans('dashboard.settings')}}<span class="menu-icon fa fa-cogs"></span></a>
        </li>
        <li class="sidebar-list">
          <a href="#/friend">{{trans('dashboard.invitefriend')}} <span class="menu-icon fa fa-smile-o"></span></a>
        </li>
        <li class="sidebar-list">
          <a href="{{ URL::to('logout') }}">{{trans('pages.logout')}}<span class="menu-icon fa fa-sign-out"></span></a>
        </li>  
      </ul>
      <div class="sidebar-footer" id="step4">
        <div class="col-xs-4">
          <a href="{{ URL::to(trans('pages.blogUrl')) }}">{{trans('pages.blog')}}</a>
        </div>
        <div class="col-xs-4">
          <a href="{{ URL::to('testimonials') }}" target="_blank">
            {{trans('dashboard.about')}}
          </a>
        </div>
        <div class="col-xs-4">
          <a target="_blank" href="{{ URL::to(trans('pages.supportUrl')) }}">
            {{trans('dashboard.support')}}
          </a>
        </div>
      </div>
    </div>

    <!-- End Sidebar -->

    <div id="content-wrapper">
      <div class="page-content">

        <!-- Header Bar -->

        <div class="row header">
          <div class="col-xs-12">
            <div class="user pull-right">
              <div class="item dropdown" dropdown is-open="status.isopen">
                <input type="hidden" ng-model="event.organizer" ng-init="event.organizer = {{ Session::get('userId') }}" />
                    <input type="hidden" ng-model="event.sponzor" ng-init="event.sponzor = {{ Session::get('userId') }}" />  
                <a href="" class="dropdown-toggle" dropdown-toggle ng-disabled="disabled">
                  <input type="hidden" data-ng-init="viewUserInfoheader()" />
                   <img data-ng-src="<%accountheader.image%>" style="border-radius:50%;" src="{{ asset('images/photo.png')}}">
                </a>
                <ul class="dropdown-menu dropdown-menu-right" role="menu">
                  <li class="dropdown-header">
                    {{ Session::get('email') }}                                       
                  </li>
                  <li class="divider"></li>
                  <li class="link">
                    <a href="#/settings">
                      {{trans('dashboard.account')}}
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li class="link">
                    <a href="{{ URL::to('logout') }}">
                      {{trans('dashboard.logout')}}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="item dropdown" dropdown is-open="status.isopens">
                <a href="" class="dropdown-toggle" dropdown-toggle>
                  <section class="numalert" ng-show="viewitem"><%alertsnot.length%></section>
                  <i class="fa fa-bell-o"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right" role="menu">
                  <li class="dropdown-header">
                    {{trans('dashboard.notifications')}}
                  </li>
                  <li class="divider"></li>
                  <section ng-show="!viewitem">
                    {{trans('dashboard.notnotifications')}}
                  </section>
                  <ul class="notifications_list">
                    <div class="item_noticiations color-<% alertnot.color %>" data-ng-repeat="alertnot in alertsnot" type="<% alertnot.type %>">
                      <div class="imagen_notification_close">
                        <a href="#" ng-click="closeAlert($index, $event)">
                          <i class="fa fa-times-circle-o"></i>
                        </a>
                      </div>
                      <div class="imagen_notification swidget.sponzorname">
                        <p ng-bind-html="alertnot.type"></p>
                      </div>
                      <div class="textitem">
                        <div class="nameuser">System</div>
                          <div>
                            <p ng-bind-html="alertnot.msg"></p>
                          </div>
                      </div>
                      <div class="pyilS">
                        <div class="PpHGGf IWa Iub gac Sgb" aria-label="Ignorar" role="button" tabindex="0">  
                        </div>
                      </div>
                    </div>
                  </ul>
                </ul>
              </div>
            </div>
            <div class="meta">
              <div class="page" id="step2">
                {{trans('dashboard.dashboard')}}
              </div>
              <div class="breadcrumb-links">
                {{trans('dashboard.home')}} / {{trans('dashboard.dashboard')}}
              </div>
            </div>
          </div>
        </div>
         <!-- End Header Bar -->
         <!--Alerts Div-->
        <div class="row alerts-container" data-ng-controller="AlertsCtrl" data-ng-show="alerts.length">
          <div class="col-xs-12">
            <alert data-ng-repeat="alert in alerts" type="<% alert.type %>" close="closeAlert($index)">
            <%alert.msg %></alert>
          </div>
        </div>
        <!-- Main Content -->
        <section data-ui-view></section>
      </div><!-- End Page Content -->
    </div><!-- End Content Wrapper -->
  </div><!-- End Page Wrapper -->
  @yield("content")
@else
    <p>{{trans('pages.forbidden')}}</p>
@endif
</body>
</html>
