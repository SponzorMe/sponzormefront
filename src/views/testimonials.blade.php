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
      <h1>{{ 'testimonials' | translate }}</h1>
    </div>
    <div class="row">        
        <div class="col-md-4">
            <div class="content" align="center">
                <div class="img-div img-responsive">
                  <img src="images/testimonials/wladimir.png" alt="Usuario" width="200px">
                </div><br/>
                  <p>"{{ 'testimonials1' | translate }}"</p><br/>
                  <footer class="title">Wladimir Avila - <a href="http://www.meetup.com/PHPColMeetup/" target="_blank">PHP Colombia</a></footer><br/>
                  <cite class="twitter">@wladimiravila</cite>
            </div>
        </div>
        <div class="col-md-4">
            <div class="content" align="center">
                <div class="img-div img-responsive">
                    <img src="images/testimonials/dvidsilva.png" alt="Usuario" width="200px">
                </div><br/>
                  <p>"{{ 'testimonials2' | translate }} "</p><br/>
                  <footer class="title">David Silva - <a href="http://www.meetup.com/GDGBerkeley/" target="_blank">GDG Berkeley</a></footer><br/>
                  <cite class="twitter">@davidSilva</cite>
                </div>
        </div>
        <div class="col-md-4">
            <div class="content" align="center">
                <div class="img-div img-responsive">
                  <img src="images/testimonials/jtorres.png" alt="Usuario" width="200px">
                </div><br/>
                  <p>"{{ 'testimonials3' | translate }} "</p><br/>
                  <footer class="title">John Torres - <a href="http://www.meetup.com/ioscolombia/" target="_blank">IOS Colombia</a></footer><br/>
                  <cite class="twitter">@AlexTorresGamer</cite>
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