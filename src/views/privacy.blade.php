<section ng-controller="HomeController">
<div class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="" href="/"><p height="45px">SponzorMe</p></a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">

    <a href="#/users">{{ 'users' | translate }}</a></li>
    <a href="#/groups">{{ 'groups' | translate }}</a></li>

      </ul>
      <ul class="nav navbar-nav navbar-right">

    <a href="#/users">{{ 'users' | translate }}</a></li>
    <a href="#/groups">{{ 'groups' | translate }}</a></li>

      </ul>
      <ul class="nav navbar-nav navbar-right">

    <a href="#/users/userId">{{ email.user }}</a></li>
      <li><a href="#/users/dashboard">{{ 'dashboard' | translate }}</a></li>
      <li><a href="#/sponsors/dashboard">{{ 'dashboard' | translate }}</a></li>
    <li><a href="#/logout">{{ 'logout' | translate }}</a></li>
  <a href="#/login">{{ 'login' | translate }}</a></li>
  <a href="#/sponsors/create">{{ 'sponsorreg' | translate }}</a></li>
  <a href="#/users/create">{{ 'organizerreg' | translate }}</a></li>
      </ul>
    </div><!--/.nav-collapse -->
      
  </div>
</div>
<div class="testimonials">
    <div class="row">
      <h1>{{trans('privacy.headprivacy')}}</h1>
    </div>
    <div class="row">        
        <div class="col-md-12">
            <div class="content" align="justify">
                <section class="icoprivate">
                    <i class="fa fa-lock"></i>
                </section>
                <section class="contenprivate">
                    <p>{{trans('privacy.head2privacy')}}</p>
                    <p>{{trans('privacy.text1')}}</p>
                    <p>{{trans('privacy.head3privacy')}}</p>
                    <p>{{trans('privacy.text2')}}</p>
                    <p>{{trans('privacy.head4privacy')}}</p>
                    <p>{{trans('privacy.text3')}}</p>
                    <p>{{trans('privacy.head5privacy')}}</p>
                    <p>{{trans('privacy.text4')}}</p>
                    <p>{{trans('privacy.head6privacy')}}</p>
                    <p>{{trans('privacy.text5')}}</p>
                    <p>{{trans('privacy.head7privacy')}}</p>
                    <p>{{trans('privacy.text6')}}</p>
                    <p>{{trans('privacy.head8privacy')}}</p>
                    <p>{{trans('privacy.text7')}}</p>
                    <p>{{trans('privacy.head9privacy')}}</p>
                    <p>{{trans('privacy.head10privacy')}}</p>
                    <p>{{trans('privacy.text8')}}</p>
                    <p>{{trans('privacy.head11privacy')}}</p>
                    <p>{{trans('privacy.text9')}}</p>
                    <p>{{trans('privacy.head12privacy')}}</p>
                    <p>{{trans('privacy.head13privacy')}}</p>
                    <p>{{trans('privacy.text10')}}</p>
                    <p>{{trans('privacy.head14privacy')}}</p>
                    <p>{{trans('privacy.text11')}}</p>
                    <p>{{trans('privacy.head15privacy')}}</p>
                    <p>{{trans('privacy.text12')}}</p>
                    <p>{{trans('privacy.head16privacy')}}</p>
                    <p>{{trans('privacy.text13')}}</p>
                    <p>{{trans('privacy.head17privacy')}}</p>
                    <p>{{trans('privacy.text14')}}</p>
                    <p>{{trans('privacy.head18privacy')}}</p>
                    <p>{{trans('privacy.text15')}}</p>
                    <p>{{trans('privacy.head19privacy')}}</p>
                    <p>{{trans('privacy.text16')}}</p>
                    <p>{{trans('privacy.head20privacy')}}</p>
                    <p>{{trans('privacy.text17')}}</p>
                    <p>{{trans('privacy.head21privacy')}}</p>
                    <p>{{trans('privacy.text18')}}</p>
                    <p>{{trans('privacy.head22privacy')}}</p>
                    <p>{{trans('privacy.text19')}}</p>
                    <p>{{trans('privacy.head23privacy')}}</p>
                    <p>{{trans('privacy.text20')}}</p>
                    <p>{{trans('privacy.head24privacy')}}</p>
                    <p>{{trans('privacy.text21')}}</p>
                    <p>{{trans('privacy.head25privacy')}}</p>
                    <p>{{trans('privacy.text22')}}</p>
                    <p>{{trans('privacy.head26privacy')}}</p>
                    <p>{{trans('privacy.text23')}}</p>
                    <p>{{trans('privacy.head27privacy')}}</p>
                    <p>{{trans('privacy.text24')}}</p>
                </section>
            </div>
        </div>       
    </div>
</div>
<div class="footer">
  <div class="row">
  <div class="col-md-4">&nbsp;&nbsp;&nbsp;
      <p id="newlog">SponzorMe</p>&nbsp;&nbsp;
      <a class="" href="#" ng-click="changeLanguage('es')"><img height="16px" src="images/spanish.png"></a>&nbsp;
      <a class="" href="#" ng-click="changeLanguage('en')"><img height="16px" src="images/english.png"></a>&nbsp;
      <a class="" href="#" ng-click="changeLanguage('pt')"><img height="16px" src="images/pt.png"></a>
  </div>
  <div class="col-md-4">
      <a href="#/testimonials">{{ 'testimonials' | translate }}</a>&nbsp;|&nbsp
      <a href="#/{{supportUrl}}" target="_blank">{{ 'support' | translate }}</a>&nbsp;|&nbsp
      <a href="#/{{blogUrl}}" target="_blank">{{ 'blog' | translate }}</a> 
      &nbsp|&nbsp{{ 'team' | translate }}&nbsp;|&nbsp
      <a href="#/privacy" target="_blank">{{ 'privacy' | translate }}</a> 
  </div>
  <div class="col-md-4" align="right">
      Made with Love ❤&nbsp;&nbsp;&nbsp;
  </div>   
  </div>
</div>
</section>